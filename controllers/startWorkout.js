import workoutService from "../services/workouts.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Get the current workout from localStorage
  const currentWorkoutId = localStorage.getItem("currentWorkout");

  // Fetch workout drills
  let workoutDrills = [];
  try {
    workoutDrills = await workoutService.getWorkoutDrills(currentWorkoutId);
    console.log("Loaded drills:", workoutDrills);

    if (workoutDrills.length === 0) {
      showMessage("No drills found for this workout.");
      return;
    }

    // Create progress bars based on number of drills
    createProgressBars(workoutDrills.length);

    // Initialize the first drill
    let currentDrillIndex = 0;
    updateProgressBars(currentDrillIndex, workoutDrills.length);
    displayDrill(
      workoutDrills[currentDrillIndex],
      currentDrillIndex,
      workoutDrills.length
    );

    // Set up the continue/finish button
    const continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", function () {
      if (currentDrillIndex < workoutDrills.length - 1) {
        // Move to the next drill
        currentDrillIndex++;
        updateProgressBars(currentDrillIndex, workoutDrills.length);
        displayDrill(
          workoutDrills[currentDrillIndex],
          currentDrillIndex,
          workoutDrills.length
        );

        // Check if this is the last drill
        if (currentDrillIndex === workoutDrills.length - 1) {
          continueButton.textContent = "finish";
        }
      } else {
        // Show completion dialog
        const finishDialog = document.getElementById("finish");
        finishDialog.showModal();
      }
    });

    // Set up the dialog's button to redirect to workouts page
    const toWorkoutsButton = document.getElementById("toWorkoutsButton");
    toWorkoutsButton.addEventListener("click", function () {
      window.location.href = "./workout.html";
    });
  } catch (error) {
    console.error("Error fetching workout drills:", error);
    showMessage("Error loading workout drills. Please try again.");
  }
});

// Function to create progress bars
function createProgressBars(totalDrills) {
  const progressBarsContainer = document.getElementById("progressBars");
  progressBarsContainer.innerHTML = ""; // Clear existing bars

  for (let i = 0; i < totalDrills; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    progressBarsContainer.appendChild(bar);
  }
}

// Function to update progress bars
function updateProgressBars(currentIndex, totalDrills) {
  const bars = document.querySelectorAll(".bar");

  bars.forEach((bar, index) => {
    if (index <= currentIndex) {
      bar.classList.add("done");
    } else {
      bar.classList.remove("done");
    }
  });
}

// Function to display a drill
function displayDrill(drill, currentIndex, totalDrills) {
  document.querySelector("h2").innerHTML = `Drill <span>${
    currentIndex + 1
  }</span> of <span>${totalDrills}</span>`;

  document.querySelector(".drill_name").textContent = drill.drill_name;
  document.querySelector(".skill").textContent = drill.skill_name;
  document.querySelector("main p").textContent = drill.instructions;

  // Update the iframe src
  const iframe = document.querySelector("iframe");
  iframe.src = drill.youtube_url;
  iframe.title = drill.drill_name;
}

// Function to show error messages
function showMessage(message) {
  const main = document.querySelector("main");
  main.innerHTML = `<div class="error-message">${message}</div>`;
}
