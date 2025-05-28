import drillService from "../services/drills.js";
import workoutService from "../services/workouts.js";

// Store all drills globally to avoid refetching
let allDrills = [];
// Store all selections across categories
let globalSelections = {};

window.getSelectedDrills = function () {
  const drills = [];
  document.querySelectorAll(".drill-list .drill").forEach((label) => {
    const checkbox = label.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      const name = label.querySelector("strong").textContent;
      const desc = label.querySelector('input[type="text"]').value;
      drills.push({ name, desc });
    }
  });
  return drills;
};

window.createWorkout = function () {
  const workoutName = document.getElementById("workoutName").value;
  const workoutDesc = document.getElementById("workoutDescription").value;
  const drills = window.getSelectedDrills();
  console.log(drills);
  let html = `<strong>Name:</strong> ${workoutName || "(No name)"}<br>
    <strong>Description:</strong> ${
      workoutDesc || "(No Description)"
    }<br><strong>Drills:</strong><ul>`;
  drills.forEach((d) => {
    html += `<li><strong>${d.name}</strong>: ${d.desc}</li>`;
  });
  html += "</ul>";
  document.getElementById("previewContent").innerHTML = html;
  document.getElementById("previewModal").style.display = "block";
};

window.cancelWorkout = function () {
  window.location.href = "myworkouts.html";
};

// Function to populate drill list dynamically based on selected category
async function populateDrillList(category, initialLoad = false) {
  const drillList = document.querySelector(".drill-list");

  // Save current selections before updating
  if (!initialLoad) {
    document.querySelectorAll(".drill-list .drill").forEach((label) => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      const drillName = label.querySelector("strong").textContent;
      const customInstructions =
        label.querySelector('input[type="text"]').value;

      if (checkbox && drillName) {
        globalSelections[drillName] = {
          checked: checkbox.checked,
          instructions: customInstructions,
        };
      }
    });
  }

  drillList.innerHTML = "<p>Loading drills...</p>";

  try {
    // Only fetch drills from server on initial load
    if (initialLoad) {
      allDrills = await drillService.getAll();
    }

    let filteredDrills;

    // Filter drills by the selected category
    if (category.toLowerCase() === "all") {
      filteredDrills = allDrills;
    } else {
      // Filter drills by the selected category
      filteredDrills = allDrills.filter(
        (drill) =>
          drill.skill_name &&
          drill.skill_name.toLowerCase() === category.toLowerCase()
      );
    }

    drillList.innerHTML = "";

    if (filteredDrills.length === 0) {
      drillList.innerHTML = "<p>No drills found for this category.</p>";
      return;
    }

    // Create drill checkbox items
    filteredDrills.forEach((drill) => {
      const drillName = drill.drill_name;
      const savedSelection = globalSelections[drillName] || {};

      const drillElement = document.createElement("label");
      drillElement.className = "drill";
      drillElement.innerHTML = `
        <input type="checkbox" ${savedSelection.checked ? "checked" : ""} />
        <div>
          <strong>${drillName}</strong>
          <input type="text" value="${
            savedSelection.instructions || drill.instructions
          }" />
        </div>
      `;
      drillList.appendChild(drillElement);
    });
  } catch (error) {
    console.error("Error fetching drills:", error);
    drillList.innerHTML =
      "<p>Error loading drills. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // Set up modal close button
  const closeModal = document.getElementById("closeModal");
  if (closeModal) {
    closeModal.onclick = function () {
      document.getElementById("previewModal").style.display = "none";
    };
  }

  // Set up confirm create button
  const confirmCreate = document.getElementById("confirmCreate");
  if (confirmCreate) {
    confirmCreate.onclick = function () {
      // Get the workout name and description
      const workoutName = document.getElementById("workoutName").value;
      const workoutDesc = document.getElementById("workoutDescription").value;
      const drills = window.getSelectedDrills();

      // Save workout using the service
      workoutService
        .create({
          name: workoutName,
          description: workoutDesc,
          drills: drills,
        })
        .then(() => {
          document.getElementById("previewModal").style.display = "none";
          window.location.href = "myworkouts.html";
        })
        .catch((error) => {
          console.error("Error saving workout:", error);
          alert("Failed to save workout. Please try again.");
        });
    };
  }

  // Setup category radio buttons to filter drills
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", function (event) {
      // Prevent form submission
      event.preventDefault();

      if (this.checked) {
        const category = this.parentElement.querySelector("p").textContent;
        populateDrillList(category); // Not initial load
      }
    });
  });

  // Load dribbling drills by default (first category)
  const firstCategory = document.querySelector('input[name="category"]');
  if (firstCategory) {
    firstCategory.checked = true;
    const category = firstCategory.parentElement.querySelector("p").textContent;
    populateDrillList(category, true); // Initial load
  }
});
