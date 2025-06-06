import axios from "./axios.js";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const updateFirstName = async (id, firstName) => {
  const response = await axios.put(`${baseUrl}/${id}/firstName`, { firstName });
  return response.data;
};

const updateLastName = async (id, lastName) => {
  const response = await axios.put(`${baseUrl}/${id}/lastName`, { lastName });
  return response.data;
};

const updateUsername = async (id, username) => {
  const response = await axios.put(`${baseUrl}/${id}/username`, { username });
  return response.data;
};

const updateEmail = async (id, email) => {
  const response = await axios.put(`${baseUrl}/${id}/email`, { email });
  return response.data;
};

const updatePassword = async (id, currentPassword, newPassword) => {
  const response = await axios.put(`${baseUrl}/${id}/password`, {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export default {
  getAll,
  getUser,
  updateFirstName,
  updateLastName,
  updateUsername,
  updateEmail,
  updatePassword,
};
