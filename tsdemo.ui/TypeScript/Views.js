var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Models"], function (require, exports, modelsFile) {
    var bb = Backbone;
    var models = modelsFile.Models;
    var Views;
    (function (Views) {
        // list view of products
        var ProductsListView = (function (_super) {
            __extends(ProductsListView, _super);
            function ProductsListView() {
                _super.apply(this, arguments);
            }
            ProductsListView.prototype.render = function () {
                var _this = this;
                // clear
                this.$el.html('');
                // collection
                this.collection.each(function (p) {
                    // append it
                    var plw = new ProductListView;
                    plw.model = p;
                    // "view chaining"
                    _this.$el.append(plw.render().el);
                }, this);
                return this;
            };
            return ProductsListView;
        })(bb.View);
        Views.ProductsListView = ProductsListView;
        var ProductListView = (function (_super) {
            __extends(ProductListView, _super);
            function ProductListView() {
                this.events = {
                    "click .editButton": "modelEdit",
                    "click .deleteButton": "modelDelete",
                    "click .saveButton": "modelSave",
                    "click .cancelButton": "modelCancel",
                    "click .lineAddButton": "modelAddLine",
                    "click .lineDeleteButton": "modelDeleteLine"
                };
                _super.call(this);
                this.template = _.template($('#productList-template').html());
            }
            ProductListView.prototype.render = function () {
                this.$el.html(this.template(this.model.toJSON()));
                if (this.editing) {
                    var lsv = new LinesSelectView;
                    var lineSelectorHtml = lsv.render().el;
                    this.$el.find('div[class=lineSelect]')
                        .append(lineSelectorHtml);
                }
                return this;
            };
            ProductListView.prototype.modelEdit = function () {
                this.template = _.template($('#productListEdit-template').html());
                this.editing = true;
                this.render();
            };
            ProductListView.prototype.modelSave = function () {
                this.model.Name = this.$el.find('input[name=Name]').val();
                this.model.save();
                this.editing = false;
                this.template = _.template($('#productList-template').html());
                this.render();
            };
            ProductListView.prototype.modelCancel = function () {
                this.template = _.template($('#productList-template').html());
                this.editing = false;
                this.render();
            };
            ProductListView.prototype.modelAddLine = function () {
                debugger;
                var lineId = parseInt(this.$el.find('div[class=lineSelect]')
                    .find('select').val());
                if (lineId > 0) {
                    if (this.model.Lines == null) {
                        this.model.Lines = new Array();
                    }
                    var pl = new models.ProductLine;
                    pl.ProductId = this.model.id;
                    pl.LineId = lineId;
                    this.model.Lines.push(pl);
                    this.model.save();
                }
            };
            ProductListView.prototype.modelDeleteLine = function (e) {
                debugger;
                var lineId = parseInt($(e.target).attr('data-lineId'));
                if (lineId > 0) {
                    this.model.Lines = this.model.Lines.filter(function (pl) { return pl.LineId != lineId; });
                    this.model.save();
                }
            };
            ProductListView.prototype.modelDelete = function () {
                this.model.destroy();
            };
            return ProductListView;
        })(bb.View);
        Views.ProductListView = ProductListView;
        var LinesListView = (function (_super) {
            __extends(LinesListView, _super);
            function LinesListView() {
                _super.apply(this, arguments);
            }
            LinesListView.prototype.render = function () {
                var _this = this;
                // clear
                this.$el.html('');
                // collection
                this.collection.each(function (l) {
                    // append it
                    var llw = new LineListView;
                    llw.model = l;
                    // "view chaining"
                    _this.$el.append(llw.render().el);
                }, this);
                return this;
            };
            return LinesListView;
        })(bb.View);
        Views.LinesListView = LinesListView;
        var LineListView = (function (_super) {
            __extends(LineListView, _super);
            function LineListView() {
                this.events = {
                    "click .editButton": "modelEdit",
                    "click .deleteButton": "modelDelete",
                    "click .saveButton": "modelSave",
                    "click .cancelButton": "modelCancel"
                };
                _super.call(this);
                this.template = _.template($('#lineList-template').html());
            }
            LineListView.prototype.render = function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            };
            LineListView.prototype.modelEdit = function () {
                this.template = _.template($('#lineListEdit-template').html());
                this.render();
            };
            LineListView.prototype.modelSave = function () {
                this.model.Name = this.$el.find('input[name=Name]').val();
                this.model.save();
                this.template = _.template($('#lineList-template').html());
                this.render();
            };
            LineListView.prototype.modelCancel = function () {
                this.template = _.template($('#lineList-template').html());
                this.render();
            };
            LineListView.prototype.modelDelete = function () {
                this.model.destroy();
            };
            return LineListView;
        })(bb.View);
        Views.LineListView = LineListView;
        var LinesSelectView = (function (_super) {
            __extends(LinesSelectView, _super);
            function LinesSelectView(options) {
                this.collection = models.Collections().Lines;
                _super.call(this, options);
            }
            LinesSelectView.prototype.render = function () {
                var _this = this;
                // select
                this.el = $('<select class="option">');
                this.collection.each(function (l) {
                    // option
                    var lov = new LineOptionView;
                    lov.model = l;
                    // append
                    _this.el.append(lov.render().el);
                }, this);
                return this;
            };
            return LinesSelectView;
        })(bb.View);
        Views.LinesSelectView = LinesSelectView;
        var LineOptionView = (function (_super) {
            __extends(LineOptionView, _super);
            function LineOptionView() {
                _super.apply(this, arguments);
            }
            LineOptionView.prototype.render = function () {
                this.el = $('<option>');
                this.el.attr('value', this.model.id);
                this.el.text(this.model.Name);
                return this;
            };
            return LineOptionView;
        })(bb.View);
        Views.LineOptionView = LineOptionView;
    })(Views = exports.Views || (exports.Views = {}));
});
//# sourceMappingURL=Views.js.map