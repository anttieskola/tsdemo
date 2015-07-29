var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var bb = Backbone;
    var Models;
    (function (Models) {
        // collection container
        var CollectionContainer = (function () {
            function CollectionContainer() {
                this.products = new Products;
                this.products.fetch();
                this.lines = new Lines;
                this.lines.fetch();
            }
            Object.defineProperty(CollectionContainer.prototype, "Products", {
                get: function () {
                    return this.products;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionContainer.prototype, "Lines", {
                get: function () {
                    return this.lines;
                },
                enumerable: true,
                configurable: true
            });
            return CollectionContainer;
        })();
        Models.CollectionContainer = CollectionContainer;
        // global access to collections
        function Collections() {
            return collections;
        }
        Models.Collections = Collections;
        // classes
        var ProductLine = (function (_super) {
            __extends(ProductLine, _super);
            function ProductLine(options) {
                _super.call(this, options);
            }
            Object.defineProperty(ProductLine.prototype, "ProductId", {
                get: function () {
                    return this.get('ProductId');
                },
                set: function (value) {
                    this.set('ProductId', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductLine.prototype, "LineId", {
                get: function () {
                    return this.get('LineId');
                },
                set: function (value) {
                    this.set('LineId', value);
                },
                enumerable: true,
                configurable: true
            });
            return ProductLine;
        })(bb.Model);
        Models.ProductLine = ProductLine;
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line(options) {
                this.urlRoot = "/api/Lines";
                _super.call(this, options);
            }
            Object.defineProperty(Line.prototype, "Name", {
                get: function () {
                    return this.get('Name');
                },
                set: function (value) {
                    this.set('Name', value);
                },
                enumerable: true,
                configurable: true
            });
            return Line;
        })(bb.Model);
        Models.Line = Line;
        var Product = (function (_super) {
            __extends(Product, _super);
            function Product(options) {
                this.urlRoot = "/api/Products";
                _super.call(this, options);
            }
            Object.defineProperty(Product.prototype, "Name", {
                get: function () {
                    return this.get('Name');
                },
                set: function (value) {
                    this.set('Name', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Product.prototype, "Lines", {
                get: function () {
                    return this.get('Lines');
                },
                set: function (value) {
                    this.set('Lines', value);
                },
                enumerable: true,
                configurable: true
            });
            return Product;
        })(bb.Model);
        Models.Product = Product;
        // collections
        var Products = (function (_super) {
            __extends(Products, _super);
            function Products(options) {
                this.bind('add', this.onModelAdded, this);
                this.bind('remove', this.onModelRemoved, this);
                this.url = "/api/Products";
                this.model = Product;
                _super.call(this, options);
            }
            Products.prototype.onModelAdded = function (model) {
                console.log("product added [" + model.id + "] " + model.Name);
            };
            Products.prototype.onModelRemoved = function (model) {
                console.log("product removed [" + model.id + "] " + model.Name);
            };
            return Products;
        })(bb.Collection);
        Models.Products = Products;
        var Lines = (function (_super) {
            __extends(Lines, _super);
            function Lines(options) {
                this.bind('add', this.onModelAdded, this);
                this.bind('remove', this.onModelRemoved, this);
                this.url = "/api/Lines";
                this.model = Line;
                _super.call(this, options);
            }
            Lines.prototype.onModelAdded = function (model) {
                console.log("line added [" + model.id + "] " + model.Name);
            };
            Lines.prototype.onModelRemoved = function (model) {
                console.log("line removed [" + model.id + "] " + model.Name);
            };
            return Lines;
        })(bb.Collection);
        Models.Lines = Lines;
    })(Models = exports.Models || (exports.Models = {}));
    // global collections
    var collections = new Models.CollectionContainer;
});
//# sourceMappingURL=Models.js.map