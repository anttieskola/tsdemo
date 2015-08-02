import bb = Backbone;
import models = require("Models");

enum ViewState { View, Edit, Add, List, Selected };

export class LineList extends bb.View<models.Line> {
    private state: ViewState;
    private selectedLine: number;
    private listTemplate: (data: any) => string;
    private listAddTemplate: (data: any) => string;
    constructor() {
        this.state = ViewState.List;
        this.listTemplate = _.template($('#lineListView-template').html());
        this.listAddTemplate = _.template($('#lineListAddView-template').html());
        this.collection = models.Collections().Lines;
        // collection changes
        models.Collections().Lines.on('add', this.render, this);
        models.Collections().Lines.on('remove', this.render, this);
        models.Collections().Lines.on('sync', this.render, this);
        // messages
        models.Messaging().bind("selectLine", this.SelectLine, this);
        super();
    }
    render(): bb.View<models.Line> {
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
        this.collection.each(lineModel => {
            var line = new LineView;
            line.Selected(lineModel.id == this.selectedLine);
            line.model = lineModel;
            // append
            this.$el.append(line.render().el);
        }, this);
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
    public SelectLine(param: any) {
        this.selectedLine = parseInt(param);
        this.render();
    }
}
class LineView extends bb.View<models.Line> {
    private state: ViewState;
    private template: (data: any) => string;
    private templateEdit: (data: any) => string;
    private templateSelected: (data: any) => string;
    constructor(options?: any) {
        this.state = ViewState.View;
        this.template = _.template($('#lineView-template').html());
        this.templateEdit = _.template($('#lineEdit-template').html());
        this.templateSelected = _.template($('#lineSelected-template').html());
        super(options);
    }
    render(): bb.View<models.Line> {
        switch (this.state) {
            case ViewState.View:
                this.$el.html(this.template(this.model.toJSON()));
                this.undelegateEvents();
                this.delegateEvents({
                    "click .editButton": "stateEdit",
                    "click .deleteButton": "stateDelete",
                    "click .lineView": "stateSelected"
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
        models.Messaging().trigger("selectLine", this.model.id);
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
// Dropdown list of lines
export class LinesSelectView extends bb.View<models.Line> {
    private selectName: string;
    constructor(selectName: string) {
        this.collection = models.Collections().Lines;
        this.selectName = selectName;
        super();
    }
    render(): bb.View<models.Line> {
        // select
        this.el = this.$el = $('<select name="' + this.selectName + '" class="option">');
        this.collection.each(l => {
            // option
            var lov = new LineOptionView;
            lov.model = l;
            // append
            this.$el.append(lov.render().el);
        }, this);
        return this;
    }
}
class LineOptionView extends bb.View<models.Line> {
    render(): bb.View<models.Line> {
        this.el = $('<option>');
        this.el.attr('value', this.model.id);
        this.el.text(this.model.Name);
        return this;
    }
}