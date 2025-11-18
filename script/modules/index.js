import { commentsData, updateCommentData } from './data.js'

import { formatDate, escapeHtml } from './util.js'
import { renderComments } from './render.js'
import { setupEventListeners, addComment, cancelReply } from './events.js'

function loadComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateCommentData(data.comments)
            renderComments()
        })
}

document.addEventListener('DOMContentLoaded', function () {
    const loadingMessage = document.getElementById('loading-message')

    loadingMessage.style.display = 'block'

    loadComments()
        .then(() => {
            loadingMessage.style.display = 'none'
            setupEventListeners()
        })
        .catch((error) => {
            console.error('Ошибка:', error)
            loadingMessage.textContent = 'Ошибка загрузки комментариев'
        })
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
