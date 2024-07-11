const Scene = require('../models/scene.js');

const sceneQueries = {
    findScene: async function (filter) {
        return await Scene.findOne(filter);
    },
    saveScene: async function (scene) {
        const s = new Scene(scene);
        await s.save();
    },
};

module.exports = sceneQueries;
