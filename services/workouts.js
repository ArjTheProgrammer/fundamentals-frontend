import axios from "./axios.js";
const baseUrl = "/api/workouts";

const getReadyWorkouts = async () => {
  // Parse the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.user_id) {
    throw new Error("User not found in localStorage or missing user_id");
  }

  const response = await axios.get(`${baseUrl}/${user.user_id}`);
  console.log(response);
  return response.data;
};

export default { getReadyWorkouts };
