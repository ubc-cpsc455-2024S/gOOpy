const userQueries = require('../queries/user-queries');

var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// fake data for users
let users = [
    {
        oauth_id: 'asdf',
        name: 'gregork',
        description: "I'm Gregor",
        scenes: [],
        profile_pic:
            'https://chiikawainfo.carrd.co/assets/images/image03.png?v=130a7b9b',
    },
    {
        oauth_id: 456,
        name: 'swolfman',
        bio: 'Steve!',
        scenes: [
            {
                image: 'https://images.unsplash.com/photo-1635241161466-541f065683ba?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'triangle',
                lastEditDate: new Date('2024-06-15'),
                id: 148,
            },
            {
                image: 'https://images.unsplash.com/photo-1648457257285-cfbc3781cc54?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: '3D',
                lastEditDate: new Date('2024-05-25'),
                id: 120,
            },
            {
                image: 'https://images.unsplash.com/photo-1656703306407-88adf9044949?q=80&w=2943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'rope',
                lastEditDate: new Date('2024-04-21'),
                id: 435,
            },
        ],
        profile_pic:
            'https://chiikawainfo.carrd.co/assets/images/image06.png?v=130a7b9b',
    },
    {
        oauth_id: 789,
        name: 'jordon',
        bio: "I'm Jordon",
        scenes: [
            {
                image: 'https://images.unsplash.com/photo-1660069870507-30dc28e6645b?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                name: 'doors',
                lastEditDate: new Date('2023-12-21'),
                oauth_id: 297,
            },
        ],
        profile_pic:
            'https://chiikawainfo.carrd.co/assets/images/image05.png?v=130a7b9b',
    },
];

router.get('/:id', async (req, res) => {
    // TODO: query db and return name, userinfo and a list of scenes belonging to user

    let id = req.params.id;
    const user = await userQueries.findUserById(id);

    if (!user) {
        return res.status(404).send(`No user found with id ${id}`);
    }
    return res.send(user);
});

router.get('/username/:id', async (req, res) => {
    // TODO: query db and return name, userinfo and a list of scenes belonging to user
    // TODO: use ID to find names?

    // await userQueries.saveUser(users[0]);
    let name = req.params.id;
    // console.log(name);
    const user = await userQueries.findUser({ name: `${name}` });
    // console.log(user);
    if (!user) {
        // TODO: replace with search by ID once we begin using IDs
        return res.status(404).send(`No user found with name ${name}`);
        // return res.status(404).send(`No user found with ID ${userId}`);
    }
    return res.send(user);
});

router.post('/', (req, res) => {
    // TODO: create a new user and add it to the users db
    const userId = uuid();
    const userInfo = req.params.info;
    users.push({
        oauth_id: userId,
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
