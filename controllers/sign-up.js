import usersService from "../services/users.js";
import signupService from "../services/auth/signup.js";

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const userName = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPass").value;

  // Validate all fields are filled
  if (
    !firstName ||
    !lastName ||
    !userName ||
    !email ||
    !password ||
    !confirmPass
  ) {
    alert("All fields are required!");
    return;
  }

  // Validate password match
  if (password !== confirmPass) {
    alert("Passwords do not match!");
    return;
  }

  // Check username and email uniqueness
  usersService.getAll().then((userList) => {
    if (userList.some((user) => user.username === userName)) {
      alert("This username is already taken!");
      return;
    }

    if (userList.some((user) => user.email === email)) {
      alert("This email is already used!");
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      email: email,
      password: password,
    };

    // Display loading indicator or disable the submit button if needed
    const submitBtn = document.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    signupService
      .createUser(newUser)
      .then((response) => {
        console.log("User registered successfully:", response);

        // Show success modal
        document.getElementById("successModal").style.display = "block";

        // Redirect to sign-in page after delay
        setTimeout(function () {
          window.location.href = "sign-in.html";
        }, 3000);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("Registration failed: " + error.message);
      })
      .finally(() => {
        // Re-enable submit button if needed
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("successModal").style.display = "none";
  window.location.href = "sign-in.html";
});
