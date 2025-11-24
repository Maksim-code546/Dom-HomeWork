import { commentsData, updateCommentData } from './data.js'
import { formatDate, escapeHtml } from './util.js'
import { renderComments } from './render.js'
import { setupEventListeners, addComment, cancelReply } from './events.js'

function loadComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments')
        .then((response) => {
            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error('SERVER_ERROR')
                } else {
                    throw new Error('NETWORK_ERROR')
                }
            }
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

            if (error.message === 'SERVER_ERROR') {
                loadingMessage.textContent = 'Сервер сломался, попробуй позже'
            } else {
                loadingMessage.textContent =
                    'Кажется, у вас сломался интернет, попробуйте позже'
            }

            setTimeout(() => {
                loadingMessage.textContent = 'Комментарии загружаются...'
                loadComments().then(() => {
                    loadingMessage.style.display = 'none'
                    setupEventListeners()
                })
            }, 3000)
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
