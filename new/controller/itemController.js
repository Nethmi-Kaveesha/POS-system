
import ItemModel from "../model/itemModel.js";
import { item_array } from "../db/database.js";

let selectIndex = null;


const generateItemId = () => {
    let lastItemId = item_array.length > 0
        ? parseInt(item_array[item_array.length - 1].id.split('-')[1])
        : 0;
    return `ITEM-${lastItemId + 1}`;
};


const loadItemTable = () => {
    $('#itemTableBody').empty();
    item_array.forEach((item) => {
        let data = `<tr>
                        <td>${item.id}</td>
                        <td>${item.category}</td>
                        <td>${item.item_name}</td>
                        <td>${item.item_price}</td>
                        <td>${item.item_qty}</td>
                    </tr>`;
        $('#itemTableBody').append(data);
    });
};


const clearItemForm = () => {
    $('#itemCategory').val('');
    $('#itemName').val('');
    $('#itemPrice').val('');
    $('#itemQuantity').val('');
    selectIndex = null;
};


const validateItemForm = () => {
    const category = $('#itemCategory').val().trim();
    const item_name = $('#itemName').val().trim();
    const item_price = $('#itemPrice').val().trim();
    const item_qty = $('#itemQuantity').val().trim();

    if (!category) {
        Swal.fire('Error', 'Category is required!', 'error');
        return false;
    }
    if (!item_name) {
        Swal.fire('Error', 'Item Name is required!', 'error');
        return false;
    }
    if (!item_price || isNaN(item_price) || Number(item_price) <= 0) {
        Swal.fire('Error', 'Please enter a valid item price!', 'error');
        return false;
    }
    if (!item_qty || isNaN(item_qty) || !Number.isInteger(Number(item_qty)) || Number(item_qty) <= 0) {
        Swal.fire('Error', 'Please enter a valid item quantity!', 'error');
        return false;
    }

    return true;
};


$(document).ready(function () {
    $('#item_add_button').on('click', function() {
        if (!validateItemForm()) return;

        let category = $('#itemCategory').val();
        let item_name = $('#itemName').val();
        let item_price = $('#itemPrice').val();
        let item_qty = $('#itemQuantity').val();

        const newItemId = generateItemId();

        let item = new ItemModel(
            newItemId,
            category,
            item_name,
            item_price,
            item_qty
        );


        item_array.push(item);

        clearItemForm();
        loadItemTable();

        Swal.fire('Success', 'Item added successfully!', 'success');
    });

    $('#itemTableBody').on('click', 'tr', function() {
        selectIndex = $(this).index();
        let item_obj = item_array[selectIndex];
        $('#itemCategory').val(item_obj.category);
        $('#itemName').val(item_obj.item_name);
        $('#itemPrice').val(item_obj.item_price);
        $('#itemQuantity').val(item_obj.item_qty);
    });


    $('#item_update_button').on('click', function() {
        if (selectIndex !== null && selectIndex >= 0) {
            if (!validateItemForm()) return;

            let category = $('#itemCategory').val();
            let item_name = $('#itemName').val();
            let item_price = $('#itemPrice').val();
            let item_qty = $('#itemQuantity').val();

            item_array[selectIndex] = new ItemModel(
                item_array[selectIndex].id,
                category,
                item_name,
                item_price,
                item_qty
            );

            clearItemForm();
            loadItemTable();
            selectIndex = null;

            Swal.fire('Success', 'Item updated successfully!', 'success');
        } else {
            Swal.fire('Error', 'Please select an item to update.', 'error');
        }
    });

    $('#item_delete_button').on('click', function() {
        if (selectIndex !== null && selectIndex >= 0) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    item_array.splice(selectIndex, 1);
                    clearItemForm();
                    loadItemTable();
                    selectIndex = null; // Reset selected index
                    Swal.fire('Deleted!', 'Item has been deleted.', 'success');
                }
            });
        } else {
            Swal.fire('Error', 'Please select an item to delete.', 'error');
        }
    });
});
