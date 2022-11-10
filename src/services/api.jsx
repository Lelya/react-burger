import {NORMA_URL} from "../constants/burger-constants";

export function getData (url) {
    return fetch(NORMA_URL+url).then(response => response.json())
}

export function postOrderInfo (url, idsOrder) {
    return fetch(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(idsOrder),
    }).then(response => response.json())
}