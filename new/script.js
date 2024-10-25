let customers = JSON.parse(localStorage.getItem('customers')) || [];
let items = JSON.parse(localStorage.getItem('items')) || [];
let orders = [];


// Function to populate customer dropdown
function populateCustomerDropdown() {
    const customerSelect = document.getElementById('customerSelect');
    customerSelect.innerHTML = '<option value="" disabled selected>Select a Customer</option>';

    if (customers.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No customers available';
        option.disabled = true;
        option.selected = true;
        customerSelect.appendChild(option);
    } else {
        customers.forEach((customer) => {
            const option = document.createElement('option');
            option.value = customer.id; // Use customer ID
            option.textContent = customer.customer_name; // Adjust to your customer data property
            customerSelect.appendChild(option);
        });
    }
}

// Function to populate item dropdown
function populateItemDropdown() {
    const itemSelect = document.getElementById('itemSelect');
    itemSelect.innerHTML = '<option value="" disabled selected>Select an Item</option>';

    if (items.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No items available';
        option.disabled = true;
        option.selected = true;
        itemSelect.appendChild(option);
    } else {
        items.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id; // Use item ID
            option.textContent = item.item_name; // Adjust to your item data property
            itemSelect.appendChild(option);
        });
    }
}

// Function to place an order
function placeOrder(event) {
    event.preventDefault(); // Prevent form submission

    const customerId = document.getElementById('customerSelect').value;
    const itemId = document.getElementById('itemSelect').value;
    const quantity = document.getElementById('orderQty').value;

    if (!customerId || !itemId || quantity <= 0) {
        alert("Please select a customer, an item, and a valid quantity.");
        return;
    }

    const customer = customers.find(cust => cust.id == customerId);
    const item = items.find(it => it.id == itemId);
    const totalPrice = (item.price * quantity).toFixed(2);
    const orderDate = new Date().toLocaleString();

    const order = {
        customerName: customer.customer_name,
        itemName: item.item_name,
        quantity: quantity,
        totalPrice: totalPrice,
        date: orderDate
    };

    orders.push(order);
    updateOrderTable();
    document.getElementById('orderForm').reset(); // Reset the form
}

// Function to update order table
function updateOrderTable() {
    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = ''; // Clear existing rows

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.customerName}</td>
            <td>${order.itemName}</td>
            <td>${order.quantity}</td>
            <td>${order.totalPrice}</td>
            <td>${order.date}</td>
            <td><button class="btn btn-danger" onclick="deleteOrder('${order.date}')">Delete</button></td>
        `;
        orderTableBody.appendChild(row);
    });
}

// Function to delete an order
function deleteOrder(orderDate) {
    orders = orders.filter(order => order.date !== orderDate);
    updateOrderTable();
}

// Load initial data
$(document).ready(function() {
    populateCustomerDropdown(); // Populate customer dropdown
    populateItemDropdown(); // Populate item dropdown
    document.getElementById('orderForm').addEventListener('submit', placeOrder); // Add event listener
});
