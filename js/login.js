// js/login.js

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  // Get all registered users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check for matching user
  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (matchedUser) {
    // Save logged-in user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    alert(`Welcome back, ${matchedUser.name}!`);
    window.location.href = "index.html"; // Redirect to homepage
  } else {
    alert("Invalid email or password.");
  }
});
