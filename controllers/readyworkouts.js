import workoutService from "../services/workouts.js";

const viewWorkoutDialog = document.getElementById("viewWorkout");

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", async function () {
  // Workout data
  const readyWorkouts = await workoutService.getReadyWorkouts();

  // Get the container element
  const workoutsContainer = document.getElementById("workouts-container");

  // Generate workout cards
  readyWorkouts.forEach((workout) => {
    const workoutCard = document.createElement("div");
    workoutCard.className = "workout-card";

    const title = document.createElement("h3");
    title.className = "workout-title";
    title.textContent = workout.workout_name;

    const description = document.createElement("p");
    description.className = "workout-description";
    description.textContent = workout.description;

    workoutCard.appendChild(title);
    workoutCard.appendChild(description);

    // Add click event listener
    workoutCard.addEventListener("click", () => {
      viewWorkoutDialog
        .querySelector("#closeDialog")
        .addEventListener("click", () => {
          viewWorkoutDialog.close();
        });
      localStorage.setItem("currentWorkout", workout.workout_id);
      console.log(localStorage.getItem("currentWorkout"));

      openDialog(workout);
    });

    workoutsContainer.appendChild(workoutCard);
  });

  // Add hover effect to workout cards
  const workoutCards = document.querySelectorAll(".workout-card");

  workoutCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("click", function () {
      console.log(
        "Workout clicked:",
        this.querySelector(".workout-title").textContent
      );
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(-5px)";
      }, 100);
    });
  });

  // Add animation to hero section
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(20px)";
    heroTitle.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }, 300);
  }

  // Add animation to workout cards
  workoutCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition =
      "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 500 + index * 100);
  });

  const openDialog = async (workout) => {
    try {
      // Update dialog title and description
      const dialogTitle = viewWorkoutDialog.querySelector("h2");
      const dialogDesc = viewWorkoutDialog.querySelector("p");
      const drillsContainer =
        viewWorkoutDialog.querySelector(".drills-container");

      dialogTitle.textContent = workout.workout_name;
      dialogDesc.textContent = workout.description;

      // Show loading state
      drillsContainer.innerHTML = "<p>Loading drills...</p>";

      // Fetch drills for this workout
      const drills = await workoutService.getWorkoutDrills(
        localStorage.getItem("currentWorkout")
      );

      console.log(drills);

      // Clear container and populate with drills
      drillsContainer.innerHTML = "";

      if (drills.length === 0) {
        drillsContainer.innerHTML = "<p>No drills found for this workout.</p>";
      } else {
        drills.forEach((drill) => {
          const drillElement = createDrillElement(drill);
          drillsContainer.appendChild(drillElement);
        });
      }

      // Open the dialog
      viewWorkoutDialog.showModal();
    } catch (error) {
      console.error("Error fetching workout drills:", error);
    }
  };
});

function createDrillElement(drill) {
  const drillDiv = document.createElement("div");
  drillDiv.classList.add("drill");

  drillDiv.innerHTML = `
      <div class="drill-title">
        <h4>${drill.drill_name}</h4>
        <span>${drill.skill_name}</span>
      </div>
      <p>${drill.instructions}</p>
    `;

  return drillDiv;
}
