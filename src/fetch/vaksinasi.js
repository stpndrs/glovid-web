import axios from 'axios'
import { BASE_URL } from '../constant'

export const getVaksinasi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/stats/vaccination`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
