const products = [
    //itmes for sale
    { id: 1, name: "Chanel No.5 Perfume", price: 175.99, description: "Luxury scent from France", image: "chanel.jpg" },
    { id: 2, name: "Ray-Ban Sunglasses", price: 289.99, description: "Stylish UV-protective", image: "rayban.webp" },
    { id: 3, name: "Seiko Watch", price: 129.00, description: "Classic analog watch", image: "shopp.webp" },
    { id: 4, name: "Estée Lauder Double Wear Foundation", price: 129.00, description: "Stay in place Makeup", image: "estee.avif" },
    { id: 5, name: "Toblerone Chocolate", price: 19.00, description: "Delicious Chocolate", image: "choc.webp" },
     { id: 6, name: "Marlboro Cigarettes", price: 120.00, description: "Smooth Cigarettes", image: "cig.webp" },
     { id: 7, name: "Bose Headphones", price: 220.00, description: "Noise Cancelling Headphones", image: "bose.webp" },
     { id: 8, name: "Apple AirPods Pro (2nd Gen) with MagSafe Charging Case", price: 200.00, description: "Noise Cancelling Headphones", image: "headphones.jpg" }
];

//for items in cart
let cart = [];
//for html
const itemlist = document.getElementById("product-list");
const itemscart = document.getElementById("cart-items");
const pricetot = document.getElementById("total-price");

function renderItems() {
    products.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        //set up for item images
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p><strong>$${item.price.toFixed(2)}</strong></p>
            <button onclick="addCart(${item.id})">Add to Cart</button>
        `;
        itemlist.appendChild(card);
    });
}

function addCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    //if found add to quantiy
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });  
    }
    //updates cart
    cartup();
}

function removecart(id) {
    //uses filter to remove, then updates
    cart = cart.filter(item => item.id !== id);
    cartup();
}

function cartup() {
    itemscart.innerHTML = "";
    let total = 0;
    //price
    cart.forEach(item => {
        total += item.price * item.qty; 
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`; 
        li.innerHTML += ` <button onclick="removecart(${item.id})">Remove</button>`;
        itemscart.appendChild(li);
    });
    //final total
    pricetot.textContent = `Total: $${total.toFixed(2)}`;
}

function completePurchase() {
    const cardNumber = document.getElementById("shop-card").value;
    const status = document.getElementById("shop-status");
    //nu,ber msut be greater than 10 
    if (!cardNumber || cardNumber.length < 10) {
        status.style.color = "red";
        status.textContent = "Invalid credit card number (must be >10 digits).";
        return;
    }
    //latest item
    localStorage.setItem("latestOrder", JSON.stringify(cart));
    localStorage.setItem("lastCardUsed", cardNumber);
    window.location.href = "receipt.html";
}

//render in end
renderItems();
