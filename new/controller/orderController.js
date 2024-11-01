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

// Function to generate unique Order ID
function generateOrderId() {
    return `ORD-${Math.floor(Math.random() * 10000)}`; // Random Order ID for simplicity
}

// Calculate total price based on quantity and price
function calculateTotalPrice() {
    const price = parseFloat(document.getElementById("price").value) || 0; // Get item price
    const quantity = parseInt(document.getElementById("quantity").value) || 0; // Get quantity

    const totalPrice = price * quantity; // Calculate total price
    document.getElementById("totalPrice").value = totalPrice.toFixed(2); // Format to 2 decimal places
}

// Function to add order details to the table
function addOrderToTable(orderId, customerId, itemId, quantity, price, totalPrice) {
    const orderTableBody = document.getElementById("orderTableBody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${orderId}</td>
        <td>${customerId}</td>
        <td>${itemId}</td>
        <td>${quantity}</td>
        <td>${price.toFixed(2)}</td>
        <td>${totalPrice.toFixed(2)}</td>
    `;

    orderTableBody.appendChild(row);
}

// Function to show SweetAlert for a successful order
function showSweetAlert() {
    Swal.fire({
        title: "Order Placed!",
        text: "Your order has been added successfully!",
        icon: "success",
        confirmButtonText: "OK"
    });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Populate dropdowns when navigating to the order form
    document.getElementById("order-nav").addEventListener("click", function() {
        populateCustomerDropdown();
        populateItemDropdown();
        document.getElementById("orderId").value = generateOrderId(); // Set a new order ID
    });

    // Set up event listeners for quantity and price input
    document.getElementById("quantity").addEventListener("input", calculateTotalPrice);
    document.getElementById("price").addEventListener("input", calculateTotalPrice);

    // Event listener for placing the order
    document.getElementById("place_order_button").addEventListener("click", () => {
        const orderId = document.getElementById("orderId").value;
        const customerId = document.getElementById("customerIds").value;
        const itemId = document.getElementById("itemId").value;
        const quantity = parseInt(document.getElementById("quantity").value) || 0;
        const price = parseFloat(document.getElementById("price").value) || 0;
        const totalPrice = price * quantity;

        if (customerId && itemId && quantity > 0) {
            addOrderToTable(orderId, customerId, itemId, quantity, price, totalPrice);
            showSweetAlert(); // Show SweetAlert after successfully adding the order

            // Clear the form inputs after placing the order
            document.getElementById("orderForm").reset();
            document.getElementById("orderId").value = generateOrderId(); // Generate a new order ID
        } else {
            Swal.fire({
                title: "Error!",
                text: "Please fill in all fields correctly.",
                icon: "error",
                confirmButtonText: "OK"
            }); // Show an error if fields are missing
        }
    });
});

// Function to set the current date and time in the orderDate input
function setDefaultDateTime() {
    const orderDateInput = document.getElementById("orderDate");
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
    orderDateInput.value = formattedDate;
}

// Call the function to set default date and time when page loads
document.addEventListener("DOMContentLoaded", () => {
    setDefaultDateTime();
});
