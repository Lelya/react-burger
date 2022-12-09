import {NORMA_URL} from "../constants/burger-constants";

export function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getData (url, options) {
    return request(NORMA_URL + url, options)
}

export function postRequest (url, data) {
    return request(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function postRequestAuth (url, data, token) {
    return request(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    })
}

export function patchRequestAuth (url, data, token) {
    return request(NORMA_URL+url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    })
}