const API_BASE_URL = 'https://wedev-api.sky.pro/api/v2/Maksim-Zubov/comments'
const LOGIN_API_URL = 'https://wedev-api.sky.pro/api/user/login'

// Функция для авторизации
export function loginUser({ login, password }) {
    return fetch(LOGIN_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('INVALID_CREDENTIALS')
            } else if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            } else {
                throw new Error('NETWORK_ERROR')
            }
        }
        return response.json()
    })
}

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

export function createComment({ text, token }) {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text,
        }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('VALIDATION_ERROR')
            } else if (response.status === 401) {
                throw new Error('UNAUTHORIZED')
            } else if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            } else {
                throw new Error('NETWORK_ERROR')
            }
        }
        return response.json()
    })
}

export function getUser(token) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('UNAUTHORIZED')
            } else if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            } else {
                throw new Error('NETWORK_ERROR')
            }
        }
        return response.json()
    })
}
