
let orderHistory = [];


function storeOrderInHistory(orderId, customerId, itemId, quantity, price, totalPrice) {
    const order = {
        orderId,
        customerId,
        itemId,
        quantity,
        price: price.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        date: new Date().toLocaleString()
    };
    orderHistory.push(order);
}


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


    storeOrderInHistory(orderId, customerId, itemId, quantity, price, totalPrice);
}


document.getElementById("view_history_button").addEventListener("click", displayOrderHistory);
