import bb = Backbone;
import models = require("Models");
import statusViews = require("StatusViews");

enum ViewSate { View, Add, Edit };

// view of products with their lines, operation status info
export class ProductStatusViewList extends bb.View<models.Product> {
    constructor() {
        this.collection = models.Collections().Products;
        // collection changes
        models.Collections().Products.on('add', this.render, this);
        models.Collections().Products.on('remove', this.render, this);
        models.Collections().Lines.on('add', this.render, this);
        models.Collections().Lines.on('remove', this.render, this);
        models.Collections().Statuses.on('add', this.render, this);
        models.Collections().Statuses.on('remove', this.render, this);
        models.Collections().Operations.on('add', this.render, this);
        models.Collections().Operations.on('remove', this.render, this);
        models.Collections().Products.on('sync', this.render, this);
        super();
    }
    render(): bb.View<models.Product> {
        this.$el.html('');
        this.collection.each(p=> {
            var psv = new ProductStatusView(p);
            this.$el.append(psv.render().el);
        }, this);
        return this;
    }
}
// list item
export class ProductStatusView extends bb.View<models.Product> {
    private template: (data: any) => string;
    constructor(model: models.Product) {
        this.model = model;
        this.template = _.template($('#productStatusView-template').html());
        super();
    }
    render(): bb.View<models.Product> {
        this.$el.html(this.template({
            id: this.model.id,
            Name: this.model.Name
        }));
        this.model.Lines.forEach(line => {
            var ml = models.Collections().Lines.get(line.LineId);
            var pslv = new ProductStatusLineView(this.model.id, ml);
            this.$el.find('div[class=operations]').append(pslv.render().$el);
        }, this);
        return this;
    }
}
// items line
export class ProductStatusLineView extends bb.View<models.Line> {
    private productId: number;
    private template: (data: any) => string;
    constructor(productId: number, model: models.Line) {
        this.productId = productId;
        this.model = model;
        this.template = _.template($('#productStatusLineView-template').html());
        super();
    }
    render(): bb.View<models.Line> {
        this.$el.html(this.template(this.model.toJSON()));
        var operations = models.Collections().Operations.filter(o => o.LineId == this.model.id);
        operations.forEach(o => {
            var psov = new ProductStatusOperationView(this.productId, o.LineId);
            psov.model = o;
            this.$el.find('div[class=operationView]').append(psov.render().$el);
        }, this);
        return this;
    }
}
// items lines operation
export class ProductStatusOperationView extends bb.View<models.Operation> {
    private state: ViewSate;
    private productId: number;
    private lineId: number;
    private template: (data: any) => string;
    constructor(productId: number, lineId: number) {
        this.state = ViewSate.View;
        this.productId = productId;
        this.lineId = lineId;
        this.template = _.template($('#productStatusOperationView-template').html());
        super();
    }
    render(): bb.View<models.Operation> {
        var statues = models.Collections().Statuses.filter(s => s.ProductId == this.productId && s.OperationId == this.model.id);
        var sv = new statusViews.StatusView(this.productId, this.model.id);
        if (statues.length > 0) {
            sv.model = statues[0];
        } else {
            sv.model = null;
        }
        this.$el.html(this.template({ "Name": this.model.Name }));
        this.$el.find('div[class=operationState]').append(sv.render().$el);
        return this;
    }
}

