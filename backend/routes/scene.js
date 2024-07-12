var express = require('express');
var router = express.Router();
const sceneModel = require('../models/scene');
const userModel = require('../models/user');

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

router.get('/:id', (req, res) => {
    // TODO: return the scene requested
    const id = req.params.id;
    res.json(currentScene);
});

router.post('/', async (req, res) => {
    // TODO: save the scene to the current logged in user's scenes\
    currentScene = req.body;
    shapes = [];

    currentScene.shapes.map((currShape) => {
        vec = currShape.center;
        property = currShape.radius;
        id = currShape.id;
        shape = {
            center: vec,
            property1: property,
            id: id,
        };
        shapes.push(shape);
    });
    const scene = {
        shapes: shapes,
        metadata: currentScene.metadata,
    };

    try {
        // add to scene db
        const savedScene = await new sceneModel(scene).save();
        // add to user's scene

        const updatedUser = await userModel.findByIdAndUpdate(
            currentScene.metadata.user_id,
            { $push: { scenes: savedScene._id } }, // Push the new scene's ID into the user's scenes array
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            res.status(404).send('User not found');
        }
        res.status(201).send('added scene successfully');
    } catch (e) {
        console.error(e);
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
