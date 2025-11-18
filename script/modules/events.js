import {
    updateCommentData,
    addCommentToData,
    replyingTo,
    setReplyingTo,
    clearReplyingTo,
} from './data.js'
import {
    nameInput,
    addButton,
    commentInput,
    cancelReplyButton,
} from './dom-elements.js'
import { formatDate, escapeHtml, validateInput } from './util.js'
import {
    renderComments,
    showCancelReplyButton,
    hideCancelReplyButton,
} from './render.js'

export function addComment() {
    const name = nameInput.value.trim()
    let commentText = commentInput.value.trim()

    if (!validateInput(name, commentText)) {
        alert('Пожалуйста заполните, все поля')
        return
    }

    const addForm = document.getElementById('add-form')
    const addingMessage = document.getElementById('adding-message')
    const addButton = document.getElementById('add-button')

    addForm.style.display = 'none'
    addingMessage.style.display = 'block'
    addButton.disabled = true

    commentText = escapeHtml(commentText)

    const newComment = {
        id: Date.now(),
        name: escapeHtml(name),
        date: formatDate(new Date()),
        text: commentText,
        likes: 0,
        isLiked: false,
        parentId: replyingTo,
    }

    addCommentToData(newComment)
    renderComments()

    nameInput.value = ''
    commentInput.value = ''
    cancelReply()

    fetch('https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: commentText,
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('Комментарий добавлен на сервер:', data)
            return fetch(
                'https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments',
            )
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            updateCommentData(data.comments)
            renderComments()
        })
}

export function cancelReply() {
    commentInput.value = ''
    clearReplyingTo()
    hideCancelReplyButton()
}

export function quoteComment(comment) {
    const quotedText = `> ${comment.text}\n\n@${comment.name}, `
    commentInput.value = quotedText
    commentInput.focus()
    setReplyingTo(comment.id)
    showCancelReplyButton()
}

export function setupEventListeners() {
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
}
