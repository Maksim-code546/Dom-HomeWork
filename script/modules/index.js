import { commentsData } from './data.js'

import { formatDate, escapeHtml } from './util.js'
import { renderComments } from './render.js'
import { setupEventListeners, addComment, cancelReply } from './events.js'

fetch('https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })

export {
    commentsData,
    formatDate,
    escapeHtml,
    renderComments,
    addComment,
    cancelReply,
}

document.addEventListener('DOMContentLoaded', function () {
    renderComments()
    setupEventListeners()
})
