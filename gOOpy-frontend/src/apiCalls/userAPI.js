import axios from 'axios';

// TODO: Replace with actual local server url later;
export const LOCAL_SERVER_URL = 'http://localhost:8080';

export function getUserInfo(userID) {
    return axios.get(`${LOCAL_SERVER_URL}/users/${userID}`);
}

export function updateUser(user) {
    return axios.put(`${LOCAL_SERVER_URL}/users/${user.userID}`, user);
}