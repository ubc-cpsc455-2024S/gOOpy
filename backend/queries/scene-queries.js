const Scene = require('../models/scene.js');
const User = require('../models/user.js');

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
        // associate with user associated with sent user ID
        const user = await User.findById(s.metadata.user_id);
        user.scenes = [...user.scenes, s.id];
        user.save();

        return s;
    },
    getScenesMetadata: async function (sceneIds) {
        return await Scene.find(
            { _id: { $in: sceneIds } },
            { metadata: 1, _id: 1 }
        );
    },
};

module.exports = sceneQueries;
