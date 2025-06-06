import userService from "../services/users.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get user data from localStorage and populate form fields
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    // Populate form fields with user data
    const inputFields = document.querySelectorAll(".form-fields .field-input");

    // Populate first name, last name, username, and email fields
    inputFields.forEach((input) => {
      const placeholder = input.getAttribute("placeholder").toLowerCase();

      if (placeholder.includes("first name") && user.first_name) {
        input.value = user.first_name;
      } else if (placeholder.includes("last name") && user.last_name) {
        input.value = user.last_name;
      } else if (placeholder.includes("username") && user.username) {
        input.value = user.username;
      } else if (placeholder.includes("email") && user.email) {
        input.value = user.email;
      }
      // Password fields are intentionally left empty
    });

    // If user has a profile image, display it
    if (user.profile_image) {
      document.getElementById("avatar-image").src = user.profile_image;
    }
  }

  // Image upload preview functionality
  document
    .getElementById("imageInput")
    .addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          document.getElementById("avatar-image").src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  // Add modal to the page dynamically
  const modalHTML = `
    <div class="modal" id="passwordModal">
      <div class="modal-content">
        <h3 id="modalTitle">Password Change</h3>
        <p id="modalMessage"></p>
        <button id="closeModalBtn" class="close-btn">Close</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add save button at the bottom of the form
  const formFields = document.querySelector(".form-fields");
  if (formFields && !document.getElementById("saveProfileBtn")) {
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "save-button";
    saveButton.id = "saveProfileBtn";
    saveButton.textContent = "Save Profile";
    formFields.appendChild(saveButton);
  }

  // Handle profile information save
  document
    .getElementById("saveProfileBtn")
    .addEventListener("click", async function () {
      if (!user) {
        showModal("Error", "You must be logged in to update your profile.");
        return;
      }

      try {
        const firstNameInput = document.querySelector(
          'input[placeholder="First Name"]'
        );
        const lastNameInput = document.querySelector(
          'input[placeholder="Last Name"]'
        );
        const usernameInput = document.querySelector(
          'input[placeholder="Username"]'
        );
        const emailInput = document.querySelector(
          'input[placeholder="Email address"]'
        );

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();

        // Check if any fields are empty
        if (!firstName || !lastName || !username || !email) {
          showModal("Error", "All profile fields are required!");
          return;
        }

        let updated = false;
        let updatedUserData = { ...user };

        // Update first name if changed
        if (firstName !== user.first_name) {
          await userService.updateFirstName(user.user_id, firstName);
          updatedUserData.first_name = firstName;
          updated = true;
        }

        // Update last name if changed
        if (lastName !== user.last_name) {
          await userService.updateLastName(user.user_id, lastName);
          updatedUserData.last_name = lastName;
          updated = true;
        }

        // Update username if changed
        if (username !== user.username) {
          try {
            await userService.updateUsername(user.user_id, username);
            updatedUserData.username = username;
            updated = true;
          } catch (error) {
            if (error.response && error.response.status === 400) {
              showModal("Error", "Username is already taken!");
              return;
            }
            throw error;
          }
        }

        // Update email if changed
        if (email !== user.email) {
          try {
            await userService.updateEmail(user.user_id, email);
            updatedUserData.email = email;
            updated = true;
          } catch (error) {
            if (error.response && error.response.status === 400) {
              showModal("Error", "Email is already taken!");
              return;
            }
            throw error;
          }
        }

        // If any updates were made, update localStorage
        if (updated) {
          localStorage.setItem("user", JSON.stringify(updatedUserData));
          showModal("Success", "Profile updated successfully!");
        } else {
          showModal("Information", "No changes were made to your profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        showModal("Error", "Failed to update profile. Please try again later.");
      }
    });

  // Handle password change
  document
    .getElementById("changePasswordBtn")
    .addEventListener("click", async function () {
      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Check if all fields are filled
      if (!currentPassword || !newPassword || !confirmPassword) {
        showModal("Error", "All password fields are required!");
        return;
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        showModal("Error", "New passwords do not match!");
        return;
      }

      // Get current user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser) {
        showModal("Error", "You must be logged in to change password.");
        return;
      }

      try {
        // Make API call to update password
        await userService.updatePassword(
          currentUser.user_id,
          currentPassword,
          newPassword
        );

        showModal("Success", "Password changed successfully!");

        // Clear password fields
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
      } catch (error) {
        console.error("Error changing password:", error);

        if (error.response && error.response.status === 401) {
          showModal("Error", "Current password is incorrect!");
        } else {
          showModal(
            "Error",
            "Failed to change password. Please try again later."
          );
        }
      }
    });

  // Function to show modal with custom title and message
  function showModal(title, message) {
    const modal = document.getElementById("passwordModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalTitle = document.getElementById("modalTitle");

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "flex";
  }

  // Close modal when close button is clicked
  document
    .getElementById("closeModalBtn")
    .addEventListener("click", function () {
      document.getElementById("passwordModal").style.display = "none";
    });
});
