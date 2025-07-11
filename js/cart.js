// js/cart.js

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Please login to view your cart.");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${user.email}`;
  const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
  const cartContainer = document.getElementById("cart-container");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.style.display = "none";
    return;
  }

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: ₹${itemTotal}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
      <hr />
    `;

    cartContainer.appendChild(itemDiv);
  });

  totalEl.textContent = total;

  // Handle Remove
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cartItems.splice(index, 1);
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      location.reload(); // Refresh to update UI
    });
  });

  // Proceed to checkout
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
});
