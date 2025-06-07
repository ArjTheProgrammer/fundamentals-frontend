document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".testimonial-cards");
  const cards = document.querySelectorAll(".testimonial-card");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");

  if (!container || !leftBtn || !rightBtn || cards.length === 0) return;

  // Start from the middle card
  let currentIndex = Math.floor(cards.length / 2);
  const totalCards = cards.length;

  // Function to center a specific card
  function centerCard(index) {
    if (index < 0) index = totalCards - 1; // Loop to the end
    if (index >= totalCards) index = 0; // Loop to the beginning

    currentIndex = index;
    const card = cards[index];

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // Calculate scroll position to center the card
    const scrollPosition =
      card.offsetLeft - containerRect.width / 2 + cardRect.width / 2;

    // Smooth scroll to position
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }

  // Initialize with the middle card centered
  setTimeout(() => centerCard(currentIndex), 100);

  // Button event listeners with looping
  leftBtn.addEventListener("click", () => {
    centerCard(currentIndex - 1); // Will loop to end if needed
  });

  rightBtn.addEventListener("click", () => {
    centerCard(currentIndex + 1); // Will loop to start if needed
  });
});
