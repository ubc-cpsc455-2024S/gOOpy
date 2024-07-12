var express = require('express');
const sceneQueries = require('../queries/scene-queries');

var router = express.Router();

// set up fake data for scenes (not linked to users, just for persistence right now)

let currentScene = null;

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
    // TODO: return the scene requested
    const id = req.params.id;
    const currentScene = await sceneQueries.findSceneById(id);
    res.json(currentScene);
});

router.post('/', (req, res) => {
    sceneQueries.saveScene(req.body);
    res.send();
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
