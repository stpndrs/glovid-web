import { CountUp } from 'countup.js'
import moment from 'moment'
import { statsIndonesia } from './fetch/stats_indonesia'
import { statsGlobal } from './fetch/stats_global'
import { getVaksinasi } from './fetch/vaksinasi'

export const refreshSebaranGlobal = async () => {
    const globalNegara = new CountUp('api-sebaran-global-negara', 0, {
        duration: 3,
    })
    const globalMeninggal = new CountUp('api-sebaran-global-meninggal', 0, {
        duration: 3,
    })
    const globalTerkonfirmasi = new CountUp(
        'api-sebaran-global-terkonfirmasi',
        0,
        { duration: 3 }
    )
    const globalTest = new CountUp('api-sebaran-global-test', 0, {
        duration: 3,
    })
    const globalPopulasi = new CountUp('api-sebaran-global-populasi', 0, {
        duration: 3,
    })
    const globalSembuh = new CountUp('api-sebaran-global-sembuh', 0, {
        duration: 3,
    })
    globalNegara.start()
    globalMeninggal.start()
    globalTerkonfirmasi.start()
    globalTest.start()
    globalPopulasi.start()
    globalSembuh.start()
    try {
        const data = await statsGlobal()
        globalTerkonfirmasi.update(data.cases)
        globalMeninggal.update(data.deaths)
        globalNegara.update(data.affectedCountries)
        globalTest.update(data.tests)
        globalPopulasi.update(data.population)
        globalSembuh.update(data.recovered)
    } catch (error) {
        console.log(error)
    }
}

export const refreshSebaranIndonesia = async () => {
    const indoPositif = new CountUp('api-sebaran-indonesia-positif', 0, {
        duration: 3,
    })
    const indoSembuh = new CountUp('api-sebaran-indonesia-sembuh', 0, {
        duration: 3,
    })
    const indoMeninggal = new CountUp('api-sebaran-indonesia-meninggal', 0, {
        duration: 3,
    })
    const indoTest = new CountUp('api-sebaran-indonesia-test', 0, {
        duration: 3,
    })
    const indoPopulasi = new CountUp('api-sebaran-indonesia-populasi', 0, {
        duration: 3,
    })
    const indoKritis = new CountUp('api-sebaran-indonesia-kritis', 0, {
        duration: 3,
    })
    const updateTerakhir = document.querySelector(
        '.api-sebaran-update_terakhir'
    )
    indoPositif.start()
    indoSembuh.start()
    indoMeninggal.start()
    indoTest.start()
    indoPopulasi.start()
    indoKritis.start()

    try {
        const data = await statsIndonesia()
        indoPositif.update(data.cases)
        indoSembuh.update(data.recovered)
        indoMeninggal.update(data.deaths)
        indoTest.update(data.tests)
        indoPopulasi.update(data.population)
        indoKritis.update(data.critical)
        updateTerakhir.innerHTML = moment(data.updated).format('DD MMMM YYYY')
        updateTerakhir.classList.remove('skeleton')
        updateTerakhir.classList.remove('skeleton-text')
    } catch (error) {
        console.log(error)
    }
}

export const refreshSebaranPageIndonesia = async () => {
    const indoTerkonfirmasi = new CountUp(
        'api-sebaran-indonesia-terkonfirmasi',
        0,
        {
            duration: 3,
        }
    )
    const indoDirawat = new CountUp('api-sebaran-indonesia-dirawat', 0, {
        duration: 3,
    })
    const indoSembuh = new CountUp('api-sebaran-indonesia-sembuh', 0, {
        duration: 3,
    })
    const indoMeninggal = new CountUp('api-sebaran-indonesia-meninggal', 0, {
        duration: 3,
    })

    const indoTest = new CountUp('api-sebaran-indonesia-test', 0, {
        duration: 3,
    })
    const indoPopulasi = new CountUp('api-sebaran-indonesia-populasi', 0, {
        duration: 3,
    })
    const indoKritis = new CountUp('api-sebaran-indonesia-kritis', 0, {
        duration: 3,
    })
    const updateTerakhir = document.querySelector(
        '.api-sebaran-update_terakhir'
    )
    indoTerkonfirmasi.start()
    indoSembuh.start()
    indoDirawat.start()
    indoMeninggal.start()
    indoTest.start()
    indoPopulasi.start()
    indoKritis.start()

    try {
        const data = await statsIndonesia()
        indoTerkonfirmasi.update(data.cases)
        indoSembuh.update(data.recovered)
        indoDirawat.update(data.active)
        indoMeninggal.update(data.deaths)
        indoTest.update(data.tests)
        indoPopulasi.update(data.population)
        indoKritis.update(data.critical)
        updateTerakhir.innerHTML = moment(data.updated).format('DD MMMM YYYY')
        updateTerakhir.classList.remove('skeleton')
        updateTerakhir.classList.remove('skeleton-text')
    } catch (error) {
        console.log(error)
    }
}

export const refreshVaksinasi = async () => {
    try {
        const data = await getVaksinasi()
        const vaksinasi1 = new CountUp(
            'api-sebaran-vaksinasi-1',
            data.total.jumlah_vaksinasi_1,
            {
                duration: 3,
            }
        )
        const vaksinasi2 = new CountUp(
            'api-sebaran-vaksinasi-2',
            data.total.jumlah_vaksinasi_2,
            {
                duration: 3,
            }
        )
        vaksinasi1.start()
        vaksinasi2.start()
    } catch (error) {
        console.error(error)
    }
}
