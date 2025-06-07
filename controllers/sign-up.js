import usersService from "../services/users.js";
import signupService from "../services/auth/signup.js";

document.addEventListener("DOMContentLoaded", function () {
  // Add validation modal to the page dynamically
  const validationModalHTML = `
    <div class="modal" id="validationModal">
      <div class="modal-content">
        <h3 id="validationTitle">Error</h3>
        <p id="validationMessage"></p>
        <button id="closeValidationBtn" class="close-btn">Close</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", validationModalHTML);

  // Function to show validation modal instead of alert
  function showValidationModal(title, message) {
    const modal = document.getElementById("validationModal");
    document.getElementById("validationTitle").textContent = title;
    document.getElementById("validationMessage").textContent = message;
    modal.style.display = "flex";
  }

  // Close validation modal when close button is clicked
  document
    .getElementById("closeValidationBtn")
    .addEventListener("click", function () {
      document.getElementById("validationModal").style.display = "none";
    });

  // Add this function to validate password complexity
  function validatePassword(password) {
    // Check for minimum length of 8 characters
    if (password.length < 8) return false;

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) return false;

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) return false;

    // Check for at least one digit
    if (!/\d/.test(password)) return false;

    // Check for at least one special character
    if (!/[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]/.test(password)) return false;

    return true;
  }

  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
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
        showValidationModal("Error", "All fields are required!");
        return;
      }

      // Validate password match
      if (password !== confirmPass) {
        showValidationModal("Error", "Passwords do not match!");
        return;
      }

      // Validate password complexity
      if (!validatePassword(password)) {
        showValidationModal(
          "Error",
          "Password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and special characters"
        );
        return;
      }

      // Check username and email uniqueness
      usersService.getAll().then((userList) => {
        if (userList.some((user) => user.username === userName)) {
          showValidationModal("Error", "This username is already taken!");
          return;
        }

        if (userList.some((user) => user.email === email)) {
          showValidationModal("Error", "This email is already used!");
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

        console.log(newUser);

        signupService
          .createUser(newUser)
          .then((response) => {
            console.log("User registered successfully:", response);

            // Show success modal
            document.getElementById("successModal").style.display = "flex";

            // Redirect to sign-in page after delay
            setTimeout(function () {
              window.location.href = "sign-in.html";
            }, 3000);
          })
          .catch((error) => {
            console.error("Error during registration:", error);
            showValidationModal(
              "Error",
              "Registration failed: " + error.message
            );
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
});
