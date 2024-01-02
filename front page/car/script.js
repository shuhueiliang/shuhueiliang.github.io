document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Display the cart items on the cart page
    updateCartTable(cart);

    // Update the total price
    updateTotal(cart);

    document.getElementById("checkout-btn").addEventListener("click", function () {
        checkout();
    });
});

function updateCartTable(cart) {
    const tableBody = document.querySelector("#cart-table tbody");
    tableBody.innerHTML = "";

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button onclick="decrementQuantity('${item.name}')">-</button>
                ${item.quantity}
                <button onclick="incrementQuantity('${item.name}')">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeItem('${item.name}')">刪除</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function updateTotal(cart) {
    const totalElement = document.getElementById("total");
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function incrementQuantity(productName) {
    updateQuantity(productName, 1);
}

function decrementQuantity(productName) {
    updateQuantity(productName, -1);
}

function updateQuantity(productName, quantityChange) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity += quantityChange;

        if (product.quantity <= 0) {
            // Remove the item from the cart if the quantity is less than or equal to 0
            const index = cart.indexOf(product);
            cart.splice(index, 1);
        }

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart display
        updateCartTable(cart);
        updateTotal(cart);
    }
}

function removeItem(productName) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = cart.find(item => item.name === productName);

    if (product) {
        // Remove the item from the cart
        const index = cart.indexOf(product);
        cart.splice(index, 1);

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart display
        updateCartTable(cart);
        updateTotal(cart);
    }
}

function checkout() {
    // Display a thank-you message
    alert("感謝您的購買！");

    // Additional logic for completing the checkout process
    // For example, you can clear the cart, redirect to a thank-you page, etc.

    // Clear the cart after checkout (you can customize this part based on your needs)
    localStorage.removeItem("cart");

    // Update the cart display
    updateCartTable([]);

    // Update the total display
    updateTotal([]);
}
