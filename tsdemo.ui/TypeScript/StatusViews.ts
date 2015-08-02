import bb = Backbone;
import models = require("Models");

enum ViewState { View, Edit, Add, List };

export class StatusView extends bb.View<models.Status> {
    private state: ViewState;
    private productId: number;
    private operationId: number;
    private template: (data: any) => string;
    private templateEdit: (data: any) => string;
    private templateAdd: (data: any) => string;
    constructor(productId: number, operationId: number) {
        this.state = ViewState.View;
        this.productId = productId;
        this.operationId = operationId;
        this.template = _.template($('#statusView-template').html());
        this.templateEdit = _.template($('#statusEditView-template').html());
        this.templateAdd = _.template($('#statusAdd-template').html());
        super();
    }
    // render one of the two layouts
    render(): bb.View<models.Status> {
        if (this.model == null) {
            this.state = ViewState.Add;
        }
        switch (this.state) {
            case ViewState.View:
                this.$el.html(this.template(this.model.toJSON()));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .editButton": "stateEdit"
                });
                break;
            case ViewState.Add:
                this.$el.html(this.templateAdd(null));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .saveButton": "stateAdd",
                    "click .cancelButton": "stateCancel"
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
        }
        return this;
    }
    // view state changes
    private stateEdit() {
        this.state = ViewState.Edit;
        this.render();
    }
    private stateAdd() {
        var s = new models.Status;
        s.ProductId = this.productId;
        s.OperationId = this.operationId;
        s.Complete = this.$el.find('input[type=checkbox]').prop('checked');
        s.Notes = this.$el.find('input[type=text]').val();
        this.model = models.Collections().Statuses.create(s, { wait: true });
        this.state = ViewState.View;
        this.render();
    }
    private stateSave() {
        this.model.ProductId = this.productId;
        this.model.OperationId = this.operationId;
        this.model.Complete = this.$el.find('input[type=checkbox]').prop('checked');
        this.model.Notes = this.$el.find('input[type=text]').val();
        this.model.save();
        this.state = ViewState.View;
        this.render();
    }
    private stateCancel() {
        this.state = ViewState.View;
        this.render();
    }
}
