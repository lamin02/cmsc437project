const menu = [
    { id: 1, name: "Chicken Wrap", price: 9.99, image: "Cajun-Chicken-Wrap.jpg" },
    { id: 2, name: "Veggie Sandwich", price: 7.99, image: "veggie.jpg" },
    { id: 3, name: "Cola", price: 2.99, image: "cola.jpg" },
    { id: 4, name: "Orange Juice", price: 3.49, image: "oj.jpg" },
    { id: 5, name: "Water", price: 1.99, image: "water.jpg" },
    { id: 6, name: "Spaghetti", price: 7.99, image: "spaght.jpg" },
    { id: 7, name: "Pizza", price: 2.99, image: "pizza.jpg" },
    { id: 8, name: "Caesar Salad", price: 3.49, image: "Caesar.jpg" }
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
//hi
function submitOrder() {
    const cardNumber = document.getElementById("card-number").value;
    const statusBox = document.getElementById("order-status");

    if (!cardNumber || cardNumber.length < 10) {
        statusBox.style.color = "red";
        statusBox.textContent = "❌ Please enter a valid credit card number.";
        return;
    }

    // Show order placed status
    statusBox.style.color = "green";
    statusBox.textContent = "✅ Order placed... Status: Ordered";

    // Step 1: Change to "Preparing"
    setTimeout(() => {
        statusBox.textContent = "⏳ Status: Preparing";
    }, 2000);

    // Step 2: Change to "Delivered" and redirect to receipt
    setTimeout(() => {
        statusBox.textContent = "✅ Status: Delivered";

        // Save to localStorage for receipt.html
        localStorage.setItem("latestOrder", JSON.stringify(order));
        localStorage.setItem("lastCardUsed", cardNumber);

        // Redirect to receipt after a pause
        setTimeout(() => {
            window.location.href = "receipt.html";
        }, 1500); // short delay so user sees "Delivered ✅"

    }, 5000);
}


renderMenu();
