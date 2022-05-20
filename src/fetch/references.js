import axios from 'axios'
import { BASE_URL } from '../constant'

export const getRujukanRS = async (page = 1, limit = 50, search = false) => {
    const config = {
        params: { page, limit },
    }
    if (search) config.params.search = search
    const response = await axios.get(
        `${BASE_URL}/api/references/hospital`,
        config
    )
    return response.data
}
