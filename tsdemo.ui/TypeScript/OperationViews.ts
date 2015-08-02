import bb = Backbone;
import models = require("Models");

enum ViewState { View, Edit, Add, List };

export class OperationList extends bb.View<models.Operation> {
    private state: ViewState;
    private lineId: number;
    private listTemplate: (data: any) => string;
    private listAddTemplate: (data: any) => string;
    constructor(lineId: number) {
        this.state = ViewState.List;
        this.listTemplate = _.template($('#operationListView-template').html());
        this.listAddTemplate = _.template($('#operationListAddView-template').html());
        this.collection = models.Collections().Operations;
        this.lineId = lineId; // this renders only defined lines operations
        // collection changes
        models.Collections().Operations.on('add', this.render, this);
        models.Collections().Operations.on('remove', this.render, this);
        models.Collections().Operations.on('sync', this.render, this);
        super();
    }
    render(): bb.View<models.Operation> {
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
        this.collection.each(o => {
            // just add defined lines operations
            if (o.LineId == this.lineId) {
                // option
                var opt = new OperationView;
                opt.model = o;
                // append
                this.$el.append(opt.render().el);
            }
        }, this);
        return this;
    }
    // view state changes
    stateAdd() {
        this.state = ViewState.Add;
        this.render();
    }
    stateSave() {
        var no = new models.Operation;
        no.Name = this.$el.find('input[name=Name]').val();
        no.LineId = this.lineId;
        this.collection.create(no, { wait: true });
        this.state = ViewState.List;
        this.render();
    }
    stateCancel() {
        this.state = ViewState.List;
        this.render();
    }
}
class OperationView extends bb.View<models.Operation> {
    private state: ViewState;
    private template: (data: any) => string;
    private templateEdit: (data: any) => string;
    constructor(options?: any) {
        this.state = ViewState.View;
        this.template = _.template($('#operationView-template').html());
        this.templateEdit = _.template($('#operationEditView-template').html());
        super(options);
    }
    render(): bb.View<models.Operation> {
        switch (this.state) {
            case ViewState.View:
                this.$el.html(this.template(this.model.toJSON()));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .editButton": "stateEdit",
                    "click .deleteButton": "stateDelete"
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
    stateEdit() {
        this.state = ViewState.Edit;
        this.render();
    }
    stateDelete() {
        this.model.destroy();
    }
    stateSave() {
        this.model.Name = this.$el.find('input[name=Name]').val();
        this.model.save();
        this.state = ViewState.View;
        this.render();
    }
    stateCancel() {
        this.state = ViewState.View;
        this.render();
    }
}
// Dropdown list of operations for defined line
export class OperationsSelectView extends bb.View<models.Operation> {
    private lineId: number;
    private selectName: string;
    constructor(lineId: number, selectName: string) {
        this.collection = models.Collections().Operations;
        this.selectName = selectName;
        this.lineId = lineId;
        super();
    }
    render(): bb.View<models.Operation> {
        // select
        this.el = $('<select name="' + this.selectName + '" class="option">');
        this.collection.each(o => {
            // just add defined lines operations
            if (o.LineId == this.lineId) {
                // option
                var opt = new OperationOptionView;
                opt.model = o;
                // append
                this.el.append(opt.render().el);
            }
        }, this);
        return this;
    }
}
class OperationOptionView extends bb.View<models.Operation> {
    render(): bb.View<models.Operation> {
        this.el = $('<option>');
        this.el.attr('value', this.model.id);
        this.el.text(this.model.Name);
        return this;
    }
}
