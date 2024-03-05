import {UserModify, UserResponse, UsersResponse} from './types.tsx';
import axios from 'axios';

const BASE_URL: string = 'https://dummyjson.com';

function fetchAllUsers(limit: number, skip: number): Promise<UsersResponse> {
    return axios.get(BASE_URL + '/users', {
        params: {
            limit: limit,
            skip: skip,
        }
    })
        .then((response) => {
            return {
                total: response.data.total,
                users: response.data.users,
                hasError: false
            }
        }).catch(() => {
            return {
                total: 0,
                users: [],
                hasError: true
            }
        });
}

function fetchUsersFiltered(key: string, value: string, limit: number, skip: number): Promise<UsersResponse> {
    return axios.get(BASE_URL + '/users/filter', {
        params: {
            key: key,
            value: value,
            limit: limit,
            skip: skip,
        }
    })
        .then((response) => {
            return {
                total: response.data.total,
                users: response.data.users,
                hasError: false
            }
        }).catch(() => {
            return {
                total: 0,
                users: [],
                hasError: true
            }
        });
}

function createUser(userModify: UserModify): Promise<UserResponse> {
    return axios.post(BASE_URL + '/users/add', normalizeUserModify(userModify))
        .then((response) => {
            return {
                user: response.data,
                hasError: false
            }
        }).catch(() => {
            return {
                user: null,
                hasError: true
            }
        });
}

function editUser(userId: number, userModify: UserModify): Promise<UserResponse> {
    return axios.patch(BASE_URL + '/users/' + userId, normalizeUserModify(userModify))
        .then((response) => {
            return {
                user: response.data,
                hasError: false
            }
        }).catch(() => {
            return {
                user: null,
                hasError: true
            }
        });
}

function deleteUser(id: number): Promise<UserResponse> {
    return axios.delete(BASE_URL + '/users/' + id)
        .then((response) => {
            return {
                user: response.data,
                hasError: false
            }
        }).catch(() => {
            return {
                user: null,
                hasError: true
            }
        });
}

function normalizeUserModify(userModify: UserModify): unknown {
    return {
        age: userModify.age,
        firstName: userModify.firstName,
        lastName: userModify.lastName,
        username: userModify.username
    }
}

export default {
    createUser,
    deleteUser,
    editUser,
    fetchAllUsers,
    fetchUsersFiltered
};