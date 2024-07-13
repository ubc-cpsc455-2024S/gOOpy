const Scene = require('../models/scene.js');

const sceneQueries = {
    findSceneById: async function (id) {
        return await Scene.findById(id);
    },
    saveScene: async function (id, scene) {
        return await Scene.findOneAndUpdate({ _id: id }, scene, {
            new: true,
        });
    },
    newScene: async function (scene) {
        const s = new Scene(scene);
        await s.save();
        return s;
    },
};

module.exports = sceneQueries;
