import axios from 'axios'
import { BASE_URL } from '../constant'

export const statsGlobal = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/stats/global`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
