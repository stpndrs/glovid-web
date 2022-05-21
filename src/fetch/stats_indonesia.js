import axios from 'axios'
import { BASE_URL } from '../constant'

export const statsIndonesia = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/stats/indonesia`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
