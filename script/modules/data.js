export let commentsData = []

export const updateCommentData = (newComments) => {
    commentsData = newComments
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
