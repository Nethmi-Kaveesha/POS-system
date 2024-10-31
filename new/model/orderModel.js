export default class OrderModel {
    constructor(id, customerId, itemId, quantity, totalPrice, orderDate) {
        this._id = id;
        this._customerId = customerId;
        this._itemId = itemId;
        this._quantity = quantity;
        this._totalPrice = totalPrice;
        this._orderDate = orderDate;    // Date the order was placed
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    set totalPrice(value) {
        this._totalPrice = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }
}


