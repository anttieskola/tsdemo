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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVscy50cyJdLCJuYW1lcyI6WyJNZXNzYXNpbmdIdWIiLCJNZXNzYXNpbmdIdWIuY29uc3RydWN0b3IiLCJNZXNzYWdpbmciLCJDb2xsZWN0aW9uQ29udGFpbmVyIiwiQ29sbGVjdGlvbkNvbnRhaW5lci5jb25zdHJ1Y3RvciIsIkNvbGxlY3Rpb25Db250YWluZXIuUHJvZHVjdHMiLCJDb2xsZWN0aW9uQ29udGFpbmVyLkxpbmVzIiwiQ29sbGVjdGlvbkNvbnRhaW5lci5TdGF0dXNlcyIsIkNvbGxlY3Rpb25Db250YWluZXIuT3BlcmF0aW9ucyIsIkNvbGxlY3Rpb25zIiwiTGluZSIsIkxpbmUuY29uc3RydWN0b3IiLCJMaW5lLk5hbWUiLCJMaW5lLk9wZXJhdGlvbnMiLCJPcGVyYXRpb24iLCJPcGVyYXRpb24uY29uc3RydWN0b3IiLCJPcGVyYXRpb24uTmFtZSIsIk9wZXJhdGlvbi5MaW5lSWQiLCJQcm9kdWN0TGluZSIsIlByb2R1Y3RMaW5lLmNvbnN0cnVjdG9yIiwiUHJvZHVjdExpbmUuUHJvZHVjdElkIiwiUHJvZHVjdExpbmUuTGluZUlkIiwiUHJvZHVjdCIsIlByb2R1Y3QuY29uc3RydWN0b3IiLCJQcm9kdWN0Lk5hbWUiLCJQcm9kdWN0LkxpbmVzIiwiU3RhdHVzIiwiU3RhdHVzLmNvbnN0cnVjdG9yIiwiU3RhdHVzLkNvbXBsZXRlIiwiU3RhdHVzLk5vdGVzIiwiU3RhdHVzLlByb2R1Y3RJZCIsIlN0YXR1cy5PcGVyYXRpb25JZCIsIlByb2R1Y3RzIiwiUHJvZHVjdHMuY29uc3RydWN0b3IiLCJQcm9kdWN0cy5vbk1vZGVsQWRkZWQiLCJQcm9kdWN0cy5vbk1vZGVsUmVtb3ZlZCIsIkxpbmVzIiwiTGluZXMuY29uc3RydWN0b3IiLCJMaW5lcy5vbk1vZGVsQWRkZWQiLCJMaW5lcy5vbk1vZGVsUmVtb3ZlZCIsIlN0YXR1c2VzIiwiU3RhdHVzZXMuY29uc3RydWN0b3IiLCJTdGF0dXNlcy5vbk1vZGVsQWRkZWQiLCJTdGF0dXNlcy5vbk1vZGVsUmVtb3ZlZCIsIk9wZXJhdGlvbnMiLCJPcGVyYXRpb25zLmNvbnN0cnVjdG9yIiwiT3BlcmF0aW9ucy5vbk1vZGVsQWRkZWQiLCJPcGVyYXRpb25zLm9uTW9kZWxSZW1vdmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQUEsSUFBTyxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ3JCLEFBRUEsNERBRjREO0lBQzVELG9EQUFvRDs7UUFDbEJBLGdDQUFpQkE7UUFDL0NBO1lBQ0lDLGlCQUFPQSxDQUFDQTtZQUNSQSxBQUNBQSw2Q0FENkNBO1lBQzdDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUNYQTtnQkFDSUEsZUFBZUEsRUFBRUEsZUFBZUE7Z0JBQ2hDQSxZQUFZQSxFQUFFQSxZQUFZQTthQUM3QkEsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFDTEQsbUJBQUNBO0lBQURBLENBVkEsQUFVQ0EsRUFWaUMsRUFBRSxDQUFDLElBQUksRUFVeEM7SUFWWSxvQkFBWSxlQVV4QixDQUFBO0lBQ0Q7UUFDSUUsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRmUsaUJBQVMsWUFFeEIsQ0FBQTtJQUNELElBQUksU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDO0lBRWpDLEFBQ0EsdUJBRHVCOztRQU1uQkM7WUFDSUMsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUN0QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsVUFBVUEs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SUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQy9DQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxnQkFBZ0JBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxTQUFTQSxDQUFDQTtZQUN2QkEsa0JBQU1BLE9BQU9BLENBQUNBLENBQUNBO1FBQ25CQSxDQUFDQTtRQUNERCxpQ0FBWUEsR0FBWkEsVUFBYUEsS0FBZ0JBO1lBQ3pCRSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxtQkFBbUJBLEdBQUdBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3BFQSxDQUFDQTtRQUNERixtQ0FBY0EsR0FBZEEsVUFBZUEsS0FBZ0JBO1lBQzNCRyxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEdBQUdBLEtBQUtBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3RFQSxDQUFDQTtRQUNMSCxpQkFBQ0E7SUFBREEsQ0FkQSxBQWNDQSxFQWQrQixFQUFFLENBQUMsVUFBVSxFQWM1QztJQWRZLGtCQUFVLGFBY3RCLENBQUE7SUFFRCxBQUNBLHFCQURxQjtRQUNqQixXQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyIsImZpbGUiOiJNb2RlbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmIgPSBCYWNrYm9uZTtcclxuLy8gbWVzc2FzaW5nIGh1YiBzbyBtb2R1bGVzIGNhbnMgc2VuZCBtZXNzYWdlcyB0byBlYWNoIG90aGVyXHJcbi8vIChjaXJjdWxhciByZWZlcmVuY2UgYmV0d2VlbiBtb2R1bGVzIGlzIGZvcmJpZGRlbilcclxuZXhwb3J0IGNsYXNzIE1lc3Nhc2luZ0h1YiBleHRlbmRzIGJiLlZpZXc8YmIuTW9kZWw+IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gYWRkIGV2ZW50cyB5b3Ugd2FudCB0byBzZW5kIGFjcm9zcyBtb2R1bGVzXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSA8YW55PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWxlY3RQcm9kdWN0XCI6IFwic2VsZWN0UHJvZHVjdFwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdExpbmVcIjogXCJzZWxlY3RMaW5lXCJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBNZXNzYWdpbmcoKTogTWVzc2FzaW5nSHViIHtcclxuICAgIHJldHVybiBtZXNzYWdpbmc7XHJcbn1cclxudmFyIG1lc3NhZ2luZyA9IG5ldyBNZXNzYXNpbmdIdWI7XHJcblxyXG4vLyBjb2xsZWN0aW9uIGNvbnRhaW5lclxyXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkNvbnRhaW5lciB7XHJcbiAgICBwcml2YXRlIHByb2R1Y3RzOiBQcm9kdWN0cztcclxuICAgIHByaXZhdGUgbGluZXM6IExpbmVzO1xyXG4gICAgcHJpdmF0ZSBzdGF0dXNlczogU3RhdHVzZXM7XHJcbiAgICBwcml2YXRlIG9wZXJhdGlvbnM6IE9wZXJhdGlvbnM7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gbmV3IFByb2R1Y3RzO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdHMuZmV0Y2goKTtcclxuICAgICAgICB0aGlzLmxpbmVzID0gbmV3IExpbmVzO1xyXG4gICAgICAgIHRoaXMubGluZXMuZmV0Y2goKTtcclxuICAgICAgICB0aGlzLnN0YXR1c2VzID0gbmV3IFN0YXR1c2VzO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzZXMuZmV0Y2goKTtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMgPSBuZXcgT3BlcmF0aW9ucztcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMuZmV0Y2goKTtcclxuICAgIH1cclxuICAgIGdldCBQcm9kdWN0cygpOiBQcm9kdWN0cyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XHJcbiAgICB9XHJcbiAgICBnZXQgTGluZXMoKTogTGluZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpbmVzO1xyXG4gICAgfVxyXG4gICAgZ2V0IFN0YXR1c2VzKCk6IFN0YXR1c2VzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXNlcztcclxuICAgIH1cclxuICAgIGdldCBPcGVyYXRpb25zKCk6IE9wZXJhdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuLy8gZ2xvYmFsIGFjY2VzcyB0byBjb2xsZWN0aW9uc1xyXG5leHBvcnQgZnVuY3Rpb24gQ29sbGVjdGlvbnMoKTogQ29sbGVjdGlvbkNvbnRhaW5lciB7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvbnM7XHJcbn1cclxuLy8gaW50ZXJmYWNlc1xyXG5leHBvcnQgaW50ZXJmYWNlIElMaW5lIHtcclxuICAgIE5hbWU6IHN0cmluZztcclxuICAgIE9wZXJhdGlvbnM6IEFycmF5PElPcGVyYXRpb24+O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2R1Y3Qge1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2R1Y3RMaW5lIHtcclxuICAgIFByb2R1Y3RJZDogbnVtYmVyO1xyXG4gICAgTGluZUlkOiBudW1iZXI7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJT3BlcmF0aW9uIHtcclxuICAgIE5hbWU6IHN0cmluZztcclxuICAgIExpbmVJZDogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXR1cyB7XHJcbiAgICBDb21wbGV0ZTogYm9vbGVhbjtcclxuICAgIE5vdGVzOiBzdHJpbmc7XHJcbiAgICBQcm9kdWN0SWQ6IG51bWJlcjtcclxuICAgIE9wZXJhdGlvbklkOiBudW1iZXI7XHJcbn1cclxuLy8gY2xhc3Nlc1xyXG5leHBvcnQgY2xhc3MgTGluZSBleHRlbmRzIGJiLk1vZGVsIGltcGxlbWVudHMgSUxpbmUge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIHRoaXMudXJsUm9vdCA9IFwiL2FwaS9MaW5lc1wiO1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ05hbWUnKTtcclxuICAgIH1cclxuICAgIHNldCBOYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldCgnTmFtZScsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBPcGVyYXRpb25zKCk6IEFycmF5PE9wZXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnT3BlcmF0aW9ucycpO1xyXG4gICAgfVxyXG4gICAgc2V0IE9wZXJhdGlvbnModmFsdWU6IEFycmF5PE9wZXJhdGlvbj4pIHtcclxuICAgICAgICB0aGlzLnNldCgnT3BlcmF0aW9ucycsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgT3BlcmF0aW9uIGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJT3BlcmF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnVybFJvb3QgPSBcIi9hcGkvT3BlcmF0aW9uc1wiO1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ05hbWUnKTtcclxuICAgIH1cclxuICAgIHNldCBOYW1lKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldCgnTmFtZScsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBMaW5lSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ0xpbmVJZCcpO1xyXG4gICAgfVxyXG4gICAgc2V0IExpbmVJZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ0xpbmVJZCcsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdExpbmUgZXh0ZW5kcyBiYi5Nb2RlbCBpbXBsZW1lbnRzIElQcm9kdWN0TGluZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBnZXQgUHJvZHVjdElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdQcm9kdWN0SWQnKTtcclxuICAgIH1cclxuICAgIHNldCBQcm9kdWN0SWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0KCdQcm9kdWN0SWQnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgTGluZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdMaW5lSWQnKTtcclxuICAgIH1cclxuICAgIHNldCBMaW5lSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0KCdMaW5lSWQnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBiYi5Nb2RlbCBpbXBsZW1lbnRzIElQcm9kdWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnVybFJvb3QgPSBcIi9hcGkvUHJvZHVjdHNcIjtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdOYW1lJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgTmFtZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ05hbWUnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgTGluZXMoKTogQXJyYXk8UHJvZHVjdExpbmU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ0xpbmVzJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgTGluZXModmFsdWU6IEFycmF5PFByb2R1Y3RMaW5lPikge1xyXG4gICAgICAgIHRoaXMuc2V0KCdMaW5lcycsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgU3RhdHVzIGV4dGVuZHMgYmIuTW9kZWwgaW1wbGVtZW50cyBJU3RhdHVzIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBhbnkpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGdldCBDb21wbGV0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ0NvbXBsZXRlJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgQ29tcGxldGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNldCgnQ29tcGxldGUnLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgTm90ZXMoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ05vdGVzJyk7XHJcbiAgICB9XHJcbiAgICBzZXQgTm90ZXModmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0KCdOb3RlcycsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBQcm9kdWN0SWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ1Byb2R1Y3RJZCcpO1xyXG4gICAgfVxyXG4gICAgc2V0IFByb2R1Y3RJZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ1Byb2R1Y3RJZCcsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBPcGVyYXRpb25JZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnT3BlcmF0aW9uSWQnKTtcclxuICAgIH1cclxuICAgIHNldCBPcGVyYXRpb25JZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ09wZXJhdGlvbklkJywgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbi8vIGNvbGxlY3Rpb25zXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0cyBleHRlbmRzIGJiLkNvbGxlY3Rpb248UHJvZHVjdD4ge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIHRoaXMuYmluZCgnYWRkJywgdGhpcy5vbk1vZGVsQWRkZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmluZCgncmVtb3ZlJywgdGhpcy5vbk1vZGVsUmVtb3ZlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcIi9hcGkvUHJvZHVjdHNcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gUHJvZHVjdDtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxBZGRlZChtb2RlbDogUHJvZHVjdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicHJvZHVjdCBhZGRlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgfVxyXG4gICAgb25Nb2RlbFJlbW92ZWQobW9kZWw6IFByb2R1Y3QpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInByb2R1Y3QgcmVtb3ZlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBMaW5lcyBleHRlbmRzIGJiLkNvbGxlY3Rpb248TGluZT4ge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIHRoaXMuYmluZCgnYWRkJywgdGhpcy5vbk1vZGVsQWRkZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmluZCgncmVtb3ZlJywgdGhpcy5vbk1vZGVsUmVtb3ZlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcIi9hcGkvTGluZXNcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gTGluZTtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxBZGRlZChtb2RlbDogTGluZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGluZSBhZGRlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgfVxyXG4gICAgb25Nb2RlbFJlbW92ZWQobW9kZWw6IExpbmUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxpbmUgcmVtb3ZlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTdGF0dXNlcyBleHRlbmRzIGJiLkNvbGxlY3Rpb248U3RhdHVzPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5iaW5kKCdhZGQnLCB0aGlzLm9uTW9kZWxBZGRlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5iaW5kKCdyZW1vdmUnLCB0aGlzLm9uTW9kZWxSZW1vdmVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVybCA9IFwiYXBpL3N0YXR1c2VzXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IFN0YXR1cztcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICAgIG9uTW9kZWxBZGRlZChtb2RlbDogU3RhdHVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgYWRkZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5Db21wbGV0ZSk7XHJcbiAgICB9XHJcbiAgICBvbk1vZGVsUmVtb3ZlZChtb2RlbDogU3RhdHVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgcmVtb3ZlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLkNvbXBsZXRlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgT3BlcmF0aW9ucyBleHRlbmRzIGJiLkNvbGxlY3Rpb248T3BlcmF0aW9uPiB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5iaW5kKCdhZGQnLCB0aGlzLm9uTW9kZWxBZGRlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5iaW5kKCdyZW1vdmUnLCB0aGlzLm9uTW9kZWxSZW1vdmVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVybCA9IFwiYXBpL29wZXJhdGlvbnNcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gT3BlcmF0aW9uO1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgb25Nb2RlbEFkZGVkKG1vZGVsOiBPcGVyYXRpb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGlvbiBhZGRlZCBbXCIgKyBtb2RlbC5pZCArIFwiXSBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgfVxyXG4gICAgb25Nb2RlbFJlbW92ZWQobW9kZWw6IE9wZXJhdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib3BlcmF0aW9uIHJlbW92ZWQgW1wiICsgbW9kZWwuaWQgKyBcIl0gXCIgKyBtb2RlbC5OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gZ2xvYmFsIGNvbGxlY3Rpb25zXHJcbnZhciBjb2xsZWN0aW9ucyA9IG5ldyBDb2xsZWN0aW9uQ29udGFpbmVyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==