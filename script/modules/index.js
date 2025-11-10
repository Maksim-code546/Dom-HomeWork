import { commentsData } from './data.js'

import { formatDate, escapeHtml } from './util.js'
import { renderComments } from './render.js'
import { setupEventListeners, addComment, cancelReply } from './events.js'

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
