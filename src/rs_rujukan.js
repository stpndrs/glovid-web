import { getRujukanRS } from './fetch/references'
import L from 'leaflet'

const rujukanRSCtx = document.querySelector('.api-rujukan-rs') || false
const searchRSCtx = document.querySelector('.api-search-input') || false

/**
 * @type {HTMLElement}
 */
const loadingCtx = document.querySelector('.loading')
let page = 1
let loading = true
let search = false
let loadedItemCount = 0

export const onMount = () => {
    document.addEventListener('scroll', function (event) {
        if (!search) {
            let offsetBottom =
                parseInt(document.body.scrollHeight) - parseInt(window.scrollY)
            if (offsetBottom <= 1500) {
                if (!loading) {
                    loading = true
                    setTimeout(() => {
                        console.log('loading...')
                        page++
                        refreshRujukanRS()
                    }, 250)
                } else {
                    console.log('still loading')
                }
            }
        }
    })

    searchRSCtx.addEventListener('input', (e) => {
        let value = e.target.value
        loading = true
        if (value) {
            search = true
            loadingCtx.style.visibility = 'hidden'

            refreshRujukanRS(value)
        } else {
            loadingCtx.style.visibility = 'visible'
            search = false
            rujukanRSCtx.innerHTML = ''
            refreshRujukanRS()
        }
    })
}

export const refreshRujukanRS = async (search = false) => {
    const limit = 9
    const data = await getRujukanRS(page, limit, search)

    if (search) rujukanRSCtx.innerHTML = ''

    let fragment = document.createDocumentFragment()
    data.data.forEach((item, index) => {
        let div = document.createElement('div')
        div.classList.add('mb-3', 'col-lg')
        div.innerHTML = `
                <div class="card">
                    <div
                        id="map-id-${index + loadedItemCount}"
                        style="width: 100%; height: 200px; overflow: hidden"
                    ></div>
                    <div class="container my-3">
                        <h4 class="font-bold title">${item.nama}</h4>
                        <p class="alamat">
                            ${item.alamat}
                        </p>
                        <p class="notlp">${item.telepon}</p>
                        <p class="tipe">Tipe : ${item.tipe}</p>
                        <p class="tempat-tidur">
                            Sisa Tempat Tidur: <b>${
                                item.tempat_tidur
                            }</b> Tempat Tidur
                        </p>
                    </div>
                </div>
            `
        fragment.appendChild(div)
    })
    rujukanRSCtx.appendChild(fragment)
    loading = false

    // init maps

    data.data.forEach((item, index) => {
        let map = L.map(`map-id-${index + loadedItemCount}`).setView(
            [item.lokasi.lat, item.lokasi.lon],
            15
        )

        const tiles = L.tileLayer(
            'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
            {
                maxZoom: 18,
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
            }
        ).addTo(map)
        var marker = L.marker([item.lokasi.lat, item.lokasi.lon])
            .addTo(map)
            .bindPopup(`<b>${item.nama}</b><br />${item.alamat}`)
        var circle = L.circle([item.lokasi.lat, item.lokasi.lon], {
            color: 'blue',
            fillColor: '#0000FF',
            fillOpacity: 0.2,
            radius: 50,
            weight: 1,
        }).addTo(map)
    })
    loadedItemCount += limit
}
