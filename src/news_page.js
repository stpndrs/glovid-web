import { getBeritaTerkini } from './fetch/news'
import moment from 'moment'

const newsListCtx = document.querySelector('.api-news-page-list')
var newsList = []

export const refreshNewsPage = async (newsListFiltered = false) => {
    if (newsList.length <= 0) {
        try {
            const response = await getBeritaTerkini()
            newsList = response.data.items
        } catch (error) {
            console.error(error)
        }
    }
    let newsListDisplay = newsList
    if (newsListFiltered) newsListDisplay = newsListFiltered

    let content = ``
    newsListDisplay.forEach((item, index) => {
        content += `
            <div class="mb-3 col-lg-4 col-md-6">
                <div class="card">
                    <div class="img">
                        <img src="${item.enclosure.url}">
                    </div>
                    <div class="container my-3">
                        <p class="text-sm date">${moment(item.pubDate).format(
                            'DD MMMM YYYY'
                        )}</p>
                        <h4 class="font-bold title">
                            ${item.title}
                        </h4>
                        <p class="content">
                            ${item.contentSnippet.substr(0, 200)} ...
                        </p>
                        <br />
                        <a href="${item.link}" class="btn">Selengkapnya</a>
                    </div>
                </div>
            </div>
        `
    })
    newsListCtx.innerHTML = content
}

const searchInput = document.querySelector('.api-news-page-search')
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        let newsListFiltered = newsList.filter((item, index) => {
            return item.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        })
        refreshNewsPage(newsListFiltered)
    })
}
