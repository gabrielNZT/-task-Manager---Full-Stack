import api from './api.js'
import axios from "axios";
import { logIn } from "./security/auth";
import Notify from '../dashboard/modal/notification/error.js';

export const handleReceiveEmail = (userID, receiveEmail) => {
    api
        .put("/api/user/" + userID, {
            receiveEmail: receiveEmail
        })
        .then()
}

export const postCard = (card) => {
    return api
        .post("/api/tarefa", {
            header: card.header,
            description: card.description,
            position: card.position,
            grupo: card.group,
            user: card.user
        })
        .then()
}

export const updateCard = (card) => {
    return api
        .put("/api/tarefa/" + card.id, {
            header: card.header,
            description: card.description,
            user: card.user
        })
        .then()
}

export const deleteCard = (cardID) => {
    return api
        .delete("/api/tarefa/" + cardID)
        .then()
}

export const moveCard = (card) => {
    return api
        .put("/api/moveCard/" + card.id, {
            header: card.header,
            description: card.description,
            position: card.position,
            grupo: card.group
        })
        .then()
}

export const getGroups = () => {
    return api
        .get("/api/grupo")
        .then()
        .catch(function (error) {
            console.log(error)
        })
}

export const updateGroupTitle = (groupID, newTitle) => {
    return api
        .put("/api/grupo/" + groupID, {
            header: newTitle
        })
        .then()
}

export const postGroup = (group) => {
    return api
        .post("/api/grupo", {
            header: group.header,
            position: group.position,
            cards: []
        })
        .then()
}

export const deleteGroup = (groupID) => {
    return api
        .delete("/api/grupo/" + groupID)
        .then()
        .catch(function (error) {
            console.log(error)
        })
}

export const login = (user) => {
    return axios
        .post("http://localhost:8080/api/login", user)
        .then(response => logIn(response))
        .catch(() => Notify('LOGIN_ERROR'))
}

export const getUsers = (tableParams) => {
    const pagination = tableParams.pagination;
    return api
        .get(`/api/user?current=${pagination.current}&pageSize=${pagination.pageSize}`)
        .then()
}

export const updateUser = (user) => {
    return api
        .put("/api/user/" + user.id, {
            username: user.username,
            email: user.email,
            adm: user.adm,
            enabled: user.enabled
        })
        .then()
}

export const postUser = (user) => {
    return axios
        .post("http://localhost:8080/api/user", {
            username: user.username,
            email: user.email,
            password: user.password,
            adm: user.adm,
            enabled: user.enabled,
            accountExpired: user.accountExpired,
            accountLocked: user.accountExpired,
            passwordExpired: user.passwordExpired
        })
        .then()
}

export const deleteUser = (userID) => {
    return api
        .delete("/api/user/" + userID)
        .then()
}

export const getUserCards = () => {
    return api
        .get("/api/userCard")
        .then()
}

export async function currentUser() {
    const response = await api.get("api/currentUser")
    if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
