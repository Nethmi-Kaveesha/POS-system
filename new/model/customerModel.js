export default class CustomerModel {
    constructor(id,first_name,last_name,customer_email,customer_phone,customer_address){
        this._id = id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._customer_email = customer_email;
        this._customer_phone = customer_phone;
        this._customer_address = customer_address;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get first_name() {
        return this._first_name;
    }

    set first_name(value) {
        this._first_name = value;
    }

    get last_name() {
        return this._last_name;
    }

    set last_name(value) {
        this._last_name = value;
    }

    get customer_email() {
        return this._customer_email;
    }

    set customer_email(value) {
        this._customer_email = value;
    }

    get customer_phone() {
        return this._customer_phone;
    }

    set customer_phone(value) {
        this._customer_phone = value;
    }

    get customer_address() {
        return this._customer_address;
    }

    set customer_address(value) {
        this._customer_address = value;
    }
}