var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Models"], function (require, exports, models) {
    var bb = Backbone;
    var ViewState;
    (function (ViewState) {
        ViewState[ViewState["View"] = 0] = "View";
        ViewState[ViewState["Edit"] = 1] = "Edit";
        ViewState[ViewState["Add"] = 2] = "Add";
        ViewState[ViewState["List"] = 3] = "List";
    })(ViewState || (ViewState = {}));
    ;
    var OperationList = (function (_super) {
        __extends(OperationList, _super);
        function OperationList(lineId) {
            this.state = ViewState.List;
            this.listTemplate = _.template($('#operationListView-template').html());
            this.listAddTemplate = _.template($('#operationListAddView-template').html());
            this.collection = models.Collections().Operations;
            this.lineId = lineId; // this renders only defined lines operations
            // collection changes
            models.Collections().Operations.on('add', this.render, this);
            models.Collections().Operations.on('remove', this.render, this);
            models.Collections().Operations.on('sync', this.render, this);
            _super.call(this);
        }
        OperationList.prototype.render = function () {
            var _this = this;
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
            this.collection.each(function (o) {
                // just add defined lines operations
                if (o.LineId == _this.lineId) {
                    // option
                    var opt = new OperationView;
                    opt.model = o;
                    // append
                    _this.el.append(opt.render().el);
                }
            }, this);
            return this;
        };
        // view state changes
        OperationList.prototype.stateAdd = function () {
            this.state = ViewState.Add;
            this.render();
        };
        OperationList.prototype.stateSave = function () {
            var no = new models.Operation;
            no.Name = this.$el.find('input[name=Name]').val();
            no.LineId = this.lineId;
            this.collection.create(no, { wait: true });
            this.state = ViewState.List;
            this.render();
        };
        OperationList.prototype.stateCancel = function () {
            this.state = ViewState.List;
            this.render();
        };
        return OperationList;
    })(bb.View);
    exports.OperationList = OperationList;
    var OperationView = (function (_super) {
        __extends(OperationView, _super);
        function OperationView(options) {
            this.state = ViewState.View;
            this.template = _.template($('#operationView-template').html());
            this.templateEdit = _.template($('#operationEditView-template').html());
            _super.call(this, options);
        }
        OperationView.prototype.render = function () {
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
        };
        // view state changes
        OperationView.prototype.stateEdit = function () {
            this.state = ViewState.Edit;
            this.render();
        };
        OperationView.prototype.stateDelete = function () {
            this.model.destroy();
        };
        OperationView.prototype.stateSave = function () {
            this.model.Name = this.$el.find('input[name=Name]').val();
            this.model.save();
            this.state = ViewState.View;
            this.render();
        };
        OperationView.prototype.stateCancel = function () {
            this.state = ViewState.View;
            this.render();
        };
        return OperationView;
    })(bb.View);
    // Dropdown list of operations for defined line
    var OperationsSelectView = (function (_super) {
        __extends(OperationsSelectView, _super);
        function OperationsSelectView(lineId, selectName) {
            this.collection = models.Collections().Operations;
            this.selectName = selectName;
            this.lineId = lineId;
            _super.call(this);
        }
        OperationsSelectView.prototype.render = function () {
            var _this = this;
            // select
            this.el = $('<select name="' + this.selectName + '" class="option">');
            this.collection.each(function (o) {
                // just add defined lines operations
                if (o.LineId == _this.lineId) {
                    // option
                    var opt = new OperationOptionView;
                    opt.model = o;
                    // append
                    _this.el.append(opt.render().el);
                }
            }, this);
            return this;
        };
        return OperationsSelectView;
    })(bb.View);
    exports.OperationsSelectView = OperationsSelectView;
    var OperationOptionView = (function (_super) {
        __extends(OperationOptionView, _super);
        function OperationOptionView() {
            _super.apply(this, arguments);
        }
        OperationOptionView.prototype.render = function () {
            this.el = $('<option>');
            this.el.attr('value', this.model.id);
            this.el.text(this.model.Name);
            return this;
        };
        return OperationOptionView;
    })(bb.View);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9wZXJhdGlvblZpZXdzLnRzIl0sIm5hbWVzIjpbIlZpZXdTdGF0ZSIsIk9wZXJhdGlvbkxpc3QiLCJPcGVyYXRpb25MaXN0LmNvbnN0cnVjdG9yIiwiT3BlcmF0aW9uTGlzdC5yZW5kZXIiLCJPcGVyYXRpb25MaXN0LnN0YXRlQWRkIiwiT3BlcmF0aW9uTGlzdC5zdGF0ZVNhdmUiLCJPcGVyYXRpb25MaXN0LnN0YXRlQ2FuY2VsIiwiT3BlcmF0aW9uVmlldyIsIk9wZXJhdGlvblZpZXcuY29uc3RydWN0b3IiLCJPcGVyYXRpb25WaWV3LnJlbmRlciIsIk9wZXJhdGlvblZpZXcuc3RhdGVFZGl0IiwiT3BlcmF0aW9uVmlldy5zdGF0ZURlbGV0ZSIsIk9wZXJhdGlvblZpZXcuc3RhdGVTYXZlIiwiT3BlcmF0aW9uVmlldy5zdGF0ZUNhbmNlbCIsIk9wZXJhdGlvbnNTZWxlY3RWaWV3IiwiT3BlcmF0aW9uc1NlbGVjdFZpZXcuY29uc3RydWN0b3IiLCJPcGVyYXRpb25zU2VsZWN0Vmlldy5yZW5kZXIiLCJPcGVyYXRpb25PcHRpb25WaWV3IiwiT3BlcmF0aW9uT3B0aW9uVmlldy5jb25zdHJ1Y3RvciIsIk9wZXJhdGlvbk9wdGlvblZpZXcucmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQUEsSUFBTyxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBR3JCLElBQUssU0FBbUM7SUFBeEMsV0FBSyxTQUFTO1FBQUdBLHlDQUFJQSxDQUFBQTtRQUFFQSx5Q0FBSUEsQ0FBQUE7UUFBRUEsdUNBQUdBLENBQUFBO1FBQUVBLHlDQUFJQSxDQUFBQTtJQUFDQSxDQUFDQSxFQUFuQyxTQUFTLEtBQVQsU0FBUyxRQUEwQjtJQUFBLENBQUM7SUFFekM7UUFBbUNDLGlDQUF5QkE7UUFLeERBLHVCQUFZQSxNQUFjQTtZQUN0QkMsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLENBQUNB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LDJCQUFDQTtJQUFEQSxDQXhCQSxBQXdCQ0EsRUF4QnlDLEVBQUUsQ0FBQyxJQUFJLEVBd0JoRDtJQXhCWSw0QkFBb0IsdUJBd0JoQyxDQUFBO0lBQ0Q7UUFBa0NHLHVDQUF5QkE7UUFBM0RBO1lBQWtDQyw4QkFBeUJBO1FBTzNEQSxDQUFDQTtRQU5HRCxvQ0FBTUEsR0FBTkE7WUFDSUUsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3JDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM5QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBQ0xGLDBCQUFDQTtJQUFEQSxDQVBBLEFBT0NBLEVBUGlDLEVBQUUsQ0FBQyxJQUFJLEVBT3hDIiwiZmlsZSI6Ik9wZXJhdGlvblZpZXdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJiID0gQmFja2JvbmU7XHJcbmltcG9ydCBtb2RlbHMgPSByZXF1aXJlKFwiTW9kZWxzXCIpO1xyXG5cclxuZW51bSBWaWV3U3RhdGUgeyBWaWV3LCBFZGl0LCBBZGQsIExpc3QgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcGVyYXRpb25MaXN0IGV4dGVuZHMgYmIuVmlldzxtb2RlbHMuT3BlcmF0aW9uPiB7XHJcbiAgICBwcml2YXRlIHN0YXRlOiBWaWV3U3RhdGU7XHJcbiAgICBwcml2YXRlIGxpbmVJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsaXN0VGVtcGxhdGU6IChkYXRhOiBhbnkpID0+IHN0cmluZztcclxuICAgIHByaXZhdGUgbGlzdEFkZFRlbXBsYXRlOiAoZGF0YTogYW55KSA9PiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5lSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBWaWV3U3RhdGUuTGlzdDtcclxuICAgICAgICB0aGlzLmxpc3RUZW1wbGF0ZSA9IF8udGVtcGxhdGUoJCgnI29wZXJhdGlvbkxpc3RWaWV3LXRlbXBsYXRlJykuaHRtbCgpKTtcclxuICAgICAgICB0aGlzLmxpc3RBZGRUZW1wbGF0ZSA9IF8udGVtcGxhdGUoJCgnI29wZXJhdGlvbkxpc3RBZGRWaWV3LXRlbXBsYXRlJykuaHRtbCgpKTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBtb2RlbHMuQ29sbGVjdGlvbnMoKS5PcGVyYXRpb25zO1xyXG4gICAgICAgIHRoaXMubGluZUlkID0gbGluZUlkOyAvLyB0aGlzIHJlbmRlcnMgb25seSBkZWZpbmVkIGxpbmVzIG9wZXJhdGlvbnNcclxuICAgICAgICAvLyBjb2xsZWN0aW9uIGNoYW5nZXNcclxuICAgICAgICBtb2RlbHMuQ29sbGVjdGlvbnMoKS5PcGVyYXRpb25zLm9uKCdhZGQnLCB0aGlzLnJlbmRlciwgdGhpcyk7XHJcbiAgICAgICAgbW9kZWxzLkNvbGxlY3Rpb25zKCkuT3BlcmF0aW9ucy5vbigncmVtb3ZlJywgdGhpcy5yZW5kZXIsIHRoaXMpO1xyXG4gICAgICAgIG1vZGVscy5Db2xsZWN0aW9ucygpLk9wZXJhdGlvbnMub24oJ3N5bmMnLCB0aGlzLnJlbmRlciwgdGhpcyk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBiYi5WaWV3PG1vZGVscy5PcGVyYXRpb24+IHtcclxuICAgICAgICAvLyBoZWFkZXJcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBWaWV3U3RhdGUuTGlzdDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwgPSB0aGlzLiRlbC5odG1sKHRoaXMubGlzdFRlbXBsYXRlKG51bGwpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cyh7IFwiY2xpY2sgLmFkZEJ1dHRvblwiOiBcInN0YXRlQWRkXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBWaWV3U3RhdGUuQWRkOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbCA9IHRoaXMuJGVsLmh0bWwodGhpcy5saXN0QWRkVGVtcGxhdGUobnVsbCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKHtcclxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrIC5zYXZlQnV0dG9uXCI6IFwic3RhdGVTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjbGljayAuY2FuY2VsQnV0dG9uXCI6IFwic3RhdGVDYW5jZWxcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGlzdFxyXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5lYWNoKG8gPT4ge1xyXG4gICAgICAgICAgICAvLyBqdXN0IGFkZCBkZWZpbmVkIGxpbmVzIG9wZXJhdGlvbnNcclxuICAgICAgICAgICAgaWYgKG8uTGluZUlkID09IHRoaXMubGluZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25cclxuICAgICAgICAgICAgICAgIHZhciBvcHQgPSBuZXcgT3BlcmF0aW9uVmlldztcclxuICAgICAgICAgICAgICAgIG9wdC5tb2RlbCA9IG87XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kKG9wdC5yZW5kZXIoKS5lbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8vIHZpZXcgc3RhdGUgY2hhbmdlc1xyXG4gICAgc3RhdGVBZGQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZpZXdTdGF0ZS5BZGQ7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHN0YXRlU2F2ZSgpIHtcclxuICAgICAgICB2YXIgbm8gPSBuZXcgbW9kZWxzLk9wZXJhdGlvbjtcclxuICAgICAgICBuby5OYW1lID0gdGhpcy4kZWwuZmluZCgnaW5wdXRbbmFtZT1OYW1lXScpLnZhbCgpO1xyXG4gICAgICAgIG5vLkxpbmVJZCA9IHRoaXMubGluZUlkO1xyXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5jcmVhdGUobm8sIHsgd2FpdDogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gVmlld1N0YXRlLkxpc3Q7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIHN0YXRlQ2FuY2VsKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBWaWV3U3RhdGUuTGlzdDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIE9wZXJhdGlvblZpZXcgZXh0ZW5kcyBiYi5WaWV3PG1vZGVscy5PcGVyYXRpb24+IHtcclxuICAgIHByaXZhdGUgc3RhdGU6IFZpZXdTdGF0ZTtcclxuICAgIHByaXZhdGUgdGVtcGxhdGU6IChkYXRhOiBhbnkpID0+IHN0cmluZztcclxuICAgIHByaXZhdGUgdGVtcGxhdGVFZGl0OiAoZGF0YTogYW55KSA9PiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZpZXdTdGF0ZS5WaWV3O1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBfLnRlbXBsYXRlKCQoJyNvcGVyYXRpb25WaWV3LXRlbXBsYXRlJykuaHRtbCgpKTtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlRWRpdCA9IF8udGVtcGxhdGUoJCgnI29wZXJhdGlvbkVkaXRWaWV3LXRlbXBsYXRlJykuaHRtbCgpKTtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBiYi5WaWV3PG1vZGVscy5PcGVyYXRpb24+IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBWaWV3U3RhdGUuVmlldzpcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh0aGlzLm1vZGVsLnRvSlNPTigpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2sgLmVkaXRCdXR0b25cIjogXCJzdGF0ZUVkaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrIC5kZWxldGVCdXR0b25cIjogXCJzdGF0ZURlbGV0ZVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFZpZXdTdGF0ZS5FZGl0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlRWRpdCh0aGlzLm1vZGVsLnRvSlNPTigpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2sgLnNhdmVCdXR0b25cIjogXCJzdGF0ZVNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrIC5jYW5jZWxCdXR0b25cIjogXCJzdGF0ZUNhbmNlbFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8vIHZpZXcgc3RhdGUgY2hhbmdlc1xyXG4gICAgc3RhdGVFZGl0KCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBWaWV3U3RhdGUuRWRpdDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGVEZWxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBzdGF0ZVNhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5OYW1lID0gdGhpcy4kZWwuZmluZCgnaW5wdXRbbmFtZT1OYW1lXScpLnZhbCgpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBWaWV3U3RhdGUuVmlldztcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGVDYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZpZXdTdGF0ZS5WaWV3O1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbn1cclxuLy8gRHJvcGRvd24gbGlzdCBvZiBvcGVyYXRpb25zIGZvciBkZWZpbmVkIGxpbmVcclxuZXhwb3J0IGNsYXNzIE9wZXJhdGlvbnNTZWxlY3RWaWV3IGV4dGVuZHMgYmIuVmlldzxtb2RlbHMuT3BlcmF0aW9uPiB7XHJcbiAgICBwcml2YXRlIGxpbmVJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3ROYW1lOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5lSWQ6IG51bWJlciwgc2VsZWN0TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gbW9kZWxzLkNvbGxlY3Rpb25zKCkuT3BlcmF0aW9ucztcclxuICAgICAgICB0aGlzLnNlbGVjdE5hbWUgPSBzZWxlY3ROYW1lO1xyXG4gICAgICAgIHRoaXMubGluZUlkID0gbGluZUlkO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogYmIuVmlldzxtb2RlbHMuT3BlcmF0aW9uPiB7XHJcbiAgICAgICAgLy8gc2VsZWN0XHJcbiAgICAgICAgdGhpcy5lbCA9ICQoJzxzZWxlY3QgbmFtZT1cIicgKyB0aGlzLnNlbGVjdE5hbWUgKyAnXCIgY2xhc3M9XCJvcHRpb25cIj4nKTtcclxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZWFjaChvID0+IHtcclxuICAgICAgICAgICAgLy8ganVzdCBhZGQgZGVmaW5lZCBsaW5lcyBvcGVyYXRpb25zXHJcbiAgICAgICAgICAgIGlmIChvLkxpbmVJZCA9PSB0aGlzLmxpbmVJZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0ID0gbmV3IE9wZXJhdGlvbk9wdGlvblZpZXc7XHJcbiAgICAgICAgICAgICAgICBvcHQubW9kZWwgPSBvO1xyXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmFwcGVuZChvcHQucmVuZGVyKCkuZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgT3BlcmF0aW9uT3B0aW9uVmlldyBleHRlbmRzIGJiLlZpZXc8bW9kZWxzLk9wZXJhdGlvbj4ge1xyXG4gICAgcmVuZGVyKCk6IGJiLlZpZXc8bW9kZWxzLk9wZXJhdGlvbj4ge1xyXG4gICAgICAgIHRoaXMuZWwgPSAkKCc8b3B0aW9uPicpO1xyXG4gICAgICAgIHRoaXMuZWwuYXR0cigndmFsdWUnLCB0aGlzLm1vZGVsLmlkKTtcclxuICAgICAgICB0aGlzLmVsLnRleHQodGhpcy5tb2RlbC5OYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=