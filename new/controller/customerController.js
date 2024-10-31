import { customer_array } from "../db/database.js";
import CustomerModel from "../model/customerModel.js";
import { validateEmail, validatePhoneNumber, validateName, validateAddress } from '../util/validation.js';

let selectedIndex = null;

const generateCustomerId = () => {
    let lastCustomerId = customer_array.length > 0
        ? parseInt(customer_array[customer_array.length - 1].id.split('-')[1])
        : 0;
    return `CUST-${lastCustomerId + 1}`;
};

const loadCustomerTable = () => {
    $('#customerTableBody').empty();
    customer_array.forEach((item) => {
        const rowHtml = `<tr>
            <td>${item.id}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name}</td>
            <td>${item.customer_email}</td>
            <td>${item.customer_phone}</td>
            <td>${item.customer_address}</td>
        </tr>`;
        $('#customerTableBody').append(rowHtml);
    });
};

const clearCustomerForm = () => {
    $('input[name="customerId"]').val('Auto-generated');
    $('#firstName, #lastName, #customerEmail, #customerPhone, #customerAddress').val('');
};

const showAlert = (title, text, icon = 'info') => {
    Swal.fire({ title, text, icon, confirmButtonText: 'OK' });
};

const validateCustomerForm = () => {
    const first_name = $('#firstName').val().trim();
    const last_name = $('#lastName').val().trim();
    const customer_email = $('#customerEmail').val().trim();
    const customer_phone = $('#customerPhone').val().trim();
    const customer_address = $('#customerAddress').val().trim();

    const validations = [
        { field: first_name, validator: validateName, message: "Invalid First Name" },
        { field: last_name, validator: validateName, message: "Invalid Last Name" },
        { field: customer_email, validator: validateEmail, message: "Invalid Email" },
        { field: customer_phone, validator: validatePhoneNumber, message: "Invalid Phone Number" },
        { field: customer_address, validator: validateAddress, message: "Invalid Address" },
    ];

    for (const { field, validator, message } of validations) {
        const result = validator(field);
        if (result !== true) {
            showAlert('Validation Error', message, 'error');
            return false;
        }
    }
    return true;
};

// Add customer
$('#customer_add_button').on('click', function() {
    if (!validateCustomerForm()) return;

    const newCustomerId = generateCustomerId();
    const customer = new CustomerModel(
        newCustomerId,
        $('#firstName').val(),
        $('#lastName').val(),
        $('#customerEmail').val(),
        $('#customerPhone').val(),
        $('#customerAddress').val()
    );

    customer_array.push(customer);
    clearCustomerForm();
    loadCustomerTable();
    showAlert('Success', 'Customer added successfully!', 'success');
});

// Select customer for editing
$('#customerTableBody').on('click', 'tr', function() {
    selectedIndex = $(this).index();
    const cus_obj = customer_array[selectedIndex];

    $('#firstName').val(cus_obj.first_name);
    $('#lastName').val(cus_obj.last_name);
    $('#customerEmail').val(cus_obj.customer_email);
    $('#customerPhone').val(cus_obj.customer_phone);
    $('#customerAddress').val(cus_obj.customer_address);
    $('input[name="customerId"]').val(cus_obj.id);
});

// Update customer
$('#customer_update_button').on('click', function() {
    if (selectedIndex === null || selectedIndex < 0) {
        showAlert('Error', 'Please select a customer to update.', 'error');
        return;
    }
    if (!validateCustomerForm()) return;

    const updatedCustomer = new CustomerModel(
        customer_array[selectedIndex].id,
        $('#firstName').val(),
        $('#lastName').val(),
        $('#customerEmail').val(),
        $('#customerPhone').val(),
        $('#customerAddress').val()
    );

    customer_array[selectedIndex] = updatedCustomer;
    clearCustomerForm();
    loadCustomerTable();
    selectedIndex = null;
    showAlert('Success', 'Customer updated successfully!', 'success');
});

// Delete customer
$('#customer_delete_button').on('click', function() {
    if (selectedIndex === null || selectedIndex < 0) {
        showAlert('Error', 'Please select a customer to delete.', 'error');
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            customer_array.splice(selectedIndex, 1);
            clearCustomerForm();
            loadCustomerTable();
            selectedIndex = null;
            showAlert('Success', 'Customer deleted successfully!', 'success');
        }
    });
});
