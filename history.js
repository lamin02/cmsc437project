const container = document.getElementById("history-output");
const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
//checks past
if (history.length === 0) {
    container.innerHTML = "<p>No past purchases found.</p>";
} else {
    //holds it in container
    history.reverse().forEach(order => {
        const div = document.createElement("div");
        div.className = "history-entry";
        div.innerHTML = `
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${order.timestamp}</p>
            <ul>
                ${order.items.map(i => `<li>${i.name} x${i.qty} – $${(i.price * i.qty).toFixed(2)}</li>`).join("")}
            </ul>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <hr/>
        `;
        container.appendChild(div);
    });
}
