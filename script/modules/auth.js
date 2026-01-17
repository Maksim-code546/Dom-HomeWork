export class AuthManager {
    constructor() {
        this.token = localStorage.getItem('token')
        this.user = JSON.parse(localStorage.getItem('user') || 'null')
    }

    isAuthenticated() {
        return !!this.token && !!this.user
    }

    async login(login, password) {
        try {
            const response = await fetch(
                'https://wedev-api.sky.pro/api/user/login',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        login,
                        password,
                    }),
                },
            )

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Ошибка авторизации')
            }

            const data = await response.json()

            const userResponse = await fetch(
                'https://wedev-api.sky.pro/api/user',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${data.user.token}`,
                    },
                },
            )

            if (!userResponse.ok) {
                throw new Error('Ошибка получения данных пользователя')
            }

            const userData = await userResponse.json()

            this.token = data.user.token
            this.user = userData.user

            localStorage.setItem('token', this.token)
            localStorage.setItem('user', JSON.stringify(this.user))

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }

    logout() {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    getToken() {
        return this.token
    }

    getUser() {
        return this.user
    }

    getUserName() {
        return this.user ? this.user.name : ''
    }
}

export const authManager = new AuthManager()
