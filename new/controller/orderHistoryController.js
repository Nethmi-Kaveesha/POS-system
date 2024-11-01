// Array to store order history
let orderHistory = [];

// Function to store order in history
function storeOrderInHistory(orderId, customerId, itemId, quantity, price, totalPrice) {
    const order = {
        orderId,
        customerId,
        itemId,
        quantity,
        price: price.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        date: new Date().toLocaleString() // Date and time of order
    };
    orderHistory.push(order);
}

// Function to display order history in the history table
function displayOrderHistory() {
    const orderHistoryBody = document.getElementById("orderHistoryBody");
    orderHistoryBody.innerHTML = ""; // Clear existing rows

    orderHistory.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerId}</td>
            <td>${order.itemId}</td>
            <td>${order.quantity}</td>
            <td>${order.price}</td>
            <td>${order.totalPrice}</td>
            <td>${order.date}</td>
        `;
        orderHistoryBody.appendChild(row);
    });
}

// Update the addOrderToTable function to store in history and display in order table
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

    // Store the order in history
    storeOrderInHistory(orderId, customerId, itemId, quantity, price, totalPrice);
}

// Event listener to display order history
document.getElementById("view_history_button").addEventListener("click", displayOrderHistory);
