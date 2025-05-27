function toggleMenu() {
  document.getElementById("menuOpen").classList.toggle("open-menu");
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const usertitle = document.querySelector(".welcome-user h1");
  usertitle.textContent = "Hi!" + user.first_name;
  console.log(user);
});
