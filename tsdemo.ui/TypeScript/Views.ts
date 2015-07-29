import bb = Backbone;
import modelsFile = require("Models");
import models = modelsFile.Models;

export module Views {
    // todo
    export class ProductsStatusView extends bb.View<models.Product> {
        private lineItems: Array<models.Line>
        constructor(options?: any) {
            super(options);
            this.bind('change', this.modelChanged, this);
        }
        modelChanged() {
            this.lineItems = new Array<models.Line>();
            this.model.Lines.forEach((line) => {
                this.lineItems.push(models.Collections().Lines.get(line.LineId));
            });
        }
    }

    // list view of products
    export class ProductsListView extends bb.View<models.Product> {
        render(): bb.View<models.Product> {
            // clear
            this.$el.html('');
            // collection
            this.collection.each(p => {
                // append it
                var plw = new ProductListView;
                plw.model = p;
                // "view chaining"
                this.$el.append(plw.render().el);
            }, this);
            return this;
        }
    }
    // single item in list
    export class ProductListView extends bb.View<models.Product> {
        template: (data: any) => string;
        editing: boolean;
        constructor() {
            this.events = <any> {
                "click .editButton": "modelEdit",
                "click .deleteButton": "modelDelete",
                "click .saveButton": "modelSave",
                "click .cancelButton": "modelCancel",
                "click .lineAddButton": "modelAddLine",
                "click .lineDeleteButton": "modelDeleteLine"
            };
            super();
            this.template = _.template($('#productList-template').html());
        }
        render() {
            this.$el.html(this.template(this.model.toJSON()));
            if (this.editing) {
                var lsv = new LinesSelectView;
                var lineSelectorHtml = lsv.render().el;
                this.$el.find('div[class=lineSelect]')
                    .append(lineSelectorHtml);
            }
            return this;
        }
        modelEdit() {
            this.template = _.template($('#productListEdit-template').html());
            this.editing = true;
            this.render();
        }
        modelSave() {
            this.model.Name = this.$el.find('input[name=Name]').val();
            this.model.save();
            this.editing = false;
            this.template = _.template($('#productList-template').html());
            this.render();
        }
        modelCancel() {
            this.template = _.template($('#productList-template').html());
            this.editing = false;
            this.render();
        }
        modelAddLine() {
            debugger;
            var lineId = parseInt(this.$el.find('div[class=lineSelect]')
                .find('select').val());
            if (lineId > 0) {
                if (this.model.Lines == null) {
                    this.model.Lines = new Array<models.ProductLine>();
                }
                var pl = new models.ProductLine;
                pl.ProductId = this.model.id;
                pl.LineId = lineId;
                this.model.Lines.push(pl);
                this.model.save();
            }
        }
        modelDeleteLine(e?: any) {
            debugger;
            var lineId = parseInt($(e.target).attr('data-lineId'));
            if (lineId > 0) {
                this.model.Lines = this.model.Lines.filter((pl) => pl.LineId != lineId);
                this.model.save();
            }
        }
        modelDelete() {
            this.model.destroy();
        }
    }
    // list view
    export class LinesListView extends bb.View<models.Line> {
        render(): bb.View<models.Line> {
            // clear
            this.$el.html('');
            // collection
            this.collection.each(l => {
                // append it
                var llw = new LineListView;
                llw.model = l;
                // "view chaining"
                this.$el.append(llw.render().el);
            }, this);
            return this;
        }
    }
    // single item in list
    export class LineListView extends bb.View<models.Line> {
        template: (data: any) => string;
        constructor() {
            this.events = <any> {
                "click .editButton": "modelEdit",
                "click .deleteButton": "modelDelete",
                "click .saveButton": "modelSave",
                "click .cancelButton": "modelCancel"
            };
            super();
            this.template = _.template($('#lineList-template').html());
        }
        render() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        modelEdit() {
            this.template = _.template($('#lineListEdit-template').html());
            this.render();
        }
        modelSave() {
            this.model.Name = this.$el.find('input[name=Name]').val();
            this.model.save();
            this.template = _.template($('#lineList-template').html());
            this.render();
        }
        modelCancel() {
            this.template = _.template($('#lineList-template').html());
            this.render();
        }
        modelDelete() {
            this.model.destroy();
        }
    }
    // alternative list view of lines as <select> element
    export class LinesSelectView extends bb.View<models.Line> {
        constructor(options?: any) {
            this.collection = models.Collections().Lines;
            super(options);
        }
        render(): bb.View<models.Line> {
            // select
            this.el = $('<select class="option">');
            this.collection.each(l => {
                // option
                var lov = new LineOptionView;
                lov.model = l;
                // append
                this.el.append(lov.render().el);
            }, this);
            return this;
        }
    }
    export class LineOptionView extends bb.View<models.Line> {
        render(): bb.View<models.Line> {
            this.el = $('<option>');
            this.el.attr('value', this.model.id);
            this.el.text(this.model.Name);
            return this;
        }
    }
    // status list view
    export class StatusesListView extends bb.View<models.Status> {
        constructor(options?: any) {
            super(options);
        }
        render(): bb.View<models.Status> {
            this.collection.each(s => {
                var slv = new StatusListView;
                slv.model = s;
                this.el.append(slv.render().el);
            }, this);
            return this;
        }
    }
    export class StatusListView extends bb.View<models.Status> {
        template: (data: any) => string;
        constructor(options?: any) {
            this.template = _.template($('#statusList-template').html());
            super(options);
        }
        render(): bb.View<models.Status> {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    }
}