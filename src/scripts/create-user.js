function createRegistrationLayout() {
  const submitButton = UI.createElement("button", { id: "submit", type: "button" }, "Submit");

  const handelSubmit = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const username = document.getElementById("username").value.trim();

    if (!firstName || !email || !password || !username) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const user = { firstName, lastName, email, password, username };
    console.log(user);

    try {
      const result = await api.user.register(user);
      console.log(result);

      if (result && result.id) {
        alert("Registration successful!");
        window.location.assign("login.html");
      } else {
        alert("Something went wrong. Please check your data.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again.");
    }
  };

  submitButton.addEventListener("click", handelSubmit);

  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "home.html" }, "Home"),
      UI.createElement("a", { href: "index.html" }, "Log In"),
    ]),
    UI.createElement("form", { class: "form-wrapper", method: "POST", action: "#" }, [
      UI.createElement("div", { class: "form-container" }, [
        UI.createElement("input", { id: "firstName", placeholder: "First Name" }),
        UI.createElement("input", { id: "lastName", placeholder: "Last Name" }),
        UI.createElement("input", { id: "username", placeholder: "Username" }),
        UI.createElement("input", { id: "email", placeholder: "Email", type: "email" }),
        UI.createElement("input", { id: "password", placeholder: "Password", type: "password" }),
        UI.createElement("div", { class: "form-footer" }, [submitButton]),
      ]),
    ]),
  ]);

  UI.render(container, document.body);
}
