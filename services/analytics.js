import axios from "./axios.js";
const baseUrl = "/api/analytics";

const getAnalytics = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response);
  return response.data;
};

export default { getAnalytics };