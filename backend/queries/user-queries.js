const Users = require('../models/user.js');

const usersQueries = {
    findAllUsers: async function () {
        return await Users.find().select('name'); // selects name and _id
    },
    findUserById: async function (id) {
        return await Users.findById(id);
    },
    findUser: async function (filter) {
        return await Users.findOne(filter);
    },
    saveUser: async function (user) {
        const u = new Users(user);
        await u.save();
    },
};

module.exports = usersQueries;
