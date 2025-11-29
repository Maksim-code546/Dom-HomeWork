const API_BASE_URL = 'https://wedev-api.sky.pro/api/v1/Maksim-Zubov/comments'

export function getComments() {
    return fetch(API_BASE_URL).then((response) => {
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            } else {
                throw new Error('NETWORK_ERROR')
            }
        }
        return response.json()
    })
}

export function createComment({ name, text, forceError = false }) {
    return fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: forceError,
        }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('VALIDATION_ERROR')
            } else if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            } else {
                throw new Error('NETWORK_ERROR')
            }
        }
        return response.json()
    })
}
