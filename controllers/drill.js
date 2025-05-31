import drillService from "../services/drills.js";

const drillId = sessionStorage.getItem("selectedDrillId");

console.log(drillId);

// Function to populate drill cards
const populateDrillCards = async () => {
  const getHeader = document.querySelector(".hero .dribbling-title");
  const getParagraph = document.querySelector(".hero p:last-child");

  getHeader.textContent = sessionStorage.getItem("header");
  getParagraph.textContent = sessionStorage.getItem("paragraph");

  const drillContainer = document.getElementById("drillContainer");

  // Show loading state
  drillContainer.innerHTML = "<p>Loading drills...</p>";

  try {
    // Fetch the drills data - notice we're awaiting the result of the function call
    const drillsData = await drillService.getDrill(parseInt(drillId));

    // Clear the container now that we have data
    drillContainer.innerHTML = "";

    // Check if we got valid data
    if (!drillsData || drillsData.length === 0) {
      drillContainer.innerHTML = "<p>No drills found.</p>";
      return;
    }

    // Create drill cards using the data we received
    drillsData.forEach((drill) => {
      const drillCard = document.createElement("div");
      drillCard.className = "drill-card";
      drillCard.innerHTML = `
        <div class="video-container">
          <iframe
            src="${drill.youtube_url}"
            title="${drill.drill_name}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <h2>${drill.drill_name}</h2>
        <p>${drill.instructions}</p>
      `;
      drillContainer.appendChild(drillCard);
    });
  } catch (error) {
    console.error("Error fetching drills:", error);
    drillContainer.innerHTML =
      "<p>Error loading drills. Please try again later.</p>";
  }
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  populateDrillCards();
});
