import axios from "./axios.js";
const baseUrl = "/api/skills";

const trackSkill = async (skillId) => {
  try {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.user_id) {
      throw new Error("User not found in localStorage or missing user_id");
    }

    const data = {
      userId: user.user_id,
      skillId: skillId,
    };

    const response = await axios.put(`${baseUrl}/track`, data);
    console.log("Skill tracking response:", response);
    return response.data;
  } catch (error) {
    console.error("Error tracking skill:", error);
    throw error;
  }
};

export default { trackSkill };
