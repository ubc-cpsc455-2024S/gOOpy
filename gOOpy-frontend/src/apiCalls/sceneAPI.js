import axios from 'axios';

// const dotenv = require('dotenv');
// dotenv.config();

export const LOCAL_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export function getSceneInfo(sceneID) {
    return axios.get(`${LOCAL_SERVER_URL}/scene/${sceneID}`);
}

export function saveSceneInfo(sceneId, data) {
    return axios.post(`${LOCAL_SERVER_URL}/scene/${sceneId}`, data);
}

export function getManySceneMetadata(sceneIds) {
    return axios.get(`${LOCAL_SERVER_URL}/scene/manymetadata`, {
        params: { sceneIds: sceneIds },
    });
}
