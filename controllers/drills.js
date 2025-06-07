const selectDrill = (drillId) => {
  sessionStorage.setItem("selectedDrillId", drillId);
  window.location.href = "drill.html";
};

// Get all skill cards
const dribbling = document.querySelector("#dribbling");
const passing = document.querySelector("#passing");
const defense = document.querySelector("#defense");
const shooting = document.querySelector("#shooting");
const rebounding = document.querySelector("#rebounding");

// Helper function to set up click event for any card
const setupCardClickEvent = (element, drillId) => {
  element.addEventListener("click", () => {
    sessionStorage.setItem("header", element.querySelector("h2").textContent);
    sessionStorage.setItem("paragraph", element.querySelector("p").textContent);
    selectDrill(drillId);
  });
};

// Set up click events for all cards
setupCardClickEvent(dribbling, 1);
setupCardClickEvent(passing, 2);
setupCardClickEvent(shooting, 3);
setupCardClickEvent(rebounding, 4);
setupCardClickEvent(defense, 5);
