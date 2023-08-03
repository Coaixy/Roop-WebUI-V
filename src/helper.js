import {SUBMIT, DELETE, STATE, DOWNLOAD} from "./config.js";

function post(url, formData) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            });
    })
}

function get(url, token) {
    return new Promise((resolve, reject) => {
        fetch(`${url}?token=${token}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            });
    })
}

export function submit(formData) {
    return post(SUBMIT, formData)
}

export function del(token) {
    const data = new FormData()
    data.append("token",token)
    return post(DELETE,data)
}

export function state(token) {
    return get(STATE, token)
}

export function download(token) {
    return DOWNLOAD + "?token=" + token
}