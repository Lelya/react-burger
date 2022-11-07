import {NORMA_URL} from "../constants/burger-constants";

export function getData (url) {
    return fetch(NORMA_URL+url).then(response => response.json())
}