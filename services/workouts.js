import axios from "./axios.js";
const baseUrl = "/api/workouts";

const getReadyWorkouts = async () => {
  // Parse the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.user_id) {
    throw new Error("User not found in localStorage or missing user_id");
  }

  const response = await axios.get(`${baseUrl}/ready/${user.user_id}`);
  console.log(response);
  return response.data;
};

const getOwnWorkouts = async () => {
  // Parse the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.user_id) {
    throw new Error("User not found in localStorage or missing user_id");
  }

  const response = await axios.get(`${baseUrl}/own/${user.user_id}`);
  console.log(response);
  return response.data;
};

const getWorkoutDrills = async (workoutId) => {
  if (!workoutId) {
    throw new Error("Workout ID is required");
  }

  const response = await axios.get(`${baseUrl}/${workoutId}/drills`);
  console.log(response);
  return response.data;
};

const create = async (workoutData) => {
  // Parse the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.user_id) {
    throw new Error("User not found in localStorage or missing user_id");
  }

  // Format the request body according to the API requirements
  const requestBody = {
    user_id: user.user_id,
    workout_name: workoutData.name,
    description: workoutData.description || "",
    is_default: 0,
    drills: workoutData.drills.map((drill, index) => ({
      drill_id: drill.drill_id,
      drill_order: index + 1,
      instructions: drill.desc || "",
    })),
  };

  const response = await axios.post(`${baseUrl}/with-drills`, requestBody);
  console.log(response);
  return response.data;
};

const getWorkout = async (workoutId) => {
  try {
    // Find workout in own workouts
    const ownWorkouts = await getOwnWorkouts();
    const workout = ownWorkouts.find((w) => w.workout_id == workoutId);

    if (!workout) {
      throw new Error(`Workout with ID ${workoutId} not found`);
    }

    return workout;
  } catch (error) {
    console.error("Error fetching workout:", error);
    throw error;
  }
};

const update = async (workoutId, workoutData) => {
  // Parse the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.user_id) {
    throw new Error("User not found in localStorage or missing user_id");
  }

  if (!workoutId) {
    throw new Error("Workout ID is required");
  }

  // Format the request body according to the API requirements
  const requestBody = {
    user_id: user.user_id,
    workout_name: workoutData.name,
    description: workoutData.description || "",
    is_default: 0,
    drills: workoutData.drills.map((drill, index) => ({
      drill_id: drill.drill_id,
      drill_order: index + 1,
      instructions: drill.desc || "",
    })),
  };

  const response = await axios.put(`${baseUrl}/${workoutId}`, requestBody);
  console.log("Update response:", response);
  return response.data;
};

export default {
  getReadyWorkouts,
  getOwnWorkouts,
  getWorkoutDrills,
  create,
  getWorkout,
  update,
};
