// js/checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Please login to proceed to checkout.");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${user.email}`;
  const orderKey = `orders_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const totalEl = document.getElementById("checkout-total");
  const form = document.getElementById("checkout-form");

  // Calculate total
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  totalEl.textContent = total;

  // Submit Order
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !address || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const newOrder = {
      name,
      address,
      phone,
      total,
      items: cart,
      date: new Date().toLocaleString(),
    };

    const orders = JSON.parse(localStorage.getItem(orderKey)) || [];
    orders.push(newOrder);
    localStorage.setItem(orderKey, JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem(cartKey);

    alert("✅ Order placed successfully!");
    window.location.href = "index.html";
  });
});
