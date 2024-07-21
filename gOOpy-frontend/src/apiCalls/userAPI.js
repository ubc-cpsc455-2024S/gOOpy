import axios from 'axios';
import { LOCAL_SERVER_URL } from './sceneAPI';

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
    const response = await axios.get('http://localhost:3000/auth/google');
    const { url } = response.data;
    window.location.href = url;
}
