import axios from 'axios';

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
) {
    const req = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(res => {
            if (list) {
                return [...list, ...res.data]
            } else {
                return res.data;
            }
        }
        )

    return {
        type: 'GET_BOOKS',
        payload: req
    }
}

export function getBookWithReviewer(id) {
    const req = axios.get(`/api/getBook?id=${id}`);

    return (dispatch) => {
        req.then(({ data }) => {
            let book = data;

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({ data }) => {
                    let res = {
                        book,
                        reviewer: data
                    }
                    dispatch({
                        type: 'GET_BOOK_W_REVIEWER',
                        payload: res
                    })
                })
        })
    }
}

export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }
}

export function addBook(book) {
    const req = axios.post('/api/book', book)
        .then(res => res.data);

    return {
        type: 'ADD_BOOK',
        payload: req
    }
}

export function clearNewBook() {
    return {
        type: 'CLEAR_NEWBOOK',
        payload: {}
    }
}

export function getUserPosts(userId) {
    const req = axios.get(`/api/user_posts?user=${userId}`)
        .then(res => res.data)
    return {
        type: 'GET_USER_POSTS',
        payload: req
    }
}

export function getBook(id) {
    const req = axios(`/api/getbook?id=${id}`)
        .then(res => res.data)
    return {
        type: 'GET_BOOK',
        payload: req
    }
}

export function updateBook(data) {
    const req = axios.post(`/api/book_update`, data)
        .then(res => res.data)
    return {
        type: 'UPDATE_BOOK',
        payload: req
    }
}

export function deleteBook(id) {
    const req = axios.delete(`/api/delete_book?id=${id}`)
        .then(res => res.data)
    return {
        type: 'DELETE_BOOK',
        payload: req
    }
}
export function clearBook() {
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: null,
            updateBook: false,
            postDeleted: false
        }
    }
}
// User

export function loginUser({ email, password }) {

    const req = axios.post('/api/login', { email, password })
        .then(res => res.data)
    return {
        type: 'USER_LOGIN',
        payload: req
    }
}

export function auth() {

    const req = axios.get('/api/auth')
        .then(res => res.data)

    return {
        type: 'USER_AUTH',
        payload: req
    }
}

export function getUsers() {
    const req = axios.get('/api/users')
        .then(res => res.data)
    return {
        type: 'GET_USERS',
        payload: req
    }
}

export function userRegister(user, userList) {
    const req = axios.post(`/api/register`, user)

    return (dispatch) => {
        req.then(({ data }) => {
            let users = data.success ? [...userList, data.user] : userList
            let res = {
                success: data.success,
                users
            }

            dispatch({
                type: "USER_REGISTER",
                payload: res
            })
        })
    }
}

export function logout() {
    const req = axios.get('/api/logout')
        .then(res => res.data)

    return {
        type: 'GET_LOGOUT',
        payload: req
    }
}