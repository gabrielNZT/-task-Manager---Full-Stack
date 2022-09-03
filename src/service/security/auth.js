import api from '../api.js'

export const logIn = (response) => {
        localStorage.setItem('auth', JSON.stringify(response))
        console.log(response.data.access_token)
}

export const logOut = () => {
    localStorage.removeItem('auth');
}

export const refreshToken = () => {
    return api
    .post('/oauth/access_token', {
        grant_type: 'refresh_token',
        refresh_token: JSON.parse(localStorage.auth).refresh_token
    })
    .then(response => localStorage.auth = JSON.stringify(response))
    .catch(() => {throw new Error("failed to refresh")});
}
