import axios from 'axios'
import { BASE_URL } from '../constant'

export const statsByProvinsi = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/stats/stats_provinces`
        )
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const statsByHarian = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/stats/stats_daily`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
