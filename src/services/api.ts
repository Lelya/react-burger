import {NORMA_URL} from "../constants/burger-constants";
import {TIngredientData} from "../utils/types";

export function request(url: string | URL, options: RequestInit | undefined) {
    return fetch(url, options).then(checkResponse)
}

export function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getData (url: string, options: RequestInit | undefined) {
    return request(NORMA_URL + url, options)
}

export function postRequest (url: string, data: { token?: string | null; email?: string; }) {
    return request(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function postRequestAuth (url: string, data: { ingredients: TIngredientData }, token: string) {
    return request(NORMA_URL+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    })
}

export function patchRequestAuth (url: string, data: { email: string; name: string; }, token: string) {
    return request(NORMA_URL+url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    })
}