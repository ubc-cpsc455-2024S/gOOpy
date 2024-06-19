var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

// fake data for users
let users = [
    {
        id: 123,
        username: 'user1',
        bio: 'abc',
        scenes: ['a1', 'a2', 'b3'],
        profilepic:
            'https://chiikawainfo.carrd.co/assets/images/image03.png?v=130a7b9b',
    },
    {
        id: 456,
        username: 'user2',
        bio: 'def',
        scenes: ['b2', 'c3', 'd2'],
        profilepic:
            'https://chiikawainfo.carrd.co/assets/images/image04.png?v=130a7b9b',
    },
    {
        id: 789,
        username: 'user3',
        bio: 'ghi',
        scenes: ['m3', 'h7', 'j1'],
        profilepic:
            'https://chiikawainfo.carrd.co/assets/images/image05.png?v=130a7b9b',
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
    res.status(201).send(userId);
});

router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userFound = null;

    // TODO: search up user in MongoDB database, if found, update fields with non-null fields in the request body
    // if not found send 404
    res.send(`editing user at id: ${userId}`);
});

module.exports = router;
