// ../controller/orderController.js
import { customer_array, item_array, order_array } from "../db/database.js"; // Importing arrays

// Populate Customer Dropdown
function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customerId");

    // Clear existing options
    customerSelect.innerHTML = "<option value=''>Select Customer</option>";

    // Loop through customer_array to create option elements
    customer_array.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = `${customer.firstName} ${customer.lastName}`; // Display customer's full name
        customerSelect.appendChild(option);
    });
}

// Handle Customer Selection
function handleCustomerSelection() {
    const customerSelect = document.getElementById("customerId");
    const nameField = document.getElementById("name1");
    const addressField = document.getElementById("address1");

    // Find selected customer
    const selectedCustomerId = customerSelect.value;
    const customer = customer_array.find(c => String(c.id) === String(selectedCustomerId));

    // Update fields if customer is found
    if (customer) {
        nameField.value = customer.firstName + " " + customer.lastName;
        addressField.value = customer.address;
    } else {
        nameField.value = "";
        addressField.value = "";
    }
}

// Populate Item Dropdown
function populateItemDropdown() {
    const itemSelect = document.getElementById("itemId");

    // Clear existing options
    itemSelect.innerHTML = "<option value=''>Select Item</option>";

    // Loop through item_array to create option elements
    item_array.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name; // Display item's name
        itemSelect.appendChild(option);
    });
}

// Handle Item Selection
function handleItemSelection() {
    const itemSelect = document.getElementById("itemId");
    const priceField = document.getElementById("price");
    const quantityField = document.getElementById("quantity");
    const totalPriceField = document.getElementById("totalPrice");

    // Find selected item
    const selectedItemId = itemSelect.value;
    const item = item_array.find(i => String(i.id) === String(selectedItemId));

    // Update fields if item is found
    if (item) {
        priceField.value = item.price; // Set price
        quantityField.value = 1; // Reset quantity to 1
        totalPriceField.value = item.price; // Set initial total price
    } else {
        priceField.value = "";
        quantityField.value = "";
        totalPriceField.value = "";
    }
}

// Calculate total price based on quantity and price
function calculateTotalPrice() {
    const quantity = parseInt(document.getElementById("quantity").value) || 0;
    const price = parseFloat(document.getElementById("price").value) || 0;
    const totalPriceField = document.getElementById("totalPrice");

    // Calculate total price
    totalPriceField.value = (quantity * price).toFixed(2);
}

// Load Order Table
const loadOrderTable = () => {
    const orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = ""; // Clear existing rows

    order_array.forEach(order => {
        const customer = customer_array.find(c => c.id === order.customerId);
        const item = item_array.find(i => i.id === order.itemId);
        const customerName = customer ? customer.firstName + " " + customer.lastName : "Unknown";
        const itemName = item ? item.name : "Unknown";

        const data = `<tr>
                        <td>${order.orderId}</td>
                        <td>${customerName}</td>
                        <td>${itemName}</td>
                        <td>${order.quantity}</td>
                        <td>${order.price}</td>
                        <td>${order.totalPrice}</td>
                    </tr>`;
        orderTableBody.insertAdjacentHTML('beforeend', data);
    });
};

// Clear form fields
const clearOrderForm = () => {
    document.getElementById("orderForm").reset(); // Reset the form
};

// Add order
document.getElementById("place_order_button").addEventListener("click", function() {
    const orderId = document.getElementById("orderId").value; // Auto-generated or fetched order ID
    const customerId = document.getElementById("customerIds").value;
    const itemId = document.getElementById("itemId").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const totalPrice = document.getElementById("totalPrice").value;

    // Validate that all necessary fields are filled out
    if (!customerId || !itemId || !quantity || !price || !totalPrice) {
        Swal.fire('Error', 'Please complete all fields before placing an order.', 'error');
        return;
    }

    // Add the order to order_array
    order_array.push({ orderId, customerId, itemId, quantity, price, totalPrice });

    // Load the order table with updated data
    loadOrderTable();
    clearOrderForm(); // Clear the form after submission
    Swal.fire('Success', 'Order placed successfully!', 'success');
});

// Event Listeners
document.getElementById("customerIds").addEventListener("change", handleCustomerSelection);
document.getElementById("itemId").addEventListener("change", handleItemSelection);
document.getElementById("quantity").addEventListener("input", calculateTotalPrice); // Recalculate total price on quantity input

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    populateCustomerDropdown(); // Populate customers on page load
    populateItemDropdown(); // Populate items on page load
    loadOrderTable(); // Load existing orders on page load
});
