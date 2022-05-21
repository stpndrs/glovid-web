import { CountUp } from 'countup.js'
import { BASE_URL } from './constant'
import { statsByProvinsi } from './fetch/statistics'

const listProvinceCtx = document.querySelector('.api-list-province') || false
const provinceItem = []

export const onMount = () => {
    const search = document.querySelector('.api-search')
    search.addEventListener('input', (e) => {
        const searchKeyword = e.target.value
        const provinceItemDisplay = provinceItem.filter((item, index) => {
            return item.key.toLowerCase().includes(searchKeyword.toLowerCase())
        })
        renderProvinsi(provinceItemDisplay)
    })
}

export const refreshProvinsi = async () => {
    try {
        const data = await statsByProvinsi()

        const fragment = document.createDocumentFragment()
        data.list_data.forEach((item, index) => {
            const divItem = document.createElement('div')
            divItem.innerHTML = `
                <div class="mb-3 card">
                    <div class="row align-items-stretch">
                        <div
                            class="text-center col-sm-12 col-lg-3 col-md-3 col-12 d-flex justify-content-center align-items-center flex-rows flex-md-column"
                        >
                            <img
                                src="${BASE_URL}${item.province_images}"
                                alt=""
                                style="max-height: 144px"
                            />
                            <h5
                                class="mt-3 mb-0 text-center ms-4 ms-md-0 fw-bold"
                            >
                                ${item.key}
                            </h5>
                        </div>
                        <div class="col-sm-12 col-lg-9 col-md-9 col-12">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-6">
                                    <div class="card-3">
                                        <img
                                            src="./icon/user-plus.svg"
                                            alt=""
                                        />
                                        <div class="covid-data">
                                            <h2 id='api-terkonfirmasi-${index}'>0</h2>
                                            <p>Terkonfirmasi</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-6">
                                    <div class="card-3">
                                        <img
                                            src="./icon/user-check.svg"
                                            alt=""
                                        />
                                        <div class="covid-data">
                                            <h2 id='api-dirawat-${index}'>0</h2>
                                            <p>Dirawat</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-6">
                                    <div class="card-3">
                                        <img
                                            src="./icon/user-minus.svg"
                                            alt=""
                                        />
                                        <div class="covid-data">
                                            <h2 id='api-sembuh-${index}'>0</h2>
                                            <p>Sembuh</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-6">
                                    <div class="card-3">
                                        <img src="./icon/user-x.svg" alt="" />
                                        <div class="covid-data">
                                            <h2 id='api-meninggal-${index}'2>0</h2>
                                            <p>Meninggal Dunia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            fragment.appendChild(divItem)
            provinceItem.push({
                key: item.key,
                element: divItem,
                countTerkonfirmasi: item.jumlah_kasus,
                countDirawat: item.jumlah_dirawat,
                countSembuh: item.jumlah_sembuh,
                countMeninggal: item.jumlah_meninggal,
            })
        })
        renderProvinsi(provinceItem)
    } catch (error) {
        console.error(error)
    }
}

const renderProvinsi = (provinceItem) => {
    listProvinceCtx.innerHTML = ''
    provinceItem.forEach((item, index) => {
        listProvinceCtx.appendChild(item.element)
        const countTerkonfirmasi = new CountUp(
            `api-terkonfirmasi-${index}`,
            item.countTerkonfirmasi,
            { duration: 3 }
        )
        const countDirawat = new CountUp(
            `api-dirawat-${index}`,
            item.countDirawat,
            { duration: 3 }
        )
        const countSembuh = new CountUp(
            `api-sembuh-${index}`,
            item.countSembuh,
            { duration: 3 }
        )
        const countMeninggal = new CountUp(
            `api-meninggal-${index}`,
            item.countMeninggal,
            { duration: 3 }
        )
        countTerkonfirmasi.start()
        countDirawat.start()
        countSembuh.start()
        countMeninggal.start()
    })
}
