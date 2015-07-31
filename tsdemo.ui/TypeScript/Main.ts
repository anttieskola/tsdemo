import bb = Backbone;
import models = require("Models");
import productViews = require("ProductViews");
import lineViews = require("LineViews");
import operationViews = require("OperationViews");

// main application
export class Application {
    private selectedLineId: number;
    private selectedProductId: number;
    private productList: productViews.ProductList;
    private lineList: lineViews.LineList;
    private operationList: operationViews.OperationList;
    constructor() {
        // views
        this.productList = new productViews.ProductList;
        this.productList.$el = $('#divProducts');
        this.lineList = new lineViews.LineList();
        this.lineList.$el = $('#divLines');

        // messages
        models.Messaging().bind("selectProduct", this.SelectProduct, this);
        models.Messaging().bind("selectLine", this.SelectLine, this);

    }
    SelectProduct(param: any) {
        var productId = parseInt(param);
        if (productId > 0 && productId != this.selectedProductId) {
            // TODO, need productline view first
        }
    }
    SelectLine(param: any) {
        var lineId = parseInt(param);
        if (lineId > 0 && lineId != this.selectedLineId) {
            // have to remove old view so events won't be called from it also
            if (this.operationList != null) {
                this.operationList.remove();
            }
            this.selectedLineId = lineId;
            this.operationList = new operationViews.OperationList(this.selectedLineId);
            // creating div, as remove will remove the element from dom where view is
            var div = $('<div>'); div.appendTo($('#divOperations'));
            this.operationList.$el = div;
            this.operationList.render();
        }
    }
}
// global access to application
export function App(): Application {
    return application;
}
// dummy
export function Run() {
    console.log("Application start");
}

// global application instance
var application = new Application;
