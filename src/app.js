const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();
const port = 3000;

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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    let sent = false;

    for (let user of users) {
        if (userId === user.id) {
            res.send(user);
            sent = true;
            break;
        }
    }
    if (!sent) {
        res.status(404).send('User not found');
    }
});

app.post('/users/', (req, res) => {
    const userId = uuid();
    const userInfo = req.params.info;
    users.push({
        id: userId,
        info: userInfo,
        scenes: [],
    });
    res.status(201).send(`Added user: ${userId} successfully`);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userFound = null;

    // TODO: search up user in MongoDB database, if found, update fields with non-null fields in the request body
    // if not found send 404
    res.status(404).send('User not found');
});

app.get('/scenes', (req, res) => {
    const reqAmt = req.params.requestAmount;
    // TODO: return a list of reqAmnt scenes
    res.send(`Sending ${reqAmt} scenes`);
});

app.get('/scenes/:id', (req, res) => {
    // TODO: return the scene requested
});

app.post('/scenes/:id', (req, res) => {
    // TODO: save the scene to the current logged in user's scenes
});

app.put('/scenes/:id', (req, res) => {
    // TODO: update the scene requested
});

app.delete('/scenes/:id', (req, res) => {
    // TODO: delete from user's scene, should only be available if current scene belongs to logged in user
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
