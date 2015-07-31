import bb = Backbone;
import models = require("Models");
import productViews = require("ProductViews");

enum ViewState { View, Edit, Add, List };
// collection view
export class StatusList extends bb.View<models.Status> {
    private state: ViewState;
    private listTemplate: (data: any) => string;
    private listAddTemplate: (data: any) => string;
    constructor(options?: any) {
        this.listTemplate = _.template($('#statusListView-template').html());
        this.listAddTemplate = _.template($('#statusListAddView-template').html());
        this.state = ViewState.List;
        super(options);
    }
    render(): bb.View<models.Status> {
        // render header
        switch (this.state) {
            case ViewState.List:
                this.el = this.$el.html(this.listTemplate(null));
                this.delegateEvents({ "click .addButton": "stateAdd" });
                break;
            case ViewState.Add:
                this.el = this.$el.html(this.listAddTemplate(null));
                var ps = new productViews.ProductsSelectView("ProductId");
                this.$el.find('select[name=ProductId]').replaceWith(ps.render().el);
                this.delegateEvents({
                    "click .saveButton": "stateSave",
                    "click .cancelButton": "stateCancel"
                });
                break;
        }
        // render list
        this.collection.each(s => {
            var slv = new StatusView;
            slv.model = s;
            this.el.append(slv.render().el);
        }, this);
        return this;
    }
    // view state changes
    stateAdd() {
        this.state = ViewState.Add;
        this.render();
    }
    stateSave() {
        // todo save
        this.state = ViewState.List;
        this.render();
    }
    stateCancel() {
        this.state = ViewState.List;
        this.render();
    }
}
class StatusView extends bb.View<models.Status> {
    private state: ViewState;
    private template: (data: any) => string;
    private templateEdit: (data: any) => string;
    constructor(options?: any) {
        this.template = _.template($('#statusView-template').html());
        this.templateEdit = _.template($('#statusEditView-template').html());
        super(options);
    }
    // render one of the two layouts
    render(): bb.View<models.Status> {
        switch (this.state) {
            case ViewState.View:
                this.$el.html(this.template(this.model.toJSON()));
                this.delegateEvents({
                    "click .editButton": "stateEdit",
                    "click .deleteButton": "stateDelete"
                });
                break;
            case ViewState.Edit:
                this.$el.html(this.templateEdit(this.model.toJSON()));
                this.delegateEvents({
                    "click .saveButton": "stateSave",
                    "click .cancelButton": "stateCancel"
                });
                break;
        }
        return this;
    }
    // view state changes
    stateEdit() {
        this.state = ViewState.Edit;
    }
    stateDelete() {
        this.model.destroy();
    }
    stateSave() {
        // todo save
        this.state = ViewState.View;
    }
    stateCancel() {
        this.state = ViewState.View;
    }
}
