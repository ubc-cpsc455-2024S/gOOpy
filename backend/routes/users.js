const userQueries = require('../queries/user-queries');

var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const { isValidObjectId } = require('mongoose');
dotenv.config();
const userModel = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await userQueries.findAllUsers();
        if (!users) {
            return res.status(404).send('No users found');
        }
        res.send(users);
    } catch (e) {
        return res.status(500).send(`Error finding users: ${e}`);
    }
});

router.get('/:id', async (req, res) => {
    // TODO: query db and return name, userinfo and a list of scenes belonging to user

    try {
        let id = req.params.id;
        if (!isValidObjectId(id)) {
            return res.status(404).send(`No user found with id ${id}`);
        }
        const user = await userQueries.findUserById(id);

        if (!user) {
            return res.status(404).send(`No user found with id ${id}`);
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send(`Error finding user with id ${id}`);
    }
});

router.get('/username/:username', async (req, res) => {
    // TODO: temp endpoint - replace with search by ID once we begin using IDs
    // await userQueries.saveUser(users[0]);
    let username = req.params.username;
    try {
        const user = await userQueries.findUser({ name: `${username}` });
        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).send(`No user found with name ${username}`);
    }
});

router.patch('/:id', async (req, res) => {
    // TODO: search up user in MongoDB database, if found, update fields with non-null fields in the request body
    // if not found send 404

    let id = req.params.id;
    let updates = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        console.error('Update failed:', error);
        res.status(500).send('Error updating user');
    }
});

module.exports = router;
