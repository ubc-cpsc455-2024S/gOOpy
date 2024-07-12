import axios from 'axios';

// TODO: Replace with actual local server url later;
export const LOCAL_SERVER_URL = 'http://127.0.0.1:3000';

export function getUserInfo(userId) {
    console.log(userId);
    return axios.get(`${LOCAL_SERVER_URL}/users/${userId}`);
}

export function getUserInfoByUsername(username) {
    return axios.get(`${LOCAL_SERVER_URL}/users/username/${username}`);
}

export function updateUser(user) {
    return axios.put(`${LOCAL_SERVER_URL}/users/${user.userID}`, user);
}
