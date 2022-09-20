import api from '../api.js'

export function logIn (response) {
        const auth = response.data;
        localStorage.setItem('auth', JSON.stringify(auth))
        api.defaults.headers.common.authorization = `Bearer ${auth.access_token}`        
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
