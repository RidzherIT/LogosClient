import { makeAutoObservable } from "mobx";

export default class Store {
    constructor() {
        this._auth = false;
        this._valueProducts = 0;
        this._products = [];
        this._sale = {
            sale: 0,
            min: 1500,
            free: 1500
        }
        makeAutoObservable(this)
    }
    get products() {
        return this._products;
    }
    setProductsAdd(obj) {
        this._products = [...this._products, obj]
    }
    get valueProducts() {
        return this._valueProducts;
    }
    setValueProducts() {
        let value = 0;
        if (this._products.length == 0) {
            this._valueProducts = 0;
            return;
        }
        this._products.forEach(elem => {
            value += elem.value;
            this._valueProducts = value
        })
    }
    setProductsDelete(obj) {
        this._products = this._products.filter(elem => elem.id != obj.id);
    }
    setProductsIncr(obj) {
        let item = this._products.find(elem => elem.id == obj.id);
        let value = item.value;
        value++;
        let sum = item.sale;
        sum = value * sum;
        this._products = this._products.map(elem => elem.id != obj.id ? elem : { ...elem, value: value, sum: sum })
    }
    setProductsDecr(obj) {
        let item = this._products.find(elem => elem.id == obj.id);
        let value = item.value;
        value--;
        if (value <= 0) {
            this.setProductsDelete(obj);
            this.setValueProducts();
            this.setSaleUpdate();
            return;
        }
        let sum = item.sale;
        sum = value * sum;
        this._products = this._products.map(elem => elem.id != obj.id ? elem : { ...elem, value: value, sum: sum })
    }
    get auth() {
        return this._auth;
    }
    setAuth(bool) {
        this._auth = bool;
    }
    get sale() {
        return this._sale;
    }
    setSaleUpdate() {
        let min = this._sale.free;
        let sum = 0;
        this._products.forEach(elem => sum += elem.sum);
        min = min - sum;
        if (min <= 0) min = 0;
        if (sum <= 0 || !sum) {
            min = 1500;
            sum = 0;
        }
        this._sale = { free: 1500, min: min, sale: sum }
    }
    setDeleteAllProducts() {
        this._products = [];
    }
}