import workoutService from "../services/workouts.js";

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", async function () {
  const ownWorkouts = await workoutService.getOwnWorkouts();
  const viewWorkoutDialog = document.getElementById("viewWorkout");

  // Get the container where workout cards will be added
  const workoutsContainer = document.querySelector(".workouts-container");

  // Clear existing static content
  workoutsContainer.innerHTML = "";

  // Create and add workout cards dynamically
  ownWorkouts.forEach((workout) => {
    const workoutCard = document.createElement("div");
    workoutCard.className = "workout-card";
    workoutCard.dataset.id = workout.workout_id;

    const title = document.createElement("h3");
    title.className = "workout-title";
    title.textContent = workout.workout_name;

    const description = document.createElement("p");
    description.className = "workout-description";
    description.textContent = workout.description;

    const editLink = document.createElement("a");
    editLink.href = `editWorkout.html?id=${workout.workout_id}`;
    editLink.className = "edit-icon";

    const editIcon = document.createElement("img");
    editIcon.src =
      "https://img.icons8.com/?size=25&id=EpwgBizRWig8&format=png&color=000000";
    editIcon.alt = "Edit";

    editLink.appendChild(editIcon);

    workoutCard.appendChild(title);
    workoutCard.appendChild(description);
    workoutCard.appendChild(editLink);

    // Add click event listener
    workoutCard.addEventListener("click", function (event) {
      // Prevent triggering click when edit icon is clicked
      if (event.target === editIcon || event.target === editLink) {
        return;
      }

      const workoutId = this.dataset.id;
      console.log(
        "Workout clicked:",
        this.querySelector(".workout-title").textContent,
        "ID:",
        workoutId
      );
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(-5px)";
      }, 100);

      // Store workout ID in localStorage
      localStorage.setItem("currentWorkout", workoutId);

      // Open the dialog with workout details
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
  });

  // Add subtle animation to hero section
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

  // Add staggered animation to workout cards
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

  // Set up close dialog button
  viewWorkoutDialog
    .querySelector("#closeDialog")
    .addEventListener("click", () => {
      viewWorkoutDialog.close();
    });

  // Function to open dialog with workout details
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
      const workoutId = localStorage.getItem("currentWorkout");
      const drills = await workoutService.getWorkoutDrills(workoutId);

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

  // Helper function to create drill element
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
});
