var express = require('express');
const sceneQueries = require('../queries/scene-queries');

var router = express.Router();

router.get('/metadata', async (req, res) => {
    try {
        const sceneIds = req.query.sceneIds;
        if (!sceneIds) {
            res.status(400).send('sceneIds parameter is required');
            return;
        }

        const metadata = await sceneQueries.getScenesMetadata(sceneIds);
        if (!metadata) {
            res.status(404).send('No such scene');
            return;
        }

        res.json(metadata);
    } catch (e) {
        res.status(500).send('error getting scene by id');
    }
});

router.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const scene = await sceneQueries.saveScene(id, req.body);
        if (!scene) {
            res.status(404).send('No such scene');
            return;
        }
        res.status(200).send('scene added');
    } catch (e) {
        res.status(500).send('failed to add scene');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const scene = await sceneQueries.findSceneById(id);
        if (!scene) {
            res.status(404).send('No such scene');
            return;
        }
        res.json(scene);
    } catch (e) {
        res.status(500).send('error getting scene by id');
    }
});

// creates and empty scene and responds with the scene in body
router.post('', async (req, res) => {
    try {
        const scene = await sceneQueries.newScene(req.body);
        const id = scene._id;
        res.status(200).json(id);
    } catch (e) {
        res.status(500).send('Failed to create scene');
    }
});

module.exports = router;
