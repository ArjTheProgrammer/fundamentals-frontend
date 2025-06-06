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

  // Handle password change
  document
    .getElementById("changePasswordBtn")
    .addEventListener("click", function () {
      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      const modal = document.getElementById("passwordModal");
      const modalMessage = document.getElementById("modalMessage");
      const modalTitle = document.getElementById("modalTitle");

      // Check if all fields are filled
      if (!currentPassword || !newPassword || !confirmPassword) {
        modalTitle.textContent = "Error";
        modalMessage.textContent = "All password fields are required!";
        modal.style.display = "flex";
        return;
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        modalTitle.textContent = "Error";
        modalMessage.textContent = "New passwords do not match!";
        modal.style.display = "flex";
        return;
      }

      // Get current user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser) {
        modalTitle.textContent = "Error";
        modalMessage.textContent = "You must be logged in to change password.";
        modal.style.display = "flex";
        return;
      }

      // Here you would typically make an API call to verify current password and update with new password
      // For now, just show success message
      modalTitle.textContent = "Success";
      modalMessage.textContent = "Password changed successfully!";
      modal.style.display = "flex";

      // Clear password fields
      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
    });

  // Close modal when close button is clicked
  document
    .getElementById("closeModalBtn")
    .addEventListener("click", function () {
      document.getElementById("passwordModal").style.display = "none";
    });
});
