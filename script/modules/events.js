import {
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

    commentText = escapeHtml(commentText)

    const newComment = {
        id: Date.now(),
        name: name,
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
