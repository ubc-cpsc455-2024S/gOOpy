import axios from 'axios';

// TODO: Replace with actual local server url later;
export const LOCAL_SERVER_URL = 'http://localhost:3000';

export function getSceneInfo(sceneID) {
    return axios.get(`${LOCAL_SERVER_URL}/scene/${sceneID}`);
}

export function saveSceneInfo(sceneId, data) {
    return axios.post(`${LOCAL_SERVER_URL}/scene/${sceneId}`, data);
}

export function getManySceneMetadata(sceneIds) {
    console.log('sceneIds in sceneAPI: ', sceneIds);
    return axios.get(`${LOCAL_SERVER_URL}/scene/manymetadata`, {
        params: { sceneIds: sceneIds },
    });
}
