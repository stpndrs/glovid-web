import L from 'leaflet'
import { statsByProvinsi } from './fetch/statistics'

export const initMap = async () => {
    // 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsZGFuaWUxMiIsImEiOiJjbDNhMHVxNG4wMTFvM2NsejFqb2lpNzIxIn0.7TsUzT4wb_VofZPu-KecPw',
    let map = L.map('map-sebaran').setView([-2, 118], 5.49)

    const tiles = L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
            maxZoom: 18,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'wildanie12/cl3a1cmzw000b14sbmtk3ibp8',
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(map)

    const data = await statsByProvinsi()
    data.list_data.forEach((item, index) => {
        L.circle([item.lokasi.lat, item.lokasi.lon], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: ((item.jumlah_dirawat / 1030) * 5 + 30 / 30) * 25000,
        })
            .addTo(map)
            .bindPopup(
                `
                    <div style='border-bottom: 1px solid #b1b1b1; margin-bottom: 8px'><strong>${
                        item.key
                    }</strong> <br/></div>
                    dirawat: ${item.jumlah_dirawat.toLocaleString()} orang <br/>
                    sembuh: ${item.jumlah_sembuh.toLocaleString()} orang <br/>
                    meninggal: ${item.jumlah_meninggal.toLocaleString()} orang <br/>
                `
            )

        console.log((item.jumlah_dirawat / 1030) * 100 + 30)
    })
}
