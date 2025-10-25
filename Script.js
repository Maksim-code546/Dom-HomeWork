'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const commentsData = [
        {
            id: 1,
            name: 'Глеб Фокин',
            date: '12.02.22 12:18',
            text: 'Это будет первый комментарий на этой странице',
            likes: 3,
            isLiked: false,
        },
        {
            id: 2,
            name: 'Варвара Н.',
            date: '13.02.22 19:22',
            text: 'Мне нравится как оформлена эта страница! ❤',
            likes: 75,
            isLiked: true,
        },
    ]

    const nameInput = document.getElementById('name-input')
    const addButton = document.getElementById('add-button')
    const commentInput = document.getElementById('comment-input')
    const commentsList = document.getElementById('comments-list')
    const cancelReplyButton = document.getElementById('cancel-reply')

    let replyingTo = null

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = String(date.getFullYear()).slice(-2)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${day}.${month}.${year} ${hours}:${minutes}`
    }

    function escapeHtml(unsafe) {
        if (!unsafe) return ''
        return unsafe
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;')
    }

    function quoteComment(comment) {
        const quotedText = `> ${comment.text}\n\n@${comment.name}, `
        commentInput.value = quotedText
        commentInput.focus()
        replyingTo = comment.id
        cancelReplyButton.style.display = 'inline-block'
    }

    function cancelReply() {
        commentInput.value = ''
        replyingTo = null
        cancelReplyButton.style.display = 'none'
    }

    function renderComments() {
        commentsList.innerHTML = commentsData
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

        document.querySelectorAll('.comment').forEach((commentElement) => {
            commentElement.addEventListener('click', function (e) {
                if (e.target.closest('.like-button')) {
                    return
                }

                const commentId = parseInt(this.dataset.id)
                const comment = commentsData.find((c) => c.id === commentId)
                quoteComment(comment)
            })
        })

        document.querySelectorAll('.like-button').forEach((button) => {
            button.addEventListener('click', function (e) {
                e.stopPropagation()

                const commentId = parseInt(this.closest('.comment').dataset.id)
                const comment = commentsData.find((c) => c.id === commentId)

                if (comment.isLiked) {
                    comment.likes--
                    comment.isLiked = false
                } else {
                    comment.likes++
                    comment.isLiked = true
                }

                renderComments()
            })
        })
    }

    function addComment() {
        const name = nameInput.value.trim()
        let commentText = commentInput.value.trim()

        if (!name || !commentText) {
            alert('Пожалуйста заполните, все поля')
            return
        }

        commentText = escapeHtml(commentText)

        const newComment = {
            id: Date.now(),
            name: name,
            date: formatDate(new Date()),
            text: commentText,
            likes: 0,
            isLiked: false,
            parentId: replyingTo
        }

        commentsData.push(newComment)
        renderComments()

        nameInput.value = ''
        commentInput.value = ''
        cancelReply()
    }

    addButton.addEventListener('click', addComment)
    cancelReplyButton.addEventListener('click', cancelReply)

    nameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addComment()
    })

    commentInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            addComment()
        }
    })

    renderComments()
})

console.log('It works!')
