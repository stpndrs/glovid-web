const { default: axios } = require('axios')
let hospitalBank = []

module.exports = {
    getListHospital: async (req, res) => {
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        if (!page) page = 1
        if (!limit) limit = 50

        let offset = limit * (page - 1)
        let totalPages = parseInt(hospitalBank.length / limit)
        if (hospitalBank.length % limit >= 0) totalPages++

        let search = req.query.search

        try {
            if (hospitalBank.length <= 0) {
                const response = await axios.get(
                    'https://data.covid19.go.id/public/api/rs.json'
                )
                hospitalBank = response.data
                setTimeout(() => {
                    hospitalBank = []
                }, 1000 * 60 * 30)
            }

            let hospitalBankOps = hospitalBank.slice()
            if (search) {
                hospitalBankOps = hospitalBankOps.filter((item, index) => {
                    return item.nama
                        .toLowerCase()
                        .includes(search.toLowerCase())
                })
            }
            return res.json({
                pagination: {
                    page,
                    limit,
                    offset,
                    total_records: hospitalBank.length,
                    total_pages: totalPages,
                },
                data: hospitalBankOps.splice(offset, limit),
            })
        } catch (error) {
            console.log(error)
            res.send(error.response)
        }
    },
}
