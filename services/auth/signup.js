import axios from "../axios.js";
const baseUrl = "/api/signup";

const createUser = async (userData) => {
  // Ensure all required fields are present
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.username ||
    !userData.email ||
    !userData.password
  ) {
    throw new Error("All fields are required");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(baseUrl, userData, config);
  return response.data;
};

export default { createUser };
