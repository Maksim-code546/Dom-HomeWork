import { formatDate } from './util.js'

export let commentsData = []

export const updateCommentData = (newComments) => {
    commentsData = newComments.map((comment) => ({
        id: comment.id,
        name: comment.author?.name || 'Аноним',
        date: formatDate(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes || 0,
        isLiked: comment.isLiked || false,
        parentId: comment.parentId || null,
    }))
}

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
