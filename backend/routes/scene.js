var express = require('express');
const sceneQueries = require('../queries/scene-queries');

var router = express.Router();
const sceneModel = require('../models/scene');
const userModel = require('../models/user');

// set up fake data for scenes (not linked to users, just for persistence right now)

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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const currentScene = await sceneQueries.findSceneById(id);
        res.json(currentScene);
    } catch (e) {
        res.status(500).send('error getting scene by id');
    }
});

router.post('/', (req, res) => {
    try {
        sceneQueries.saveScene(req.body);
        res.status(200).send('scene added');
    } catch (e) {
        res.status(500).send('failed to add scene');
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

module.exports = router;
