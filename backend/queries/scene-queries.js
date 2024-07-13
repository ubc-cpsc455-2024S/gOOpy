const Scene = require('../models/scene.js');

const sceneQueries = {
    findSceneById: async function (id) {
        return await Scene.findById(id);
    },
    saveScene: async function (scene) {
        return await Scene.findOneAndUpdate({ _id: scene._id }, scene);
    },
    newScene: async function (scene) {
        const s = new Scene(scene);
        await s.save();
        return s;
    },
};

module.exports = sceneQueries;
