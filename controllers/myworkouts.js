// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Sample workout data (replace with API call in production)
  const workouts = [
    {
      id: 1,
      title: "STRENGTH TRAINING",
      description: "Build muscle with this high-intensity workout routine",
    },
    {
      id: 2,
      title: "AGILITY DRILLS",
      description:
        "Improve your footwork and reaction time with these exercises",
    },
    {
      id: 3,
      title: "CARDIO BURST",
      description: "Enhance your stamina with this interval training workout",
    },
  ];

  // Get the container where workout cards will be added
  const workoutsContainer = document.querySelector(".workouts-container");

  // Clear existing static content
  workoutsContainer.innerHTML = "";

  // Create and add workout cards dynamically
  workouts.forEach((workout) => {
    const workoutCard = document.createElement("div");
    workoutCard.className = "workout-card";

    workoutCard.innerHTML = `
            <h3 class="workout-title">${workout.title}</h3>
            <p class="workout-description">${workout.description}</p>
            <a href="editworkout.html" class="edit-icon">
                <img src="https://img.icons8.com/?size=25&id=EpwgBizRWig8&format=png&color=000000" alt="Edit">
            </a>
        `;

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
