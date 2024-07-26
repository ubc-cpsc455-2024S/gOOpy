var express = require('express');
const sceneQueries = require('../queries/scene-queries');

var router = express.Router();

router.get('/', (req, res) => {
    const { reqAmt } = req.query;
    const reqAmtInt = parseInt(reqAmt, 10);
    if (isNaN(reqAmtInt)) {
        res.status(400).send('request amount must be a valid number');
        return;
    }
    // TODO: return a list of 'reqAmt' (eg 24) scenes
    res.send(`Sending ${reqAmt} scenes`);
});

router.get('/manymetadata', async (req, res) => {
    try {
        const sceneIds = req.query.sceneIds;
        if (!sceneIds) {
            res.status(400).send('sceneIds parameter is required');
            return;
        }

        const metadata = await sceneQueries.getManySceneMetadata(sceneIds);
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

router.patch('/:id', (req, res) => {
    // TODO: update the scene requested
    const id = req.params.id;
    res.send(`editing item at id: ${id}`);
});

router.delete('/:id', (req, res) => {
    // TODO: delete from user's scene, should only be available if current scene belongs to logged in user
    const id = req.params.id;
    res.send(`deleted item at id: ${id}`);
});

// creates and empty scene and responds with the scene in body
router.post('', async (req, res) => {
    // res.status(200).send('working');
    try {
        const scene = await sceneQueries.newScene();

        res.status(200).json(scene);
    } catch (e) {
        res.status(500).send('Failed to create scene');
    }
});

module.exports = router;
