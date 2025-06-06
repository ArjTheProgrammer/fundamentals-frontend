document.addEventListener("DOMContentLoaded", function () {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Populate the form fields with user data
    const inputFields = document.querySelectorAll(".form-fields .field-input");

    // Map field indices to user properties
    const fieldMappings = [
      { index: 0, property: "first_name" },
      { index: 1, property: "last_name" },
      { index: 2, property: "username" },
      { index: 3, property: "email" },
    ];

    // Set values for each field
    fieldMappings.forEach((mapping) => {
      if (inputFields[mapping.index] && user[mapping.property]) {
        inputFields[mapping.index].value = user[mapping.property];
      }
    });

    // If user has a profile image, update the avatar
    if (user.profile_image) {
      const avatarImage = document.getElementById("avatar-image");
      if (avatarImage) {
        avatarImage.src = user.profile_image;
      }
    }

    // Add user's name to the page title if needed
    const pageTitle = document.querySelector(".page-title");
    if (pageTitle && user.first_name) {
      pageTitle.textContent = "SETTINGS";
    }
  } else {
    // Redirect to login if user is not logged in
    console.warn("No user found in localStorage");
    // Uncomment the following line to redirect to login page if needed
    // window.location.href = "sign-in.html";
  }
});
