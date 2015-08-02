var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var bb = Backbone;
    // messasing hub so modules cans send messages to each other
    // (circular reference between modules is forbidden)
    var MessasingHub = (function (_super) {
        __extends(MessasingHub, _super);
        function MessasingHub() {
            _super.call(this);
            // add events you want to send across modules
            this.events = {
                "selectProduct": "selectProduct",
                "selectLine": "selectLine"
            };
        }
        return MessasingHub;
    })(bb.View);
    exports.MessasingHub = MessasingHub;
    function Messaging() {
        return messaging;
    }
    exports.Messaging = Messaging;
    var messaging = new MessasingHub;
    // collection container
    var CollectionContainer = (function () {
        function CollectionContainer() {
            this.products = new Products;
            this.products.fetch();
            this.lines = new Lines;
            this.lines.fetch();
            this.statuses = new Statuses;
            this.statuses.fetch();
            this.operations = new Operations;
            this.operations.fetch();
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
        Object.defineProperty(CollectionContainer.prototype, "Operations", {
            get: function () {
                return this.operations;
            },
            enumerable: true,
            configurable: true
        });
        return CollectionContainer;
    })();
    exports.CollectionContainer = CollectionContainer;
    // global access to collections
    function Collections() {
        return collections;
    }
    exports.Collections = Collections;
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
    exports.Line = Line;
    var Operation = (function (_super) {
        __extends(Operation, _super);
        function Operation(options) {
            this.urlRoot = "/api/Operations";
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
                this.set('LineId', value);
            },
            enumerable: true,
            configurable: true
        });
        return Operation;
    })(bb.Model);
    exports.Operation = Operation;
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
    exports.ProductLine = ProductLine;
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
    exports.Product = Product;
    var Status = (function (_super) {
        __extends(Status, _super);
        function Status(options) {
            this.urlRoot = "/api/statuses";
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
    exports.Status = Status;
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
    exports.Products = Products;
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
    exports.Lines = Lines;
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
    exports.Statuses = Statuses;
    var Operations = (function (_super) {
        __extends(Operations, _super);
        function Operations(options) {
            this.bind('add', this.onModelAdded, this);
            this.bind('remove', this.onModelRemoved, this);
            this.url = "api/operations";
            this.model = Operation;
            _super.call(this, options);
        }
        Operations.prototype.onModelAdded = function (model) {
            console.log("operation added [" + model.id + "] " + model.Name);
        };
        Operations.prototype.onModelRemoved = function (model) {
            console.log("operation removed [" + model.id + "] " + model.Name);
        };
        return Operations;
    })(bb.Collection);
    exports.Operations = Operations;
    // global collections
    var collections = new CollectionContainer;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVscy50cyJdLCJuYW1lcyI6WyJNZXNzYXNpbmdIdWIiLCJNZXNzYXNpbmdIdWIuY29uc3RydWN0b3IiLCJNZXNzYWdpbmciLCJDb2xsZWN0aW9uQ29udGFpbmVyIiwiQ29sbGVjdGlvbkNvbnRhaW5lci5jb25zdHJ1Y3RvciIsIkNvbGxlY3Rpb25Db250YWluZXIuUHJvZHVjdHMiLCJDb2xsZWN0aW9uQ29udGFpbmVyLkxpbmVzIiwiQ29sbGVjdGlvbkNvbnRhaW5lci5TdGF0dXNlcyIsIkNvbGxlY3Rpb25Db250YWluZXIuT3BlcmF0aW9ucyIsIkNvbGxlY3Rpb25zIiwiTGluZSIsIkxpbmUuY29uc3RydWN0b3IiLCJMaW5lLk5hbWUiLCJMaW5lLk9wZXJhdGlvbnMiLCJPcGVyYXRpb24iLCJPcGVyYXRpb24uY29uc3RydWN0b3IiLCJPcGVyYXRpb24uTmFtZSIsIk9wZXJhdGlvbi5MaW5lSWQiLCJQcm9kdWN0TGluZSIsIlByb2R1Y3RMaW5lLmNvbnN0cnVjdG9yIiwiUHJvZHVjdExpbmUuUHJvZHVjdElkIiwiUHJvZHVjdExpbmUuTGluZUlkIiwiUHJvZHVjdCIsIlByb2R1Y3QuY29uc3RydWN0b3IiLCJQcm9kdWN0Lk5hbWUiLCJQcm9kdWN0LkxpbmVzIiwiU3RhdHVzIiwiU3RhdHVzLmNvbnN0cnVjdG9yIiwiU3RhdHVzLkNvbXBsZXRlIiwiU3RhdHVzLk5vdGVzIiwiU3RhdHVzLlByb2R1Y3RJZCIsIlN0YXR1cy5PcGVyYXRpb25JZCIsIlByb2R1Y3RzIiwiUHJvZHVjdHMuY29uc3RydWN0b3IiLCJQcm9kdWN0cy5vbk1vZGVsQWRkZWQiLCJQcm9kdWN0cy5vbk1vZGVsUmVtb3ZlZCIsIkxpbmVzIiwiTGluZXMuY29uc3RydWN0b3IiLCJMaW5lcy5vbk1vZGVsQWRkZWQiLCJMaW5lcy5vbk1vZGVsUmVtb3ZlZCIsIlN0YXR1c2VzIiwiU3RhdHVzZXMuY29uc3RydWN0b3IiLCJTdGF0dXNlcy5vbk1vZGVsQWRkZWQiLCJTdGF0dXNlcy5vbk1vZGVsUmVtb3ZlZCIsIk9wZXJhdGlvbnMiLCJPcGVyYXRpb25zLmNvbnN0cnVjdG9yIiwiT3BlcmF0aW9ucy5vbk1vZGVsQWRkZWQiLCJPcGVyYXRpb25zLm9uTW9kZWxSZW1vdmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQUEsSUFBTyxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ3JCLEFBRUEsNERBRjREO0lBQzVELG9EQUFvRDs7UUFDbEJBLGdDQUFpQkE7UUFDL0NBO1lBQ0lDLGlCQUFPQSxDQUFDQTtZQUNSQSxBQUNBQSw2Q0FENkNBO1lBQzdDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUNYQTtnQkFDSUEsZUFBZUEsRUFBRUEsZUFBZUE7Z0JBQ2hDQSxZQUFZQSxFQUFFQSxZQUFZQTthQUM3QkEsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFDTEQsbUJBQUNBO0lBQURBLENBVkEsQUFVQ0EsRUFWaUMsRUFBRSxDQUFDLElBQUksRUFVeEM7SUFWWSxvQkFBWSxlQVV4QixDQUFBO0lBQ0Q7UUFDSUUsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRmUsaUJBQVMsWUFFeEIsQ0FBQTtJQUNELElBQUksU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDO0lBRWpDLEFBQ0EsdUJBRHVCOztRQU1uQkM7WUFDSUMsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUN0QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsVUFBVUEs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LENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUMvQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsZ0JBQWdCQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsU0FBU0EsQ0FBQ0E7WUFDdkJBLGtCQUFNQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFDREQsaUNBQVlBLEdBQVpBLFVBQWFBLEtBQWdCQTtZQUN6QkUsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUJBQW1CQSxHQUFHQSxLQUFLQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNwRUEsQ0FBQ0E7UUFDREYsbUNBQWNBLEdBQWRBLFVBQWVBLEtBQWdCQTtZQUMzQkcsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EscUJBQXFCQSxHQUFHQSxLQUFLQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUN0RUEsQ0FBQ0E7UUFDTEgsaUJBQUNBO0lBQURBLENBZEEsQUFjQ0EsRUFkK0IsRUFBRSxDQUFDLFVBQVUsRUFjNUM7SUFkWSxrQkFBVSxhQWN0QixDQUFBO0lBRUQsQUFDQSxxQkFEcUI7UUFDakIsV0FBVyxHQUFHLElBQUksbUJBQW1CLENBQUMiLCJmaWxlIjoiTW9kZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJiID0gQmFja2JvbmU7XHJcbi8vIG1lc3Nhc2luZyBodWIgc28gbW9kdWxlcyBjYW5zIHNlbmQgbWVzc2FnZXMgdG8gZWFjaCBvdGhlclxyXG4vLyAoY2lyY3VsYXIgcmVmZXJlbmNlIGJldHdlZW4gbW9kdWxlcyBpcyBmb3JiaWRkZW4pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYXNpbmdIdWIgZXh0ZW5kcyBiYi5WaWV3PGJiLk1vZGVsPiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIGFkZCBldmVudHMgeW91IHdhbnQgdG8gc2VuZCBhY3Jvc3MgbW9kdWxlc1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0gPGFueT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VsZWN0UHJvZHVjdFwiOiBcInNlbGVjdFByb2R1Y3RcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RMaW5lXCI6IFwic2VsZWN0TGluZVwiXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gTWVzc2FnaW5nKCk6IE1lc3Nhc2luZ0h1YiB7XHJcbiAgICByZXR1cm4gbWVzc2FnaW5nO1xyXG59XHJcbnZhciBtZXNzYWdpbmcgPSBuZXcgTWVzc2FzaW5nSHViO1xyXG5cclxuLy8gY29sbGVjdGlvbiBjb250YWluZXJcclxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25Db250YWluZXIge1xyXG4gICAgcHJpdmF0ZSBwcm9kdWN0czogUHJvZHVjdHM7XHJcbiAgICBwcml2YXRlIGxpbmVzOiBMaW5lcztcclxuICAgIHByaXZhdGUgc3RhdHVzZXM6IFN0YXR1c2VzO1xyXG4gICAgcHJpdmF0ZSBvcGVyYXRpb25zOiBPcGVyYXRpb25zO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG5ldyBQcm9kdWN0cztcclxuICAgICAgICB0aGlzLnByb2R1Y3RzLmZldGNoKCk7XHJcbiAgICAgICAgdGhpcy5saW5lcyA9IG5ldyBMaW5lcztcclxuICAgICAgICB0aGlzLmxpbmVzLmZldGNoKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNlcyA9IG5ldyBTdGF0dXNlcztcclxuICAgICAgICB0aGlzLnN0YXR1c2VzLmZldGNoKCk7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zID0gbmV3IE9wZXJhdGlvbnM7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zLmZldGNoKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUHJvZHVjdHMoKTogUHJvZHVjdHMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzO1xyXG4gICAgfVxyXG4gICAgZ2V0IExpbmVzKCk6IExpbmVzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saW5lcztcclxuICAgIH1cclxuICAgIGdldCBTdGF0dXNlcygpOiBTdGF0dXNlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzZXM7XHJcbiAgICB9XHJcbiAgICBnZXQgT3BlcmF0aW9ucygpOiBPcGVyYXRpb25zIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zO1xyXG4gICAgfVxyXG59XHJcbi8vIGdsb2JhbCBhY2Nlc3MgdG8gY29sbGVjdGlvbnNcclxuZXhwb3J0IGZ1bmN0aW9uIENvbGxlY3Rpb25zKCk6IENvbGxlY3Rpb25Db250YWluZXIge1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25zO1xyXG59XHJcbi8vIGludGVyZmFjZXNcclxuZXhwb3J0IGludGVyZmFjZSBJTGluZSB7XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBPcGVyYXRpb25zOiBBcnJheTxJT3BlcmF0aW9uPjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9kdWN0IHtcclxuICAgIE5hbWU6IHN0cmluZztcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9kdWN0TGluZSB7XHJcbiAgICBQcm9kdWN0SWQ6IG51bWJlcjtcclxuICAgIExpbmVJZDogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9wZXJhdGlvbiB7XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBMaW5lSWQ6IG51bWJlcjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0dXMge1xyXG4gICAgQ29tcGxldGU6IGJvb2xlYW47XHJcbiAgICBOb3Rlczogc3RyaW5nO1xyXG4gICAgUHJvZHVjdElkOiBudW1iZXI7XHJcbiAgICBPcGVyYXRpb25JZDogbnVtYmVyO1xyXG59XHJcbi8vIGNsYXNzZXNcclxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBiYi5Nb2RlbCBpbXBsZW1lbnRzIElMaW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnVybFJvb3QgPSBcIi9hcGkvTGluZXNcIjtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdOYW1lJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgTmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ05hbWUnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgT3BlcmF0aW9ucygpOiBBcnJheTxPcGVyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ09wZXJhdGlvbnMnKTtcclxuICAgIH1cclxuICAgIHNldCBPcGVyYXRpb25zKHZhbHVlOiBBcnJheTxPcGVyYXRpb24+KSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ09wZXJhdGlvbnMnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE9wZXJhdGlvbiBleHRlbmRzIGJiLk1vZGVsIGltcGxlbWVudHMgSU9wZXJhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy51cmxSb290ID0gXCIvYXBpL09wZXJhdGlvbnNcIjtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdOYW1lJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgTmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ05hbWUnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgTGluZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdMaW5lSWQnKTtcclxuICAgIH1cclxuICAgIHNldCBMaW5lSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0KCdMaW5lSWQnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RMaW5lIGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJUHJvZHVjdExpbmUge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFByb2R1Y3RJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnUHJvZHVjdElkJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgUHJvZHVjdElkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldCgnUHJvZHVjdElkJywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExpbmVJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnTGluZUlkJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgTGluZUlkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldCgnTGluZUlkJywgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJUHJvZHVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy51cmxSb290ID0gXCIvYXBpL1Byb2R1Y3RzXCI7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnTmFtZScpO1xyXG4gICAgfVxyXG4gICAgc2V0IE5hbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0KCdOYW1lJywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExpbmVzKCk6IEFycmF5PFByb2R1Y3RMaW5lPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdMaW5lcycpO1xyXG4gICAgfVxyXG4gICAgc2V0IExpbmVzKHZhbHVlOiBBcnJheTxQcm9kdWN0TGluZT4pIHtcclxuICAgICAgICB0aGlzLnNldCgnTGluZXMnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN0YXR1cyBleHRlbmRzIGJiLk1vZGVsIGltcGxlbWVudHMgSVN0YXR1cyB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy51cmxSb290ID0gXCIvYXBpL3N0YXR1c2VzXCI7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQ29tcGxldGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdDb21wbGV0ZScpO1xyXG4gICAgfVxyXG4gICAgc2V0IENvbXBsZXRlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ0NvbXBsZXRlJywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IE5vdGVzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdOb3RlcycpO1xyXG4gICAgfVxyXG4gICAgc2V0IE5vdGVzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldCgnTm90ZXMnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgUHJvZHVjdElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdQcm9kdWN0SWQnKTtcclxuICAgIH1cclxuICAgIHNldCBQcm9kdWN0SWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0KCdQcm9kdWN0SWQnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgT3BlcmF0aW9uSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ09wZXJhdGlvbklkJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgT3BlcmF0aW9uSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0KCdPcGVyYXRpb25JZCcsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG4vLyBjb2xsZWN0aW9uc1xyXG5leHBvcnQgY2xhc3MgUHJvZHVjdHMgZXh0ZW5kcyBiYi5Db2xsZWN0aW9uPFByb2R1Y3Q+IHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmJpbmQoJ2FkZCcsIHRoaXMub25Nb2RlbEFkZGVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJpbmQoJ3JlbW92ZScsIHRoaXMub25Nb2RlbFJlbW92ZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXJsID0gXCIvYXBpL1Byb2R1Y3RzXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFByb2R1Y3Q7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBvbk1vZGVsQWRkZWQobW9kZWw6IFByb2R1Y3QpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInByb2R1Y3QgYWRkZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5OYW1lKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsOiBQcm9kdWN0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwcm9kdWN0IHJlbW92ZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5OYW1lKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgTGluZXMgZXh0ZW5kcyBiYi5Db2xsZWN0aW9uPExpbmU+IHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmJpbmQoJ2FkZCcsIHRoaXMub25Nb2RlbEFkZGVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJpbmQoJ3JlbW92ZScsIHRoaXMub25Nb2RlbFJlbW92ZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXJsID0gXCIvYXBpL0xpbmVzXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IExpbmU7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBvbk1vZGVsQWRkZWQobW9kZWw6IExpbmUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxpbmUgYWRkZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5OYW1lKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsOiBMaW5lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsaW5lIHJlbW92ZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5OYW1lKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgU3RhdHVzZXMgZXh0ZW5kcyBiYi5Db2xsZWN0aW9uPFN0YXR1cz4ge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIHRoaXMuYmluZCgnYWRkJywgdGhpcy5vbk1vZGVsQWRkZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmluZCgncmVtb3ZlJywgdGhpcy5vbk1vZGVsUmVtb3ZlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcImFwaS9zdGF0dXNlc1wiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBTdGF0dXM7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBvbk1vZGVsQWRkZWQobW9kZWw6IFN0YXR1cykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhdHVzIGFkZGVkIFtcIiArIG1vZGVsLmlkICsgXCJdIFwiICsgbW9kZWwuQ29tcGxldGUpO1xyXG4gICAgfVxyXG4gICAgb25Nb2RlbFJlbW92ZWQobW9kZWw6IFN0YXR1cykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhdHVzIHJlbW92ZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5Db21wbGV0ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE9wZXJhdGlvbnMgZXh0ZW5kcyBiYi5Db2xsZWN0aW9uPE9wZXJhdGlvbj4ge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIHRoaXMuYmluZCgnYWRkJywgdGhpcy5vbk1vZGVsQWRkZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmluZCgncmVtb3ZlJywgdGhpcy5vbk1vZGVsUmVtb3ZlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcImFwaS9vcGVyYXRpb25zXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IE9wZXJhdGlvbjtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxBZGRlZChtb2RlbDogT3BlcmF0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvcGVyYXRpb24gYWRkZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5OYW1lKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsOiBPcGVyYXRpb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGlvbiByZW1vdmVkIFtcIiArIG1vZGVsLmlkICsgXCJdIFwiICsgbW9kZWwuTmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGdsb2JhbCBjb2xsZWN0aW9uc1xyXG52YXIgY29sbGVjdGlvbnMgPSBuZXcgQ29sbGVjdGlvbkNvbnRhaW5lcjsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=