const receiptBox = document.getElementById("receipt-details");

// loading the recent order from local storage
const order = JSON.parse(localStorage.getItem("latestOrder")) || [];
const lastCardUsed = localStorage.getItem("lastCardUsed") || "**** **** **** 6534";
const transactionId = "ROMA" + Math.floor(100000 + Math.random() * 900000);
const dateTime = new Date().toLocaleString();
//must have item
if (order.length === 0) {
    receiptBox.innerHTML = `<p>No recent purchases found.</p>`;
} else {
    let total = 0;
    let itemList = "";
    //price
    order.forEach(item => {
        total += item.price * item.qty;
        itemList += `<li>${item.name} x${item.qty} – $${(item.price * item.qty).toFixed(2)}</li>`;
    });
    //card
    const lastFour = lastCardUsed.slice(-4);
    //prints on receipt
    receiptBox.innerHTML = `
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${dateTime}</p>
        <ul>${itemList}</ul>
        <p><strong>Total Paid:</strong> $${total.toFixed(2)}</p>
        <p><strong>Card:</strong> **** **** **** ${lastFour}</p>
        <p style="margin-top: 20px;"> Thank you for your order!</p>
    `;
}

function goHome() {
    window.location.href = "index.html";
}
