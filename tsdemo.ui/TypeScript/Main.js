define(["require", "exports", "Models", "Views"], function (require, exports, modelsFile, viewsFile) {
    var models = modelsFile.Models;
    var views = viewsFile.Views;
    var Application;
    (function (Application) {
        // main application
        var Main = (function () {
            function Main() {
                // create and bind collections & views
                this.productsListView = new views.ProductsListView;
                this.productsListView.$el = $('#products');
                this.productsListView.collection = models.Collections().Products;
                this.productsListView.collection.on('sync', this.productsListView.render, this.productsListView);
                this.linesListView = new views.LinesListView;
                this.linesListView.$el = $('#lines');
                this.linesListView.collection = models.Collections().Lines;
                this.linesListView.collection.on('sync', this.linesListView.render, this.linesListView);
                // hookup new inputs
                $('#inputNewProduct').on('keypress', this.newProduct);
                $('#inputNewLine').on('keypress', this.newLine);
            }
            // new product (normal event handler)
            Main.prototype.newProduct = function (e) {
                if (e.keyCode != 13)
                    return;
                var input = $('#inputNewProduct').val();
                if (input == '')
                    return;
                var newProduct;
                newProduct = new models.Product;
                newProduct.Name = input;
                models.Collections().Products.create(newProduct, { wait: true });
                $('#inputNewProduct').val('');
            };
            // new line (normal event handler)
            Main.prototype.newLine = function (e) {
                if (e.keyCode != 13)
                    return;
                var input = $('#inputNewLine').val();
                if (input == '')
                    return;
                var newLine;
                newLine = new models.Line;
                newLine.Name = input;
                models.Collections().Lines.create(newLine, { wait: true });
                $('#inputNewLine').val('');
            };
            return Main;
        })();
        Application.Main = Main;
        var main = new Main(); // main class object (module wide access)
        function Run() {
            console.log("Application start");
        }
        Application.Run = Run;
    })(Application = exports.Application || (exports.Application = {}));
});
//# sourceMappingURL=Application.js.map