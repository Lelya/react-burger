const BASIC_URL = 'norma.nomoreparties.space';

const getUrl = (type: 'HTTP' | 'WS', uri: string) => {
    switch (type) {
        case 'HTTP':
            return `https://${BASIC_URL}/api/${uri}`;
        case 'WS':
            return `wss://${BASIC_URL}/${uri}`;
    }
};

export const WSS_ALL_ORDERS_URL = getUrl('WS', 'orders/all');
export const WSS_USER_ORDERS_URL = getUrl('WS', `orders`);
export const API_INGREDIENTS_URL = getUrl('HTTP', 'ingredients');
export const API_ORDERS_URL = getUrl('HTTP', 'orders');
export const FORGOT_PASSWORD_URL: string = getUrl('HTTP','/password-reset');
export const REGISTER_URL: string = getUrl('HTTP', 'auth/register');
export const LOGIN_URL: string = getUrl('HTTP', 'auth/login');
export const LOGOUT_URL: string = getUrl('HTTP', 'auth/logout');
export const RASSWORD_RESET_URL: string = getUrl('HTTP', 'password-reset/reset');
export const TOKEN_URL: string = '/auth/token';
export const AUTH_USER_URL: string = getUrl('HTTP', 'auth/user');
export const INGREDIENTS_BUN: string = "bun"
export const INGREDIENTS_SAUCE: string = 'sauce';
export const INGREDIENTS_MAIN: string = 'main';
export const INGREDIENTS_BUN_NAME: string = "Булки"
export const INGREDIENTS_SAUCE_NAME: string = 'Соусы';
export const INGREDIENTS_MAIN_NAME: string = 'Начинки';
