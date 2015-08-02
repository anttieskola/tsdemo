import bb = Backbone;
import models = require("Models");
import productViews = require("ProductViews");
import lineViews = require("LineViews");
import operationViews = require("OperationViews");
import productStatusViews = require("ProjectStatusViews");

// main application
export class Application {
    private selectedLineId: number;
    private selectedProductId: number;
    private productStatusList: productStatusViews.ProductStatusViewList;
    private productList: productViews.ProductList;
    private lineList: lineViews.LineList;
    private operationList: operationViews.OperationList;
    constructor() {
        // views
        this.productStatusList = new productStatusViews.ProductStatusViewList();
        this.productStatusList.$el = $('#divProductStatus');
        this.productList = new productViews.ProductList("#divProductLines");
        this.productList.$el = $('#divProducts');
        this.lineList = new lineViews.LineList();
        this.lineList.$el = $('#divLines');
        this.productStatusList.render();
        this.productList.render();
        this.lineList.render();
        // messages
        models.Messaging().bind("selectProduct", this.selectProduct, this);
        models.Messaging().bind("selectLine", this.selectLine, this);
    }
    public Run() {
        // noop
    }
    // message handlers
    private selectProduct(param: any) {
        var productId = parseInt(param);
        if (productId > 0 && productId != this.selectedProductId) {
            this.productList.SelectProduct(productId);
        }
    }
    private selectLine(param: any) {
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
export function Run() {
    console.log("Application start");
    var application = new Application();
}
