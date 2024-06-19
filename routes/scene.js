var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const reqAmt = req.params.requestAmount;
    // TODO: return a list of 'reqAmt' (eg 24) scenes
    res.send(`Sending ${reqAmt} scenes`);
});

router.get('/:id', (req, res) => {
    // TODO: return the scene requested
    const id = req.params.id;
    res.send(`return the ${id} requested`);
});

router.post('/', (req, res) => {
    // TODO: save the scene to the current logged in user's scenes
});

router.put('/:id', (req, res) => {
    // TODO: update the scene requested
});

router.delete('/:id', (req, res) => {
    // TODO: delete from user's scene, should only be available if current scene belongs to logged in user
});

module.exports = router;
