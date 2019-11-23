import { API_BASE_URL, PAGEABLE_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllProducts(page, size) {
    page = page || 0;
    size = size || PAGEABLE_LIST_SIZE;

    return request({
        url: API_BASE_URL + '/products?page=' + page + '&size=' + size,
        method: 'GET'
    });
}

export function getProductById(id) {
    return request({
        url: API_BASE_URL + '/products/' + id,
        method: 'GET'
    });
}

export function getAllCategories(page, size) {
    page = page || 0;
    size = size || PAGEABLE_LIST_SIZE;

    return request({
        url: API_BASE_URL + '/categories?page=' + page + '&size=' + size,
        method: 'GET'
    });
}

export function createProduct(product) {
    return request({
        url: API_BASE_URL + '/products/',
        method: 'POST',
        accept: 'application/json',
        body: JSON.stringify(product)
    });
}

export function updateProduct(product) {
    return request({
        url: API_BASE_URL + '/products/' + product.id,
        method: 'PUT',
        accept: 'application/json',
        body: JSON.stringify(product)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + '/auth/signin',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + '/auth/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + '/user/checkUsernameAvailability?username=' + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + '/user/checkEmailAvailability?email=' + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('No access token set.');
    }

    return request({
        url: API_BASE_URL + '/user/me',
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + '/users/' + username,
        method: 'GET'
    });
}
