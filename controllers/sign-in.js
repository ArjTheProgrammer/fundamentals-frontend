import signinService from "../services/auth/signin.js";

document.querySelector(".signin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  signinService
    .getUser(username, password)
    .then((validUser) => {
      if (validUser && validUser.user_id) {
        // Check for a valid user object with ID
        // User found
        console.log("User authenticated successfully");
        console.log(JSON.stringify(validUser));
        localStorage.setItem("user", JSON.stringify(validUser));
        window.location.href = "homepage.html";
      } else {
        // User not found
        document.getElementById("errorModal").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error during authentication:", error);
      document.getElementById("errorModal").style.display = "block";
    });
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("errorModal").style.display = "none";
});
