import moment from 'moment'
import { getBeritaTerkini } from './fetch/news'

export const refreshBeritaTerkini = async () => {
    const newsBeritaTerkini = document.querySelector('.api-berita-terkini')
    const response = await getBeritaTerkini()
    const limit = 4
    if (response.data.items.length < 5) limit = data.length

    let contentBeritaTerkini = ``
    for (let i = 0; i < limit; i++) {
        contentBeritaTerkini += `<div class="col-lg col-md-6 mb-4">
            <div class="card">
                <div class="img">
                    <img src="${response.data.items[i].enclosure.url}" alt="">
                </div>
                <div class="container my-3">
                    <p class="text-sm date">
                        ${moment(response.data.items[i].pubDate).format(
                            'DD MMMM YYYY'
                        )}
                    </p>
                    <h4 class="font-bold title">
                        ${response.data.items[i].title}
                    </h4>
                    <p class="content">
                        ${response.data.items[i].contentSnippet.substr(
                            0,
                            200
                        )} . . .
                    </p>
                    <br />
                    <a target="_blank" href="${
                        response.data.items[i].link
                    }" class="btn">Selengkapnya</a>
                </div>
            </div>
        </div>`
    }
    newsBeritaTerkini.innerHTML = contentBeritaTerkini
}
