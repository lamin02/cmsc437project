const menu = [
    { id: 1, name: "Chicken Wrap", price: 9.99, image: "chicken.jpg" },
    { id: 2, name: "Veggie Sandwich", price: 7.99, image: "veggie.jpg" },
    { id: 3, name: "Cola", price: 2.99, image: "cola.jpg" },
    { id: 4, name: "Orange Juice", price: 3.49, image: "oj.jpg" }
];

let order = [];

const menuItems = document.getElementById("menu-items");
const orderList = document.getElementById("order-list");
const orderTotal = document.getElementById("order-total");
const statusBox = document.getElementById("order-status");

function renderMenu() {
    menu.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToOrder(${item.id})">Add to Order</button>
        `;
        menuItems.appendChild(card);
    });
}

function addToOrder(id) {
    const found = order.find(item => item.id === id);
    const food = menu.find(f => f.id === id);

    if (found) {
        found.qty++;
    } else {
        order.push({ ...food, qty: 1 });
    }

    updateOrder();
}

function updateOrder() {
    orderList.innerHTML = "";
    let total = 0;

    order.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
        orderList.appendChild(li);
    });

    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function submitOrder() {
    const cardNumber = document.getElementById("card-number").value;

    if (!cardNumber || cardNumber.length < 10) {
        statusBox.style.color = "red";
        statusBox.textContent = "Please enter a valid credit card number.";
        return;
    }

    statusBox.style.color = "green";
    statusBox.textContent = "Order placed... Status: Ordered";

    setTimeout(() => {
        statusBox.textContent = "Status: Preparing";
    }, 2000);

    setTimeout(() => {
        statusBox.textContent = "Status: Delivered ✅";
    }, 5000);
}

renderMenu();
