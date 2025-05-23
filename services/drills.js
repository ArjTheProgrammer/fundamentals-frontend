import axios from "./axios.js";
const baseUrl = "/api/drills";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  return response.data;
};

const getDrill = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response);
  return response.data;
};

export default { getAll, getDrill };
