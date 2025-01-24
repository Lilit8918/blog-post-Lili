import { api } from "../apis/api.js"
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await api.auth.login({ email, password });
    if (response.accessToken) {
      Storage.set("token", response.accessToken);
      Storage.set("user", response.user);
      window.location.href = "home.html";
    } else {
      alert("Invalid login credentials.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Something went wrong. Please try again.");
  }
});
