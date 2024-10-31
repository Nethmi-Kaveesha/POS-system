import { customer_array } from "../db/database.js";
import { item_array } from "../db/database.js";

function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customerIds");
    customerSelect.innerHTML = ""; // Clear existing options

    customer_array.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id; // Assuming customer.id is the display text
        customerSelect.appendChild(option);
    });
}

function populateItemDropdown() {
    const itemSelect = document.getElementById("itemId");
    itemSelect.innerHTML = ""; // Clear existing options

    item_array.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.id; // Assuming item.id is the display text
        itemSelect.appendChild(option);
    });
}

// Function to generate Order ID
function generateOrderId() {
    return 1; // Fixed Order ID for simplicity
}

// Calculate total price based on quantity and price
function calculateTotalPrice() {
    const price = parseFloat(document.getElementById("price").value) || 0; // Get item price
    const quantity = parseInt(document.getElementById("quantity").value) || 0; // Get quantity

    const totalPrice = price * quantity; // Calculate total price
    document.getElementById("totalPrice").value = totalPrice.toFixed(2); // Format to 2 decimal places
}

// Function to add order details to the table
function addOrderToTable(itemId, quantity, price, totalPrice) {
    const orderTableBody = document.getElementById("orderTable").querySelector("tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${itemId}</td>
        <td>${quantity}</td>
        <td>${price.toFixed(2)}</td>
        <td>${totalPrice.toFixed(2)}</td>
    `;

    orderTableBody.appendChild(row);
}

// Function to show SweetAlert
function showSweetAlert() {
    swal("Success!", "Item added to order!", "success");
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Populate dropdowns on button click
    document.getElementById("order-nav").addEventListener("click", function() {
        populateCustomerDropdown(); // Populate customer dropdown
        populateItemDropdown(); // Populate item dropdown
    });

    // Set up event listeners for quantity and price input
    document.getElementById("quantity").addEventListener("input", calculateTotalPrice); // Calculate total when quantity changes
    document.getElementById("price").addEventListener("input", calculateTotalPrice); // Calculate total when price changes

    // Add an event listener for adding an order
    document.getElementById("itemId").addEventListener("change", () => {
        const itemId = document.getElementById("itemId").value;
        const quantity = parseInt(document.getElementById("quantity").value) || 0;
        const price = parseFloat(document.getElementById("price").value) || 0;
        const totalPrice = price * quantity;

        if (quantity > 0) {
            addOrderToTable(itemId, quantity, price, totalPrice);
            showSweetAlert(); // Show SweetAlert when item is added
        }
    });
});
