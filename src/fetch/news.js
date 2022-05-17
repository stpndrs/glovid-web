import axios from 'axios'
import { BASE_URL } from '../constant'

export const getBeritaTerkini = async () => {
    const response = await axios.get(`${BASE_URL}/api/news/covid19`, {})
    return response.data
}
