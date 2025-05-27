// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Workout data
  const workouts = [
    {
      title: "SHOOTING BASICS",
      description: "Master your shooting form with this fundamental workout",
    },
    {
      title: "HANDLES PRO",
      description: "Improve your ball handling skills with advanced drills",
    },
    {
      title: "DEFENSE MASTER",
      description: "Learn defensive positioning and quick feet movement",
    },
  ];

  // Get the container element
  const workoutsContainer = document.getElementById("workouts-container");

  // Generate workout cards
  workouts.forEach((workout) => {
    const workoutCard = document.createElement("div");
    workoutCard.className = "workout-card";

    const title = document.createElement("h3");
    title.className = "workout-title";
    title.textContent = workout.title;

    const description = document.createElement("p");
    description.className = "workout-description";
    description.textContent = workout.description;

    workoutCard.appendChild(title);
    workoutCard.appendChild(description);

    // Add click event listener
    workoutCard.addEventListener("click", () => {
      // Handle click event - could navigate to workout details page
      console.log(`Selected workout: ${workout.title}`);
      // Example: window.location.href = `/workout-details.html?workout=${encodeURIComponent(workout.title)}`;
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
});
