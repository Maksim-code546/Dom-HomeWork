export let commentsData = [
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
