const receiptBox = document.getElementById("receipt-details");
//gets recent order from the ocal storge
const order = JSON.parse(localStorage.getItem("latestOrder"));
const lastCardUsed = localStorage.getItem("lastCardUsed") || "**** **** **** 6534";
const transactionId = "ROMA" + Math.floor(100000 + Math.random() * 900000);
const dateTime = order?.timestamp || new Date().toLocaleString();
//checl if order
if (!order || !order.items || order.items.length === 0) {
    receiptBox.innerHTML = `<p>No recent purchases found.</p>`;
} else {
    let itemList = "";
    order.items.forEach(item => {
        itemList += `<li>${item.name} x${item.qty} – $${(item.price * item.qty).toFixed(2)}</li>`;
    });
    //card, orde rbased
    const lastFour = lastCardUsed.slice(-4);
    //format fro writing
    receiptBox.innerHTML = `
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${dateTime}</p>
        <ul>${itemList}</ul>
        <p><strong>Total Paid:</strong> $${order.total.toFixed(2)}</p>
        <p><strong>Card:</strong> **** **** **** ${lastFour}</p>
        <p style="margin-top: 20px;">Thank you for your order!</p>
    `;
}
//goes to home page
function goHome() {
    window.location.href = "index.html";
}
