import workoutService from "../services/workouts.js";

const currentWorkout = localStorage.getItem("currentWorkout");

const workoutDrills = await workoutService.getWorkoutDrills(currentWorkout);

console.log(workoutDrills);

const finishDialog = document.getElementById("finish");
