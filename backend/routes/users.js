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

router.patch('/:id', async (req, res) => {
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
