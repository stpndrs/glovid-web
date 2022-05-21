import { getBeritaTerkini } from './fetch/news'
import moment from 'moment'

const newsListCtx = document.querySelector('.api-news-page-list')
/**
 * @type {HTMLElement}
 */
const newsListLoadingCtx = document.querySelector('.loading')
let newsLoading = false
let newsPage = 1
let newsTotalPages = 1
let newsLimit = 9

export const onMount = () => {
    newsListCtx.innerHTML = ''
    refreshNewsPage()
    document.addEventListener('scroll', onNewsScroll)

    /**
     * @type {HTMLElement}
     */
    const searchInput = document.querySelector('.api-news-page-search')

    let searchInputPollID = -1
    searchInput.addEventListener('input', (e) => {
        let previousKeyword = ''
        if (searchInputPollID < 0) {
            let leaveCounter = 0
            searchInputPollID = setInterval(() => {
                let searchKeyword = searchInput.value
                if (searchKeyword != previousKeyword) {
                    newsListCtx.innerHTML = ''
                    newsPage = 1
                    refreshNewsPage(searchKeyword)
                    previousKeyword = searchKeyword
                } else {
                    leaveCounter++
                }
                console.log(`Tick ${leaveCounter}`)
                if (leaveCounter >= 6) {
                    clearInterval(searchInputPollID)
                    searchInputPollID = -1
                }
            }, 500)
        }
        if (e.target.value == '') {
            newsListCtx.innerHTML = ''
            newsPage = 1
            refreshNewsPage()
        }
    })
}

export const onNewsScroll = (e) => {
    let offsetBottom =
        parseInt(document.body.scrollHeight) - parseInt(window.scrollY)

    if (offsetBottom <= 1400) {
        if (!newsLoading) {
            newsPage++
            if (newsPage > newsTotalPages) {
                hideLoading()
                return
            }
            showLoading()
            setTimeout(() => {
                refreshNewsPage()
            }, 500)
        }
    }
}

export const refreshNewsPage = async (search = false) => {
    try {
        showLoading()
        const response = await getBeritaTerkini(
            newsPage,
            newsLimit,
            false,
            search
        )
        newsTotalPages = response.pagination.total_pages
        const fragment = document.createDocumentFragment()
        response.data.forEach((item, index) => {
            const divItem = document.createElement('div')
            divItem.classList.add('mb-3', 'col-lg-4', 'col-md-6')
            divItem.innerHTML = `
                <div class="card">
                    <div class="img skeleton">
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
            `
            fragment.appendChild(divItem)
        })
        newsListCtx.appendChild(fragment)
        hideLoading()
    } catch (error) {
        console.error(error)
    }
}

const showLoading = () => {
    newsLoading = true
    newsListLoadingCtx.style.display = 'flex'
}

const hideLoading = () => {
    newsLoading = false
    newsListLoadingCtx.style.display = 'none'
}
