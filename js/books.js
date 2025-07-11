// js/book.js

// Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Add event listeners to all "Add to Cart" buttons
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-id");
      const bookName = button.getAttribute("data-name");
      const bookPrice = parseFloat(button.getAttribute("data-price"));

      const user = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!user) {
        alert("Please login to add books to cart.");
        window.location.href = "login.html";
        return;
      }

      const cartKey = `cart_${user.email}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      // Check if the book is already in cart
      const existingItem = cart.find(item => item.id === bookId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: bookId,
          name: bookName,
          price: bookPrice,
          quantity: 1
        });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert(`${bookName} added to cart!`);
    });
  });
});
