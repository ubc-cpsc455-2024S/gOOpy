const Scene = require('../models/scene.js');

const sceneQueries = {
    findSceneById: async function (id) {
        return await Scene.findById(id);
    },
    saveScene: async function (scene) {
        const s = new Scene(scene);
        await s.save();
    },
};

module.exports = sceneQueries;
