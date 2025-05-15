document.addEventListener("DOMContentLoaded", () => {
  
  const menu = document.getElementById("menuOpen");
  const profileBtn = document.querySelector(".user-profile");

  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("menuOpen").classList.toggle("open-menu");
  });

});
