import axios from 'axios';

// TODO: Replace with actual local server url later;
export const LOCAL_SERVER_URL = 'http://127.0.0.1:3000';

export function getSceneInfo(sceneID) {
    return axios.get(`${LOCAL_SERVER_URL}/scene/${sceneID}`);
}

export function saveSceneInfo(sceneId, data) {
    return axios.post(`${LOCAL_SERVER_URL}/scene/${sceneId}`, data);
}
