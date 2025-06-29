const products = [
    { id: 1, name: "Chanel No.5 Perfume", price: 175.99, description: "Luxury scent from France", image: "chanel.jpg" },
    { id: 2, name: "Ray-Ban Sunglasses", price: 289.99, description: "Stylish UV-protective", image: "rayban.webp" },
    { id: 3, name: "Seiko Watch", price: 129.00, description: "Classic analog watch", image: "shopp.webp" },
    { id: 4, name: "Estée Lauder Double Wear Foundation", price: 129.00, description: "Stay in place Makeup", image: "estee.avif" },
    { id: 5, name: "Toblerone Chocolate", price: 19.00, description: "Delicious Chocolate", image: "choc.webp" },
     { id: 6, name: "Marlboro Cigarettes", price: 120.00, description: "Smooth Cigarettes", image: "cig.webp" },
     { id: 7, name: "Bose Headphones", price: 220.00, description: "Noise Cancelling Headphones", image: "bose.webp" },
     { id: 8, name: "Apple AirPods Pro (2nd Gen) with MagSafe Charging Case", price: 200.00, description: "Noise Cancelling Headphones", image: "headphones.jpg" }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function renderProducts() {
    products.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p><strong>$${item.price.toFixed(2)}</strong></p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });  // ✅ FIXED: add qty when first added
    }

    updateCart();
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty; // FIXED here

        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`; // FIXED here
        li.innerHTML += ` <button onclick="removeFromCart(${item.id})">Remove</button>`;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function completePurchase() {
    const cardNumber = document.getElementById("shop-card").value;
    const status = document.getElementById("shop-status");

    if (!cardNumber || cardNumber.length < 10) {
        status.style.color = "red";
        status.textContent = "Please enter a valid credit card number.";
        return;
    }

    localStorage.setItem("latestOrder", JSON.stringify(cart));
    localStorage.setItem("lastCardUsed", cardNumber);
    window.location.href = "receipt.html";
}


renderProducts();
