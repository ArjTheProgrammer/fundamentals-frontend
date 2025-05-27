import workoutService from "../services/workouts.js";

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", async function () {
  const ownWorkouts = await workoutService.getOwnWorkouts();

  // Get the container where workout cards will be added
  const workoutsContainer = document.querySelector(".workouts-container");

  // Clear existing static content
  workoutsContainer.innerHTML = "";

  // Create and add workout cards dynamically
  ownWorkouts.forEach((workout) => {
    const workoutCard = document.createElement("div");
    workoutCard.className = "workout-card";
    workoutCard.dataset.id = workout.id;

    const title = document.createElement("h3");
    title.className = "workout-title";
    title.textContent = workout.workout_name;

    const description = document.createElement("p");
    description.className = "workout-description";
    description.textContent = workout.description;

    const editLink = document.createElement("a");
    editLink.href = "editworkout.html";
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
      // You can redirect to a detailed view here if needed
      // window.location.href = `workout-detail.html?id=${workoutId}`;
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
});
