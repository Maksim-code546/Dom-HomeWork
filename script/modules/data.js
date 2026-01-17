import { formatDate } from './util.js'
import { authManager } from './auth.js'

export let commentsData = []

export const updateCommentData = (newComments) => {
    commentsData =
        newComments?.map((comment) => ({
            id: comment?.id || Date.now() + Math.random(),
            name: comment?.author?.name || 'Аноним',
            date: formatDate(new Date(comment?.date)),
            text: comment?.text || '',
            likes: comment?.likes || 0,
            isLiked: comment?.isLiked || false,
            parentId: comment?.parentId || null,
        })) || []
}

export const isAuthenticated = () => authManager.isAuthenticated()

export const getUserName = () => authManager.getUserName()

export let replyingTo = null

export const getCommentById = (id) =>
    commentsData.find((comment) => comment.id === id)

export const addCommentToData = (comment) => {
    commentsData.push(comment)
}

export const updateCommentLikes = (commentId, newLikes, newIsLiked) => {
    const comment = getCommentById(commentId)
    if (comment) {
        comment.likes = newLikes
        comment.isLiked = newIsLiked
    }
}

export const setReplyingTo = (commentId) => {
    replyingTo = commentId
}

export const clearReplyingTo = () => {
    replyingTo = null
}

export const nameInput = document.getElementById('name-input')
export const addButton = document.getElementById('add-button')
export const commentInput = document.getElementById('comment-input')
export const commentsList = document.getElementById('comments-list')
export const cancelReplyButton = document.getElementById('cancel-reply')

export const loginScreen = document.getElementById('login-screen')
export const commentsScreen = document.getElementById('comments-screen')
export const loginLinkContainer = document.getElementById(
    'login-link-container',
)
export const loginLink = document.getElementById('login-link')
export const loginInput = document.getElementById('login-input')
export const passwordInput = document.getElementById('password-input')
export const loginButton = document.getElementById('login-button')
export const backToCommentsButton = document.getElementById('back-to-comments')
export const loginError = document.getElementById('login-error')
