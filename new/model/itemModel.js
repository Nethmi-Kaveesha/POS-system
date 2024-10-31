export default class ItemModel {
    constructor(id, category, item_name, item_price, item_qty) {
        this._id = id;
        this._category = category;
        this._item_name = item_name;
        this._item_price = item_price;
        this._item_qty = item_qty;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(value) {
        this._item_name = value;
    }

    get item_price() {
        return this._item_price;
    }

    set item_price(value) {
        this._item_price = value;
    }

    get item_qty() {
        return this._item_qty;
    }

    set item_qty(value) {
        this._item_qty = value;
    }
}
