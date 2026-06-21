import AXIOS from 'axios'

const API_KEY = import.meta.env.API_KEY

export const axios = AXIOS.create({
    baseURL: '/healthmonitor',
    headers: {
        API_KEY,
        'Content-Type': 'application/json',
    },
})

export const setAuthHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearAuthHeader = () => {
    delete axios.defaults.headers.common['Authorization']
}

export const apiCall = async (callback) => {
    try {
        const response = await callback()
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
