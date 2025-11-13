import { commentsData, getCommentById, updateCommentLikes } from './data.js'
import { escapeHtml } from './util.js'
import { commentsList, cancelReplyButton } from './dom-elements.js'
import { quoteComment } from './events.js'

export function renderComments() {
    const safeComments = commentsData || []

    commentsList.innerHTML = safeComments
        .map(
            (comment) => `
        <li class="comment" data-id="${comment.id}">
            <div class="comment-header">
                <div>${escapeHtml(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${escapeHtml(comment.text)}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                </div>
            </div>
        </li>
        `,
        )
        .join('')

    setupCommentEventListeners()
}

function setupCommentEventListeners() {
    document.querySelectorAll('.comment').forEach((commentElement) => {
        commentElement.addEventListener('click', function (e) {
            if (e.target.closest('.like-button')) {
                return
            }

            const commentId = parseInt(this.dataset.id)
            const comment = getCommentById(commentId)
            quoteComment(comment)
        })
    })

    document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', function (e) {
            e.stopPropagation()

            const commentId = parseInt(this.closest('.comment').dataset.id)
            const comment = getCommentById(commentId)

            if (comment.isLiked) {
                updateCommentLikes(commentId, comment.likes - 1, false)
            } else {
                updateCommentLikes(commentId, comment.likes + 1, true)
            }

            renderComments()
        })
    })
}

export function showCancelReplyButton() {
    cancelReplyButton.style.display = 'inline-block'
}

export function hideCancelReplyButton() {
    cancelReplyButton.style.display = 'none'
}
