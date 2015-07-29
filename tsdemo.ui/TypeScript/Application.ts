import bb = Backbone;
import modelsFile = require("Models");
import models = modelsFile.Models;
import viewsFile = require("Views");
import views = viewsFile.Views;

export module Application {
    // main application
    export class Main {
        // views
        productsListView: views.ProductsListView;
        linesListView: views.LinesListView;
        statusesListView: views.StatusesListView;

        constructor() {
            // create and bind collections & views
            this.productsListView = new views.ProductsListView;
            this.productsListView.$el = $('#products');
            this.productsListView.collection = models.Collections().Products;
            this.productsListView.collection.on('sync', this.productsListView.render, this.productsListView);

            this.linesListView = new views.LinesListView;
            this.linesListView.$el = $('#lines');
            this.linesListView.collection = models.Collections().Lines;
            this.linesListView.collection.on('sync', this.linesListView.render, this.linesListView);

            this.statusesListView = new views.StatusesListView;
            this.statusesListView.$el = $('#statuses');
            this.statusesListView.collection = models.Collections().Statuses;
            this.statusesListView.collection.on('sync', this.statusesListView.render, this.statusesListView);
            
            // hookup new inputs
            $('#inputNewProduct').on('keypress', this.newProduct);
            $('#inputNewLine').on('keypress', this.newLine);
        }

        // new product (normal event handler)
        newProduct(e) {
            if (e.keyCode != 13) return;
            var input = $('#inputNewProduct').val();
            if (input == '') return;
            var newProduct: models.Product;
            newProduct = new models.Product;
            newProduct.Name = input;
            models.Collections().Products.create(newProduct, { wait: true });
            $('#inputNewProduct').val('');
        }

        // new line (normal event handler)
        newLine(e) {
            if (e.keyCode != 13) return;
            var input = $('#inputNewLine').val();
            if (input == '') return;
            var newLine: models.Line;
            newLine = new models.Line;
            newLine.Name = input;
            models.Collections().Lines.create(newLine, { wait: true });
            $('#inputNewLine').val('');
        }
    }
    var main = new Main(); // main class object (module wide access)
    export function Run() {
        console.log("Application start");
    }
}
