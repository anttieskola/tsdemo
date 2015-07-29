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
                this.statuses = new Statuses;
                this.statuses.fetch();
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
            Object.defineProperty(CollectionContainer.prototype, "Statuses", {
                get: function () {
                    return this.statuses;
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
            Object.defineProperty(Line.prototype, "Operations", {
                get: function () {
                    return this.get('Operations');
                },
                set: function (value) {
                    this.set('Operations', value);
                },
                enumerable: true,
                configurable: true
            });
            return Line;
        })(bb.Model);
        Models.Line = Line;
        var Operation = (function (_super) {
            __extends(Operation, _super);
            function Operation(options) {
                _super.call(this, options);
            }
            Object.defineProperty(Operation.prototype, "Name", {
                get: function () {
                    return this.get('Name');
                },
                set: function (value) {
                    this.set('Name', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Operation.prototype, "LineId", {
                get: function () {
                    return this.get('LineId');
                },
                set: function (value) {
                    this.set('LineId');
                },
                enumerable: true,
                configurable: true
            });
            return Operation;
        })(bb.Model);
        Models.Operation = Operation;
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
        var Status = (function (_super) {
            __extends(Status, _super);
            function Status(options) {
                _super.call(this, options);
            }
            Object.defineProperty(Status.prototype, "Complete", {
                get: function () {
                    return this.get('Complete');
                },
                set: function (value) {
                    this.set('Complete', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Status.prototype, "Notes", {
                get: function () {
                    return this.get('Notes');
                },
                set: function (value) {
                    this.set('Notes', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Status.prototype, "ProductId", {
                get: function () {
                    return this.get('ProductId');
                },
                set: function (value) {
                    this.set('ProductId', value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Status.prototype, "OperationId", {
                get: function () {
                    return this.get('OperationId');
                },
                set: function (value) {
                    this.set('OperationId', value);
                },
                enumerable: true,
                configurable: true
            });
            return Status;
        })(bb.Model);
        Models.Status = Status;
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
        var Statuses = (function (_super) {
            __extends(Statuses, _super);
            function Statuses(options) {
                this.bind('add', this.onModelAdded, this);
                this.bind('remove', this.onModelRemoved, this);
                this.url = "api/statuses";
                this.model = Status;
                _super.call(this, options);
            }
            Statuses.prototype.onModelAdded = function (model) {
                console.log("status added [" + model.id + "] " + model.Complete);
            };
            Statuses.prototype.onModelRemoved = function (model) {
                console.log("status removed [" + model.id + "] " + model.Complete);
            };
            return Statuses;
        })(bb.Collection);
        Models.Statuses = Statuses;
    })(Models = exports.Models || (exports.Models = {}));
    // global collections
    var collections = new Models.CollectionContainer;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVscy50cyJdLCJuYW1lcyI6WyJNb2RlbHMiLCJNb2RlbHMuQ29sbGVjdGlvbkNvbnRhaW5lciIsIk1vZGVscy5Db2xsZWN0aW9uQ29udGFpbmVyLmNvbnN0cnVjdG9yIiwiTW9kZWxzLkNvbGxlY3Rpb25Db250YWluZXIuUHJvZHVjdHMiLCJNb2RlbHMuQ29sbGVjdGlvbkNvbnRhaW5lci5MaW5lcyIsIk1vZGVscy5Db2xsZWN0aW9uQ29udGFpbmVyLlN0YXR1c2VzIiwiTW9kZWxzLkNvbGxlY3Rpb25zIiwiTW9kZWxzLkxpbmUiLCJNb2RlbHMuTGluZS5jb25zdHJ1Y3RvciIsIk1vZGVscy5MaW5lLk5hbWUiLCJNb2RlbHMuTGluZS5PcGVyYXRpb25zIiwiTW9kZWxzLk9wZXJhdGlvbiIsIk1vZGVscy5PcGVyYXRpb24uY29uc3RydWN0b3IiLCJNb2RlbHMuT3BlcmF0aW9uLk5hbWUiLCJNb2RlbHMuT3BlcmF0aW9uLkxpbmVJZCIsIk1vZGVscy5Qcm9kdWN0TGluZSIsIk1vZGVscy5Qcm9kdWN0TGluZS5jb25zdHJ1Y3RvciIsIk1vZGVscy5Qcm9kdWN0TGluZS5Qcm9kdWN0SWQiLCJNb2RlbHMuUHJvZHVjdExpbmUuTGluZUlkIiwiTW9kZWxzLlByb2R1Y3QiLCJNb2RlbHMuUHJvZHVjdC5jb25zdHJ1Y3RvciIsIk1vZGVscy5Qcm9kdWN0Lk5hbWUiLCJNb2RlbHMuUHJvZHVjdC5MaW5lcyIsIk1vZGVscy5TdGF0dXMiLCJNb2RlbHMuU3RhdHVzLmNvbnN0cnVjdG9yIiwiTW9kZWxzLlN0YXR1cy5Db21wbGV0ZSIsIk1vZGVscy5TdGF0dXMuTm90ZXMiLCJNb2RlbHMuU3RhdHVzLlByb2R1Y3RJZCIsIk1vZGVscy5TdGF0dXMuT3BlcmF0aW9uSWQiLCJNb2RlbHMuUHJvZHVjdHMiLCJNb2RlbHMuUHJvZHVjdHMuY29uc3RydWN0b3IiLCJNb2RlbHMuUHJvZHVjdHMub25Nb2RlbEFkZGVkIiwiTW9kZWxzLlByb2R1Y3RzLm9uTW9kZWxSZW1vdmVkIiwiTW9kZWxzLkxpbmVzIiwiTW9kZWxzLkxpbmVzLmNvbnN0cnVjdG9yIiwiTW9kZWxzLkxpbmVzLm9uTW9kZWxBZGRlZCIsIk1vZGVscy5MaW5lcy5vbk1vZGVsUmVtb3ZlZCIsIk1vZGVscy5TdGF0dXNlcyIsIk1vZGVscy5TdGF0dXNlcy5jb25zdHJ1Y3RvciIsIk1vZGVscy5TdGF0dXNlcy5vbk1vZGVsQWRkZWQiLCJNb2RlbHMuU3RhdHVzZXMub25Nb2RlbFJlbW92ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFBQSxJQUFPLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFFckIsSUFBYyxNQUFNLENBb01uQjtJQXBNRCxXQUFjLE1BQU0sRUFBQyxDQUFDO1FBQ2xCQSxBQUNBQSx1QkFEdUJBOztZQUtuQkM7Z0JBQ0lDLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDdkJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7WUFDREQsc0JBQUlBLHlDQUFRQTtxQkFBWkE7b0JBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dCQUN6QkEsQ0FBQ0E7OztlQUFBRjtZQUNEQSxzQkFBSUEsc0NBQUtBO3FCQUFUQTtvQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ3RCQSxDQUFDQTs7O2VBQUFIO1lBQ0RBLHNCQUFJQSx5Q0FBUUE7cUJBQVpBO29CQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFR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QUFHQSxjQUFjQSxDQUFDQTtnQkFDMUJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBO2dCQUNwQkEsa0JBQU1BLE9BQU9BLENBQUNBLENBQUNBO1lBQ25CQSxDQUFDQTtZQUNERCwrQkFBWUEsR0FBWkEsVUFBYUEsS0FBYUE7Z0JBQ3RCRSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3JFQSxDQUFDQTtZQUNERixpQ0FBY0EsR0FBZEEsVUFBZUEsS0FBYUE7Z0JBQ3hCRyxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLEdBQUdBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3ZFQSxDQUFDQTtZQUNMSCxlQUFDQTtRQUFEQSxDQWRBckMsQUFjQ3FDLEVBZDZCckMsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFjMUNBO1FBZFlBLGVBQVFBLFdBY3BCQSxDQUFBQTtJQUNMQSxDQUFDQSxFQXBNYSxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFvTW5CO0lBQ0QsQUFDQSxxQkFEcUI7UUFDakIsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDIiwiZmlsZSI6Ik1vZGVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYiA9IEJhY2tib25lO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBNb2RlbHMge1xyXG4gICAgLy8gY29sbGVjdGlvbiBjb250YWluZXJcclxuICAgIGV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQ29udGFpbmVyIHtcclxuICAgICAgICBwcml2YXRlIHByb2R1Y3RzOiBQcm9kdWN0cztcclxuICAgICAgICBwcml2YXRlIGxpbmVzOiBMaW5lcztcclxuICAgICAgICBwcml2YXRlIHN0YXR1c2VzOiBTdGF0dXNlcztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG5ldyBQcm9kdWN0cztcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0cy5mZXRjaCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVzID0gbmV3IExpbmVzO1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVzLmZldGNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMgPSBuZXcgU3RhdHVzZXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMuZmV0Y2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFByb2R1Y3RzKCk6IFByb2R1Y3RzIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBMaW5lcygpOiBMaW5lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgU3RhdHVzZXMoKTogU3RhdHVzZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXNlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBnbG9iYWwgYWNjZXNzIHRvIGNvbGxlY3Rpb25zXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29sbGVjdGlvbnMoKTogQ29sbGVjdGlvbkNvbnRhaW5lciB7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25zO1xyXG4gICAgfVxyXG4gICAgLy8gaW50ZXJmYWNlc1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTGluZSB7XHJcbiAgICAgICAgTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIE9wZXJhdGlvbnM6IEFycmF5PElPcGVyYXRpb24+O1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJvZHVjdCB7XHJcbiAgICAgICAgTmFtZTogc3RyaW5nO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJvZHVjdExpbmUge1xyXG4gICAgICAgIFByb2R1Y3RJZDogbnVtYmVyO1xyXG4gICAgICAgIExpbmVJZDogbnVtYmVyO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJT3BlcmF0aW9uIHtcclxuICAgICAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgTGluZUlkOiBudW1iZXI7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTdGF0dXMge1xyXG4gICAgICAgIENvbXBsZXRlOiBib29sZWFuO1xyXG4gICAgICAgIE5vdGVzOiBzdHJpbmc7XHJcbiAgICAgICAgUHJvZHVjdElkOiBudW1iZXI7XHJcbiAgICAgICAgT3BlcmF0aW9uSWQ6IG51bWJlcjtcclxuICAgIH1cclxuICAgIC8vIGNsYXNzZXNcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJTGluZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnVybFJvb3QgPSBcIi9hcGkvTGluZXNcIjtcclxuICAgICAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnTmFtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdOYW1lJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgT3BlcmF0aW9ucygpOiBBcnJheTxPcGVyYXRpb24+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdPcGVyYXRpb25zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBPcGVyYXRpb25zKHZhbHVlOiBBcnJheTxPcGVyYXRpb24+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdPcGVyYXRpb25zJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBPcGVyYXRpb24gZXh0ZW5kcyBiYi5Nb2RlbCBpbXBsZW1lbnRzIElPcGVyYXRpb24ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnTmFtZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdOYW1lJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgTGluZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnTGluZUlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBMaW5lSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldCgnTGluZUlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFByb2R1Y3RMaW5lIGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJUHJvZHVjdExpbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBQcm9kdWN0SWQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdQcm9kdWN0SWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFByb2R1Y3RJZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdQcm9kdWN0SWQnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBMaW5lSWQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdMaW5lSWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IExpbmVJZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdMaW5lSWQnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBiYi5Nb2RlbCBpbXBsZW1lbnRzIElQcm9kdWN0IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXJsUm9vdCA9IFwiL2FwaS9Qcm9kdWN0c1wiO1xyXG4gICAgICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdOYW1lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBOYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoJ05hbWUnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBMaW5lcygpOiBBcnJheTxQcm9kdWN0TGluZT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ0xpbmVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBMaW5lcyh2YWx1ZTogQXJyYXk8UHJvZHVjdExpbmU+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdMaW5lcycsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgU3RhdHVzIGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJU3RhdHVzIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgQ29tcGxldGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnQ29tcGxldGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IENvbXBsZXRlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCdDb21wbGV0ZScsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5vdGVzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnTm90ZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IE5vdGVzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoJ05vdGVzJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgUHJvZHVjdElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnUHJvZHVjdElkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBQcm9kdWN0SWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldCgnUHJvZHVjdElkJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgT3BlcmF0aW9uSWQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdPcGVyYXRpb25JZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgT3BlcmF0aW9uSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldCgnT3BlcmF0aW9uSWQnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gY29sbGVjdGlvbnNcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9kdWN0cyBleHRlbmRzIGJiLkNvbGxlY3Rpb248UHJvZHVjdD4ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kKCdhZGQnLCB0aGlzLm9uTW9kZWxBZGRlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZCgncmVtb3ZlJywgdGhpcy5vbk1vZGVsUmVtb3ZlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudXJsID0gXCIvYXBpL1Byb2R1Y3RzXCI7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBQcm9kdWN0O1xyXG4gICAgICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25Nb2RlbEFkZGVkKG1vZGVsOiBQcm9kdWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJvZHVjdCBhZGRlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbDogUHJvZHVjdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByb2R1Y3QgcmVtb3ZlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBMaW5lcyBleHRlbmRzIGJiLkNvbGxlY3Rpb248TGluZT4ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kKCdhZGQnLCB0aGlzLm9uTW9kZWxBZGRlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZCgncmVtb3ZlJywgdGhpcy5vbk1vZGVsUmVtb3ZlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudXJsID0gXCIvYXBpL0xpbmVzXCI7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBMaW5lO1xyXG4gICAgICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25Nb2RlbEFkZGVkKG1vZGVsOiBMaW5lKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGluZSBhZGRlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbDogTGluZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxpbmUgcmVtb3ZlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0dXNlcyBleHRlbmRzIGJiLkNvbGxlY3Rpb248U3RhdHVzPiB7XHJcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmQoJ2FkZCcsIHRoaXMub25Nb2RlbEFkZGVkLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kKCdyZW1vdmUnLCB0aGlzLm9uTW9kZWxSZW1vdmVkLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy51cmwgPSBcImFwaS9zdGF0dXNlc1wiO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gU3RhdHVzO1xyXG4gICAgICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25Nb2RlbEFkZGVkKG1vZGVsOiBTdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgYWRkZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5Db21wbGV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsOiBTdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgcmVtb3ZlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLkNvbXBsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8gZ2xvYmFsIGNvbGxlY3Rpb25zXHJcbnZhciBjb2xsZWN0aW9ucyA9IG5ldyBNb2RlbHMuQ29sbGVjdGlvbkNvbnRhaW5lcjsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=