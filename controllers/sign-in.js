import signinService from "../services/auth/signin.js";

document.querySelector(".signin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  //     const users = JSON.parse(localStorage.getItem('registered')) || [];

  //     const validUser = users.find(user =>
  //         user.username === username && user.password === password
  //     );

  //     if (validUser) {
  //         // window.location.href = "homepage/dashboard kung ano man name jan hahahaha.html";
  //     } else {
  //         document.getElementById('errorModal').style.display = 'block';
  //     }
  // });

  const user = signinService.getUser(username, password);
  user
    .then((validUser) => {
      if (Array.isArray(validUser) && validUser.length > 0) {
        // User found
        console.log("User authenticated successfully");
        console.log(JSON.stringify(validUser[0]));
        sessionStorage.setItem("user", validUser[0]);
        window.location.href = "homepage.html";
      } else {
        // User not found
        document.getElementById("errorModal").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error during authentication:", error);
    });
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("errorModal").style.display = "none";
});
