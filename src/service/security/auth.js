import api from '../api.js'
import headers from './header.js';

export const logIn = (response) => {
        localStorage.setItem('auth', JSON.stringify(response))        
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

export function currentUser () {
    api
    .get("api/currentUser", {headers: headers()})
    .then(response => localStorage.setItem('user', JSON.stringify(response.data)))
    .catch(function (error) {
        console.log(error);
    });
}
