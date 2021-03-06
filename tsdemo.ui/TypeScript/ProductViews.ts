﻿import bb = Backbone;
import models = require("Models");
import lineViews = require("LineViews");

enum ViewState { View, Edit, Add, List, Selected };

export class ProductList extends bb.View<models.Product> {
    private productLineElement: string;
    private state: ViewState;
    private selectedProduct: number;
    private listTemplate: (data: any) => string;
    private listAddTemplate: (data: any) => string;
    constructor(productLineElement: string) {
        this.productLineElement = productLineElement;
        this.state = ViewState.List;
        this.selectedProduct = 0;
        this.listTemplate = _.template($('#productListView-template').html());
        this.listAddTemplate = _.template($('#productListAddView-template').html());
        this.collection = models.Collections().Products;
        // collection changes
        models.Collections().Products.on('add', this.render, this);
        models.Collections().Products.on('remove', this.render, this);
        models.Collections().Products.on('sync', this.render, this);
        // messages
        models.Messaging().bind("selectProduct", this.SelectProduct, this);
        super();
    }
    render(): bb.View<models.Product> {
        // header
        switch (this.state) {
            case ViewState.List:
                this.el = this.$el.html(this.listTemplate(null));
                this.undelegateEvents();
                this.delegateEvents({ "click .addButton": "stateAdd" });
                break;
            case ViewState.Add:
                this.el = this.$el.html(this.listAddTemplate(null));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .saveButton": "stateSave",
                    "click .cancelButton": "stateCancel"
                });
                break;
        }
        // list
        this.collection.each(productModel => {
            // create view
            var pv = new ProductView;
            pv.Selected(productModel.id == this.selectedProduct);
            pv.model = productModel;
            // append
            this.$el.append(pv.render().el);
        }, this);
        // product lines
        if (this.selectedProduct != 0) {
            var plv = new ProductLinesView(this.selectedProduct);
            plv.$el = $(this.productLineElement);
            plv.render();
        }
        return this;
    }
    // view state changes
    private stateAdd() {
        this.state = ViewState.Add;
        this.render();
    }
    private stateSave() {
        var newLine = new models.Line;
        newLine.Name = this.$el.find('input[name=Name]').val();
        this.collection.create(newLine, { wait: true });
        this.state = ViewState.List;
        this.render();
    }
    private stateCancel() {
        this.state = ViewState.List;
        this.render();
    }
    // thru messaging
    public SelectProduct(param: any) {
        this.selectedProduct = parseInt(param);
        this.render();
    }
}
class ProductView extends bb.View<models.Product> {
    private state: ViewState;
    private template: (data: any) => string;
    private templateEdit: (data: any) => string;
    private templateSelected: (data: any) => string;
    constructor(options?: any) {
        this.state = ViewState.View;
        this.template = _.template($('#productView-template').html());
        this.templateEdit = _.template($('#productEdit-template').html());
        this.templateSelected = _.template($('#productSelected-template').html());
        super(options);
    }
    render(): bb.View<models.Product> {
        switch (this.state) {
            case ViewState.View:
                this.$el.html(this.template(this.model.toJSON()));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .editButton": "stateEdit",
                    "click .deleteButton": "stateDelete",
                    "click .productView": "stateSelected"
                });
                break;
            case ViewState.Edit:
                this.$el.html(this.templateEdit(this.model.toJSON()));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .saveButton": "stateSave",
                    "click .cancelButton": "stateCancel"
                });
                break;
            case ViewState.Selected:
                this.$el.html(this.templateSelected(this.model.toJSON()));
                break;
        }
        return this;
    }
    // view state changes
    private stateEdit() {
        this.state = ViewState.Edit;
        this.render();
    }
    private stateDelete() {
        this.model.destroy();
    }
    private stateSave() {
        this.model.Name = this.$el.find('input[name=Name]').val();
        this.model.save();
        this.state = ViewState.View;
        this.render();
    }
    private stateCancel() {
        this.state = ViewState.View;
        this.render();
    }
    private stateSelected() {
        models.Messaging().trigger("selectProduct", this.model.id);
    }
    // thru messaging we get selected for reals
    public Selected(yes: boolean) {
        if (yes) {
            this.state = ViewState.Selected;
        } else {
            if (this.state == ViewState.Selected) {
                this.state = ViewState.View;
            }
        }
    }
}
// products lines list view
export class ProductLinesView extends bb.View<models.ProductLine> {
    private productId: number;
    private state: ViewState;
    private listTemplate: (data: any) => string;
    private listAddTemplate: (data: any) => string;
    constructor(productId: number) {
        this.productId = productId;
        this.state = ViewState.List;
        this.collection = new bb.Collection<models.ProductLine>(
            models.Collections().Products.get(this.productId).Lines);
        this.listTemplate = _.template($('#productLineListView-template').html());
        this.listAddTemplate = _.template($('#productLineListAddView-template').html());
        super();
    }
    render(): bb.View<models.ProductLine> {
        // header
        switch (this.state) {
            case ViewState.List:
                this.el = this.$el.html(this.listTemplate(null));
                this.undelegateEvents();
                this.delegateEvents({ "click .addButton": "stateAdd" });
                break;
            case ViewState.Add:
                this.el = this.$el.html(this.listAddTemplate(null));
                var lineListSelect = new lineViews.LinesSelectView("lineId");
                this.$el.find('select').replaceWith(lineListSelect.render().el);
                this.undelegateEvents();
                this.delegateEvents({
                    "click .saveButton": "stateSave",
                    "click .cancelButton": "stateCancel"
                });
                break;
        }
        // collection
        this.collection.each(pl => {
            var plv = new ProductLineView(this.productId, pl.get('LineId'));
            this.$el.append(plv.render().el);
        }, this);
        return this;
    }
    private stateSave() {
        // todo save
        debugger;
        // fetch data
        var lineId = this.$el.find('select').val();
        // create new product line
        var pl = new models.ProductLine;
        pl.LineId = lineId;
        pl.ProductId = this.productId;
        // add it to product and save
        var product = models.Collections().Products.get(this.productId);
        product.Lines.push(pl);
        product.save();
        // state change to back list
        this.state = ViewState.List;
        this.render();
    }
    private stateCancel() {
        this.state = ViewState.List;
        this.render();
    }
    private stateAdd() {
        this.state = ViewState.Add;
        this.render();
    }
}
// product line item view
export class ProductLineView extends bb.View<models.ProductLine> {
    private productId: number;
    private lineId: number;
    private template: (data: any) => string;
    constructor(productId: number, lineId: number) {
        this.productId = productId;
        this.lineId = lineId;
        this.template = _.template($('#productLine-template').html());
        super();
    }
    render(): bb.View<models.ProductLine> {
        this.undelegateEvents();
        this.delegateEvents({ "click .deleteButton": "stateDelete" });
        var line = models.Collections().Lines.get(this.lineId);
        this.el = this.$el.html(this.template({ "Name": line.Name }));
        return this;
    }
    private stateDelete() {
        var product = models.Collections().Products.get(this.productId);
        product.Lines = product.Lines.filter((p) => p.LineId != this.lineId);
        product.save();
        this.model.destroy();
    }
}
// Drop down list of products
export class ProductsSelectView extends bb.View<models.Product> {
    private selectName: string;
    constructor(selectName: string) {
        this.collection = models.Collections().Products;
        this.selectName = selectName;
        super();
    }
    render(): bb.View<models.Product> {
        // select
        this.el = $('<select name="' + this.selectName + '" class="option">');
        this.collection.each(m => {
            // option
            var opt = new ProductsSelectViewOption;
            opt.model = m;
            // append
            this.$el.append(opt.render().el);
        }, this);
        return this;
    }
}
class ProductsSelectViewOption extends bb.View<models.Product> {
    render(): bb.View<models.Product> {
        this.el = $('<option>');
        this.el.attr('value', this.model.id);
        this.el.text(this.model.Name);
        return this;
    }
}
  