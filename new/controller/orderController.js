import { customer_array } from "../db/database.js";
import { item_array } from "../db/database.js";


function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customerIds");
    customerSelect.innerHTML = "";

    customer_array.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id;
        customerSelect.appendChild(option);
    });
}


function populateItemDropdown() {
    const itemSelect = document.getElementById("itemId");
    itemSelect.innerHTML = "";

    item_array.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.id;
        option.setAttribute("data-price", item.item_price);
        itemSelect.appendChild(option);
    });
}


let orderCount = 1;

function generateOrderId() {
    const orderId = `ORD-${orderCount}`;
    orderCount++;
    return orderId;
}


function calculateTotalPrice() {
    const price = parseFloat(document.getElementById("price").value) || 0; // Get item price
    const quantity = parseInt(document.getElementById("quantity").value) || 0; // Get quantity

    const totalPrice = price * quantity;
    document.getElementById("totalPrice").value = totalPrice.toFixed(2);
}


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


function showSweetAlert() {
    Swal.fire({
        title: "Order Placed!",
        text: "Your order has been added successfully!",
        icon: "success",
        confirmButtonText: "OK"
    });
}


function setDefaultDateTime() {
    const orderDateInput = document.getElementById("orderDate");
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    orderDateInput.value = formattedDate;
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("order-nav").addEventListener("click", function() {
        populateCustomerDropdown();
        populateItemDropdown();
        document.getElementById("orderId").value = generateOrderId(); // Set a new order ID
    });

    document.getElementById("quantity").addEventListener("input", calculateTotalPrice);
    document.getElementById("price").addEventListener("input", calculateTotalPrice);


    document.getElementById("place_order_button").addEventListener("click", () => {
        const orderId = document.getElementById("orderId").value;
        const customerId = document.getElementById("customerIds").value;
        const itemId = document.getElementById("itemId").value;
        const quantity = parseInt(document.getElementById("quantity").value) || 0;
        const price = parseFloat(document.getElementById("price").value) || 0;
        const totalPrice = price * quantity;

        if (customerId && itemId && quantity > 0) {
            addOrderToTable(orderId, customerId, itemId, quantity, price, totalPrice);
            showSweetAlert();

            document.getElementById("orderForm").reset();
            document.getElementById("orderId").value = generateOrderId(); // Generate a new order ID
        } else {
            Swal.fire({
                title: "Error!",
                text: "Please fill in all fields correctly.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });


    document.getElementById("itemId").addEventListener("change", function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.getAttribute("data-price");
        document.getElementById("price").value = price;
        calculateTotalPrice();
    });

    setDefaultDateTime();
});
