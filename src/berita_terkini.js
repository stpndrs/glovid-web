import moment from 'moment'
import { getBeritaTerkini } from './fetch/news'

export const refreshBeritaTerkini = async () => {
    const newsBeritaTerkini = document.querySelector('.api-berita-terkini')
    const response = await getBeritaTerkini(1, 6, 5)

    let contentBeritaTerkini = ``
    response.data.forEach((item, index) => {
        contentBeritaTerkini += `<div class="col-lg col-md-6 mb-4">
            <div class="card">
                <div class="img">
                    <img src="${item.enclosure.url}" alt="">
                </div>
                <div class="container my-3">
                    <p class="text-sm date">
                        ${moment(item.pubDate).format('DD MMMM YYYY')}
                    </p>
                    <h4 class="font-bold title">
                        ${item.title}
                    </h4>
                    <p class="content">
                        ${item.contentSnippet.substr(0, 200)} . . .
                    </p>
                    <br />
                    <a target="_blank" href="${
                        item.link
                    }" class="btn">Selengkapnya</a>
                </div>
            </div>
        </div>`
    })
    newsBeritaTerkini.innerHTML = contentBeritaTerkini
}
