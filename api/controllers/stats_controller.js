const axios = require('axios')

module.exports = {
    global: async (req, res) => {
        try {
            const response = await axios.get(
                'https://disease.sh/v3/covid-19/all'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },

    indonesia: async (req, res) => {
        try {
            const response = await axios.get(
                'https://disease.sh/v3/covid-19/countries/360'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },

    statsByProvince: async (req, res) => {
        const provinceImages = {
            ACEH: '/images/provinces/1. Aceh.png',
            'SUMATERA UTARA': '/images/provinces/2. Sumatera Utara.png',
            'SUMATERA BARAT': '/images/provinces/3. Sumatera Barat.png',
            RIAU: '/images/provinces/4. Riau.png',
            'KEPULAUAN RIAU': '/images/provinces/5. Kepulauan Riau.png',
            JAMBI: '/images/provinces/6. Jambi.png',
            BENGKULU: '/images/provinces/7. Bengkulu.png',
            'SUMATERA SELATAN': '/images/provinces/8. Sumatera Selatan.png',
            'KEPULAUAN BANGKA BELITUNG':
                '/images/provinces/9. Bangka Belitung.png',
            LAMPUNG: '/images/provinces/10. Lampung.png',
            'DKI JAKARTA': '/images/provinces/11. Jakarta.png',
            BANTEN: '/images/provinces/12. Banten.png',
            'JAWA BARAT': '/images/provinces/13. Jawa Barat.png',
            'JAWA TENGAH': '/images/provinces/14. Jawa Tengah.png',
            'DAERAH ISTIMEWA YOGYAKARTA':
                '/images/provinces/15. Daerah Istimewa Yogyakarta.png',
            'JAWA TIMUR': '/images/provinces/16. Jawa Timur.png',
            BALI: '/images/provinces/17. Bali.png',
            'NUSA TENGGARA BARAT':
                '/images/provinces/18. Nusa Tenggara Barat.png',
            'NUSA TENGGARA TIMUR':
                '/images/provinces/19. Nusa Tenggara Timur.png',
            'KALIMANTAN BARAT': '/images/provinces/20. Kalimantan Barat.png',
            'KALIMANTAN TENGAH': '/images/provinces/21. Kalimantan Tengah.png',
            'KALIMANTAN SELATAN':
                '/images/provinces/22. Kalimantan Selatan.png',
            'KALIMANTAN TIMUR': '/images/provinces/23. Kalimantan Timur.png',
            'KALIMANTAN UTARA': '/images/provinces/24. Kalimantan Utara.png',
            'SULAWESI UTARA': '/images/provinces/25. Sulawesi Utara.png',
            GORONTALO: '/images/provinces/26. Gorontalo.png',
            'SULAWESI TENGAH': '/images/provinces/27. Sulawesi Tengah.png',
            'SULAWESI BARAT': '/images/provinces/28. Sulawesi Barat.png',
            'SULAWESI SELATAN': '/images/provinces/29. Sulawesi Selatan.png',
            'SULAWESI TENGGARA': '/images/provinces/30. Sulawesi Tenggara.png',
            'MALUKU UTARA': '/images/provinces/31. Maluku Utara.png',
            MALUKU: '/images/provinces/32. Maluku.png',
            'PAPUA BARAT': '/images/provinces/33. Papua Barat.png',
            PAPUA: '/images/provinces/34. Papua.png',
        }

        try {
            const response = await axios.get(
                'https://data.covid19.go.id/public/api/prov.json'
            )
            response.data.list_data = response.data.list_data.map(
                (item, index) => {
                    return {
                        ...item,
                        province_images: provinceImages[item.key],
                    }
                }
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },

    statsByDaily: async (req, res) => {
        try {
            const response = await axios.get(
                'https://data.covid19.go.id/public/api/update.json'
            )
            return res.json(response.data)
        } catch (error) {
            console.log(error)
            return res.send(error.response.data)
        }
    },
}
