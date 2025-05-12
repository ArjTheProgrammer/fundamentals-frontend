import axios from '../axios.js'
const baseUrl = '/api/signin'

const getUser = async (username, password) => {
    const data = {
        username: username,
        password: password
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await axios.post(baseUrl, data, config)
    return response.data
}

export default { getUser }