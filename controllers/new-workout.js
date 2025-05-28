import drillService from "../services/drills.js";
import workoutService from "../services/workouts.js";

// Store all drills globally to avoid refetching
let allDrills = [];
// Store all selections across categories
let globalSelections = {};

window.getSelectedDrills = function () {
  // Instead of just getting drills from the DOM, use our saved selections
  const drills = [];

  // Iterate through all saved selections
  Object.entries(globalSelections).forEach(([drillName, data]) => {
    if (data.checked) {
      drills.push({
        name: drillName,
        desc: data.instructions,
        drill_id: data.drillId,
      });
    }
  });

  return drills;
};

window.createWorkout = function () {
  // Save current selections before showing preview
  saveCurrentSelections();

  const workoutName = document.getElementById("workoutName").value.trim();
  const workoutDesc = document
    .getElementById("workoutDescription")
    .value.trim();
  const drills = window.getSelectedDrills();

  // Validate workout name
  if (!workoutName) {
    alert("Please enter a workout name.");
    return;
  }

  // Validate workout name length
  if (workoutName.length > 50) {
    alert("Workout name must be 50 characters or less.");
    return;
  }

  // Validate workout description length
  if (workoutDesc.length > 250) {
    alert("Workout description must be 250 characters or less.");
    return;
  }

  // Validate minimum drill selection
  if (drills.length < 3) {
    alert("Please select at least 3 drills for your workout.");
    return;
  }

  console.log(drills);
  let html = `<strong>Name:</strong> ${workoutName}<br>
    <strong>Description:</strong> ${
      workoutDesc || ""
    }<br><strong>Drills:</strong><ul>`;
  drills.forEach((d) => {
    html += `<li><strong>${d.name}</strong>: ${d.desc}</li>`;
  });
  html += "</ul>";
  document.getElementById("previewContent").innerHTML = html;
  document.getElementById("previewModal").style.display = "block";
};

// Function to save current drill selections
function saveCurrentSelections() {
  document.querySelectorAll(".drill-list .drill").forEach((label) => {
    const checkbox = label.querySelector('input[type="checkbox"]');
    const drillName = label.querySelector("strong").textContent;
    const customInstructions = label.querySelector('input[type="text"]').value;
    const drillId = checkbox.dataset.drillId;

    if (checkbox && drillName) {
      globalSelections[drillName] = {
        checked: checkbox.checked,
        instructions: customInstructions,
        drillId: drillId,
      };
    }
  });
}

// Function to populate drill list dynamically based on selected category
async function populateDrillList(category, initialLoad = false) {
  const drillList = document.querySelector(".drill-list");

  // Save current selections before updating
  if (!initialLoad) {
    saveCurrentSelections();
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
        <input type="checkbox" data-drill-id="${drill.drill_id}" ${
        savedSelection.checked ? "checked" : ""
      } />
        <div>
          <strong>${drillName}</strong>
          <input type="text" value="${
            savedSelection.instructions || drill.instructions
          }" />
        </div>
      `;
      drillList.appendChild(drillElement);

      // Store the drill_id in our global selections on initial setup
      if (!globalSelections[drillName]) {
        globalSelections[drillName] = {
          checked: false,
          instructions: drill.instructions,
          drillId: drill.drill_id,
        };
      }
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
      // Save current selections before creating workout
      saveCurrentSelections();

      // Get the workout name and description
      const workoutName = document.getElementById("workoutName").value.trim();
      const workoutDesc = document
        .getElementById("workoutDescription")
        .value.trim();

      // Validate workout name again (in case it was changed)
      if (!workoutName) {
        alert("Please enter a workout name.");
        return;
      }

      // Validate workout name length
      if (workoutName.length > 50) {
        alert("Workout name must be 50 characters or less.");
        return;
      }

      // Validate workout description length
      if (workoutDesc.length > 250) {
        alert("Workout description must be 250 characters or less.");
        return;
      }

      const drills = window.getSelectedDrills();

      // Validate minimum drill selection
      if (drills.length < 3) {
        alert("Please select at least 3 drills for your workout.");
        return;
      }

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

  // Add maxlength attributes to input fields
  const workoutNameInput = document.getElementById("workoutName");
  const workoutDescInput = document.getElementById("workoutDescription");

  if (workoutNameInput) {
    workoutNameInput.maxLength = 50;
    workoutNameInput.required = true;
  }

  if (workoutDescInput) {
    workoutDescInput.maxLength = 250;
  }

  // Add event listeners for checkboxes and text inputs to save selections in real-time
  document.addEventListener("change", function (e) {
    if (e.target.closest(".drill-list")) {
      saveCurrentSelections();
    }
  });

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
