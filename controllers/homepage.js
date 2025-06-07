import analysis from "../services/analytics.js";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user.user_id);

function toggleMenu() {
  document.getElementById("menuOpen").classList.toggle("open-menu");
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const usertitle = document.querySelector(".welcome-user h1");
  usertitle.textContent = "Hi! " + user.first_name;
  console.log(user);

  // Add event listener for menu toggle
  document
    .querySelector(".user-profile img")
    .addEventListener("click", toggleMenu);

  // Fetch analytics data
  try {
    const analyticsData = await analysis.getAnalytics(user.user_id);
    console.log(analyticsData);

    if (analyticsData && analyticsData.length > 0) {
      const userData = analyticsData[0];

      // Update skill values in the progress section
      updateSkillValue("Dribbling", userData.dribbling_count);
      updateSkillValue("Shooting", userData.shooting_count);
      updateSkillValue("Passing", userData.passing_count);
      updateSkillValue("Rebounding", userData.rebounding_count);
      updateSkillValue("Defense", userData.defense_count);

      // Create the doughnut chart with the dynamic data
      createDoughnutChart(userData);
    }
  } catch (error) {
    console.error("Error fetching analytics data:", error);
  }
});

// Function to update skill values in the UI
function updateSkillValue(skillName, value) {
  const skillRows = document.querySelectorAll(".skill-row");

  for (const row of skillRows) {
    const nameElement = row.querySelector(".skill-name");
    if (nameElement && nameElement.textContent === skillName) {
      const valueElement = row.querySelector(".skill-value");
      if (valueElement) {
        valueElement.textContent = value;
      }
      break;
    }
  }
}

// Function to create the doughnut chart with dynamic data
function createDoughnutChart(userData) {
  const xValues = ["Dribbling", "Passing", "Shooting", "Rebounding", "Defense"];
  const yValues = [
    userData.dribbling_count,
    userData.passing_count,
    userData.shooting_count,
    userData.rebounding_count,
    userData.defense_count,
  ];
  const barColors = ["#C26211", "#ED8732", "#F69B4F", "#F8B175", "#FFD0A9"];

  new Chart("donut", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false, // This hides the legend
        },
        title: {
          display: false,
          text: "Skill Distribution",
        },
      },
    },
  });
}
