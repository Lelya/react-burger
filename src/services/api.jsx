import {NORMA_URL} from "../constants/burger-constants";

export function getData (url, options) {
    return fetch(NORMA_URL + url, options).then(response => response.json())
}

export function postRequest (url, data) {
    return fetch(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
}

export function postRequestAuth (url, data, token) {
    return fetch(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
}

export function patchRequestAuth (url, data, token) {
    return fetch(NORMA_URL+url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .catch(e => console.log(e))
}