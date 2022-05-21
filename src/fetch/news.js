import axios from 'axios'
import { BASE_URL } from '../constant'

export const getBeritaTerkini = async (
    page = 1,
    limit = 50,
    offset = false,
    search = false
) => {
    let config = {
        params: {
            page,
            limit,
        },
    }
    if (offset) config.params.offset = offset
    if (search) config.params.search = search
    const response = await axios.get(`${BASE_URL}/api/news/covid19`, config)
    return response.data
}
