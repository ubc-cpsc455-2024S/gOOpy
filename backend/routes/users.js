const userQueries = require('../queries/user-queries');

var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const { isValidObjectId } = require('mongoose');
dotenv.config();
const userModel = require('../models/user');

router.get('/:id', async (req, res) => {
    // TODO: query db and return name, userinfo and a list of scenes belonging to user

    let id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(404).send(`No user found with id ${id}`);
    }
    const user = await userQueries.findUserById(id);

    if (!user) {
        return res.status(404).send(`No user found with id ${id}`);
    }
    return res.send(user);
});

router.get('/username/:username', async (req, res) => {
    // TODO: query db and return name, userinfo and a list of scenes belonging to user
    // TODO: use ID to find names?

    // await userQueries.saveUser(users[0]);
    let username = req.params.username;
    // console.log(name);
    const user = await userQueries.findUser({ name: `${username}` });
    // console.log(user);
    if (!user) {
        // TODO: replace with search by ID once we begin using IDs
        return res.status(404).send(`No user found with name ${username}`);
        // return res.status(404).send(`No user found with ID ${userId}`);
    }
});

router.post('/', (req, res) => {
    // TODO: create a new user and add it to the users db
    // after OAuth2 setup
    res.status(201).send('userID');
});

router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    // TODO: search up user in MongoDB database, if found, update fields with non-null fields in the request body
    // if not found send 404
    res.send(`editing user at id: ${userId}`);
});

module.exports = router;
