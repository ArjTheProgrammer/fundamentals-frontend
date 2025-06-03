document.addEventListener("DOMContentLoaded", function () {
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
});
