import axios from 'axios';
import { LOCAL_SERVER_URL } from './sceneAPI';

export function getUsers() {
    return axios.get(`${LOCAL_SERVER_URL}/users`);
}

export function getUserInfo(userId) {
    return axios.get(`${LOCAL_SERVER_URL}/users/${userId}`);
}

export function getUserInfoByUsername(username) {
    return axios.get(`${LOCAL_SERVER_URL}/users/username/${username}`);
}

export function updateUser(user) {
    return axios.put(`${LOCAL_SERVER_URL}/users/${user.userID}`, user);
}

export function createUser(user) {
    return axios.post(`${LOCAL_SERVER_URL}/users/`, user);
}

export async function loginUserGoogle() {
    window.location.href = `${LOCAL_SERVER_URL}/auth/google`;
}

export async function logoutUserGoogle() {
    try {
        const res = await axios.get(`${LOCAL_SERVER_URL}/auth/logout`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error('Logout failed:', error);
        return null;
    }
}
