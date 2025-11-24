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

let savedName = ''
let savedComment = ''

nameInput.addEventListener('input', function () {
    savedName = this.value
})

commentInput.addEventListener('input', function () {
    savedComment = this.value
})

function restoreFormData() {
    nameInput.value = savedName
    commentInput.value = savedComment
}

export function addComment() {
    const name = nameInput.value.trim()
    let commentText = commentInput.value.trim()

    if (name.length < 3 || commentText.length < 3) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        return
    }

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

    fetch('https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: commentText,
            forceError: true,
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
            updateCommentData(data.comments)
            renderComments()

            nameInput.value = ''
            commentInput.value = ''
            cancelReply()

            addForm.style.display = 'block'
            addingMessage.style.display = 'none'
            addButton.disabled = false
        })
        .catch((error) => {
            console.error('Ошибка:', error)

            restoreFormData()

            if (error.message === 'SERVER_ERROR') {
                alert('Сервер сломался, попробуй позже')
            } else if (
                error.message === 'NETWORK_ERROR' ||
                error.message.includes('Failed to fetch')
            ) {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            } else if (error.message === 'BAD_REQUEST') {
                alert('Некорректный запрос')
            } else {
                alert('Произошла ошибка, попробуйте позже')
            }

            addForm.style.display = 'block'
            addingMessage.style.display = 'none'
            addButton.disabled = false
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
