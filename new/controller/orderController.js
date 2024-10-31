document.addEventListener("DOMContentLoaded", () => {
    // Initialize order counter for generating unique order IDs
    let orderCounter = 1;

    // Get elements
    const orderIdInput = document.getElementById("orderId");
    const customerIdSelect = document.getElementById("customerIds");
    const itemIdSelect = document.getElementById("itemId");
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("price");
    const totalPriceInput = document.getElementById("totalPrice");
    const orderTableBody = document.getElementById("orderTableBody");
    const placeOrderButton = document.getElementById("place_order_button");

    // Populate the customer and item selection options dynamically
    function populateSelectOptions() {
        const customers = [
            { id: "C001", name: "Alice" },
            { id: "C002", name: "Bob" },
            { id: "C003", name: "Charlie" }
        ];
        const items = [
            { id: "I001", name: "Laptop", price: 800.00 },
            { id: "I002", name: "Phone", price: 300.00 },
            { id: "I003", name: "Tablet", price: 200.00 }
        ];

        customers.forEach(customer => {
            const option = document.createElement("option");
            option.value = customer.id;
            option.textContent = `${customer.id} - ${customer.name}`;
            customerIdSelect.appendChild(option);
        });

        items.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = `${item.id} - ${item.name}`;
            itemIdSelect.appendChild(option);
        });
    }

    // Function to auto-generate unique order ID
    function generateOrderId() {
        orderIdInput.value = `ORD-${orderCounter.toString().padStart(4, '0')}`;
    }

    // Function to update price field based on selected item
    function updatePrice() {
        const items = {
            "I001": 800.00,
            "I002": 300.00,
            "I003": 200.00
        };
        const selectedItemId = itemIdSelect.value;
        if (items[selectedItemId]) {
            priceInput.value = items[selectedItemId];
            calculateTotalPrice();
        } else {
            priceInput.value = "";
            totalPriceInput.value = "";
        }
    }

    // Function to calculate total price based on quantity and unit price
    function calculateTotalPrice() {
        const quantity = parseInt(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        totalPriceInput.value = (quantity * price).toFixed(2);
    }

    // Event listener to update price and calculate total when item changes
    itemIdSelect.addEventListener("change", updatePrice);

    // Event listener to calculate total price when quantity changes
    quantityInput.addEventListener("input", calculateTotalPrice);

    // Function to place an order and add it to order history
    function placeOrder() {
        const orderId = orderIdInput.value;
        const customerId = customerIdSelect.value;
        const itemId = itemIdSelect.value;
        const quantity = quantityInput.value;
        const price = priceInput.value;
        const totalPrice = totalPriceInput.value;

        if (!customerId || !itemId || !quantity || !totalPrice) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Details',
                text: 'Please fill in all fields before placing the order.',
            });
            return;
        }

        // Show confirmation alert with SweetAlert2
        Swal.fire({
            title: 'Confirm Order',
            text: `Place order for ${quantity} unit(s) of ${itemId}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, place order',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Add order to order details table
                const orderRow = document.createElement("tr");
                orderRow.innerHTML = `
                    <td>${orderId}</td>
                    <td>${customerId}</td>
                    <td>${itemId}</td>
                    <td>${quantity}</td>
                    <td>${price}</td>
                    <td>${totalPrice}</td>
                `;
                orderTableBody.appendChild(orderRow);

                // Reset the form for the next order
                orderCounter++;
                generateOrderId();
                customerIdSelect.value = "";
                itemIdSelect.value = "";
                quantityInput.value = "";
                priceInput.value = "";
                totalPriceInput.value = "";

                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed',
                    text: 'Your order has been placed successfully!',
                });
            }
        });
    }

    // Initialize order ID on page load
    generateOrderId();
    populateSelectOptions();

    // Event listener for the "Place Order" button
    placeOrderButton.addEventListener("click", placeOrder);
});
