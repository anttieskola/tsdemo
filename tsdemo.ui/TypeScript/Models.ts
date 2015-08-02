import bb = Backbone;
// messasing hub so modules cans send messages to each other
// (circular reference between modules is forbidden)
export class MessasingHub extends bb.View<bb.Model> {
    constructor() {
        super();
        // add events you want to send across modules
        this.events = <any>
        {
            "selectProduct": "selectProduct",
            "selectLine": "selectLine"
        };
    }
}
export function Messaging(): MessasingHub {
    return messaging;
}
var messaging = new MessasingHub;

// collection container
export class CollectionContainer {
    private products: Products;
    private lines: Lines;
    private statuses: Statuses;
    private operations: Operations;
    constructor() {
        this.products = new Products;
        this.products.fetch();
        this.lines = new Lines;
        this.lines.fetch();
        this.statuses = new Statuses;
        this.statuses.fetch();
        this.operations = new Operations;
        this.operations.fetch();
    }
    get Products(): Products {
        return this.products;
    }
    get Lines(): Lines {
        return this.lines;
    }
    get Statuses(): Statuses {
        return this.statuses;
    }
    get Operations(): Operations {
        return this.operations;
    }
}
// global access to collections
export function Collections(): CollectionContainer {
    return collections;
}
// interfaces
export interface ILine {
    Name: string;
    Operations: Array<IOperation>;
}
export interface IProduct {
    Name: string;
}
export interface IProductLine {
    ProductId: number;
    LineId: number;
}
export interface IOperation {
    Name: string;
    LineId: number;
}
export interface IStatus {
    Complete: boolean;
    Notes: string;
    ProductId: number;
    OperationId: number;
}
// classes
export class Line extends bb.Model implements ILine {
    constructor(options?: any) {
        this.urlRoot = "/api/Lines";
        super(options);
    }
    get Name(): string {
        return this.get('Name');
    }
    set Name(value: string) {
        this.set('Name', value);
    }
    get Operations(): Array<Operation> {
        return this.get('Operations');
    }
    set Operations(value: Array<Operation>) {
        this.set('Operations', value);
    }
}
export class Operation extends bb.Model implements IOperation {
    constructor(options?: any) {
        this.urlRoot = "/api/Operations";
        super(options);
    }
    get Name(): string {
        return this.get('Name');
    }
    set Name(value: string) {
        this.set('Name', value);
    }
    get LineId(): number {
        return this.get('LineId');
    }
    set LineId(value: number) {
        this.set('LineId', value);
    }
}
export class ProductLine extends bb.Model implements IProductLine {
    constructor(options?: any) {
        super(options);
    }
    get ProductId(): number {
        return this.get('ProductId');
    }
    set ProductId(value: number) {
        this.set('ProductId', value);
    }
    get LineId(): number {
        return this.get('LineId');
    }
    set LineId(value: number) {
        this.set('LineId', value);
    }
}
export class Product extends bb.Model implements IProduct {
    constructor(options?: any) {
        this.urlRoot = "/api/Products";
        super(options);
    }
    get Name(): string {
        return this.get('Name');
    }
    set Name(value: string) {
        this.set('Name', value);
    }
    get Lines(): Array<ProductLine> {
        return this.get('Lines');
    }
    set Lines(value: Array<ProductLine>) {
        this.set('Lines', value);
    }
}
export class Status extends bb.Model implements IStatus {
    constructor(options?: any) {
        this.urlRoot = "/api/statuses";
        super(options);
    }
    get Complete(): boolean {
        return this.get('Complete');
    }
    set Complete(value: boolean) {
        this.set('Complete', value);
    }
    get Notes(): string {
        return this.get('Notes');
    }
    set Notes(value: string) {
        this.set('Notes', value);
    }
    get ProductId(): number {
        return this.get('ProductId');
    }
    set ProductId(value: number) {
        this.set('ProductId', value);
    }
    get OperationId(): number {
        return this.get('OperationId');
    }
    set OperationId(value: number) {
        this.set('OperationId', value);
    }
}
// collections
export class Products extends bb.Collection<Product> {
    constructor(options?: any) {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.url = "/api/Products";
        this.model = Product;
        super(options);
    }
    onModelAdded(model: Product) {
        console.log("product added [" + model.id + "] " + model.Name);
    }
    onModelRemoved(model: Product) {
        console.log("product removed [" + model.id + "] " + model.Name);
    }
}
export class Lines extends bb.Collection<Line> {
    constructor(options?: any) {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.url = "/api/Lines";
        this.model = Line;
        super(options);
    }
    onModelAdded(model: Line) {
        console.log("line added [" + model.id + "] " + model.Name);
    }
    onModelRemoved(model: Line) {
        console.log("line removed [" + model.id + "] " + model.Name);
    }
}
export class Statuses extends bb.Collection<Status> {
    constructor(options?: any) {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.url = "api/statuses";
        this.model = Status;
        super(options);
    }
    onModelAdded(model: Status) {
        console.log("status added [" + model.id + "] " + model.Complete);
    }
    onModelRemoved(model: Status) {
        console.log("status removed [" + model.id + "] " + model.Complete);
    }
}
export class Operations extends bb.Collection<Operation> {
    constructor(options?: any) {
        this.bind('add', this.onModelAdded, this);
        this.bind('remove', this.onModelRemoved, this);
        this.url = "api/operations";
        this.model = Operation;
        super(options);
    }
    onModelAdded(model: Operation) {
        console.log("operation added [" + model.id + "] " + model.Name);
    }
    onModelRemoved(model: Operation) {
        console.log("operation removed [" + model.id + "] " + model.Name);
    }
}

// global collections
var collections = new CollectionContainer;