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
    return request(url, options)
}

export function postRequest (url: string, data: { token?: string | null; email?: string; }) {
    return request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export function postRequestAuth (url: string, data: { ingredients: Array<string> }, token: string) {
    return request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    })
}

export function patchRequestAuth(url: string, data: { name: string | null | undefined; email: string | null | undefined }, token: string) {
    return request(url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
        },
        body: JSON.stringify(data),
    })
}