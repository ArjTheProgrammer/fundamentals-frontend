import axios from '../axios.js'
const baseUrl = '/api/signin'

const getUser = async (username, passowrd) => {
    const data = {
        username: username,
        password: passowrd
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