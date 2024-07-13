const Users = require('../models/user.js');

const usersQueries = {
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
