var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/user');

router.get('/:id', async (req, res) => {
    let name = req.params.id;
    console.log(name);
    try {
        const user = await userModel.find({ oauth_id: name });
        console.log(user);
        res.json(user);
    } catch (err) {
        res.status(500).send('database search failed');
    }
});

router.post('/', (req, res) => {
    // TODO: create a new user and add it to the users db
    // after OAuth2 setup
    const userId = uuid();
    const userInfo = req.params.info;
    users.push({
        id: userId,
        info: userInfo,
        scenes: [],
    });
    res.status(201).send(userId);
});

router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    // TODO: search up user in MongoDB database, if found, update fields with non-null fields in the request body
    // if not found send 404
    res.send(`editing user at id: ${userId}`);
});

module.exports = router;
