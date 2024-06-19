var express = require('express');
var router = express.Router();

// fake data for users
let users = [
    {
        id: 123,
        info: 'abc',
        scenes: ['a1', 'a2', 'b3'],
    },
    {
        id: 456,
        info: 'def',
        scenes: ['b2', 'c3', 'd2'],
    },
    {
        id: 789,
        info: 'ghi',
        scenes: ['m3', 'h7', 'j1'],
    },
];

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/:id', (req, res) => {
    // TODO: query db and return username, userinfo and a list of scenes belonging to user
    const userId = parseInt(req.params.id, 10);
    console.log(req.params.id);

    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send(`No user found with ID ${userId}`);
    }
    return res.send(user);
});

router.post('/', (req, res) => {
    // TODO: create a new user and add it to the users db
    const userId = uuid();
    const userInfo = req.params.info;
    users.push({
        id: userId,
        info: userInfo,
        scenes: [],
    });
    res.status(201).send(`Added user: ${userId} successfully`);
});

router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userFound = null;

    // TODO: search up user in MongoDB database, if found, update fields with non-null fields in the request body
    // if not found send 404
    res.status(404).send('User not found');
});

module.exports = router;
