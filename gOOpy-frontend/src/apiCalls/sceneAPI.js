import axios from 'axios';

export const LOCAL_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export function getSceneInfo(sceneID) {
    return axios.get(`${LOCAL_SERVER_URL}/scene/${sceneID}`);
}

export function saveSceneInfo(sceneId, data) {
    return axios.post(`${LOCAL_SERVER_URL}/scene/${sceneId}`, data);
}

export function getScenesMetadata(sceneIds) {
    return axios.get(`${LOCAL_SERVER_URL}/scene/metadata`, {
        params: { sceneIds: sceneIds },
    });
}

export function createNewScene(scene) {
    return axios.post(`${LOCAL_SERVER_URL}/scene`, scene);
}
