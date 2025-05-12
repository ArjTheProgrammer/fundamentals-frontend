import axios from '../axios.js';
const baseUrl = '/api/signup';

const createUser = async (userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(baseUrl, userData, config);
    return response.data;
};

export default { createUser };