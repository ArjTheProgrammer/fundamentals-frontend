import axios from "../axios.js";
const baseUrl = "/api/signin";

const getUser = async (username, password) => {
  try {
    const data = {
      username: username,
      password: password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(baseUrl, data, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error during sign in:",
      error.response?.data || error.message
    );
    throw error; // Re-throwing the error for the caller to handle
  }
};

export default { getUser };
