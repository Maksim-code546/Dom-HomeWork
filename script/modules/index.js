import { commentsData, updateCommentData } from './data.js'
import { renderComments } from './render.js'
import { setupEventListeners } from './events.js'
import { getComments } from './api.js'

function loadComments() {
    return getComments().then((data) => {
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

export { commentsData, renderComments }
