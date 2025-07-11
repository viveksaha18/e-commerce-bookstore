// js/register.js
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Create new user object
  const newUser = { name, email, password };

  // Step 1: Get users from localStorage or create new array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Step 2: Check if email already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert("Email already registered!");
    return;
  }

  // Step 3: Push new user and update localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now login.");
  window.location.href = "login.html";
});
