const Users = require('../models/user.js');

const usersQueries = {
    findUser: async function (filter) {
        return await Users.findOne(filter);
    },
    saveUser: async function (user) {
        const u = new Users(user);
        await u.save();
    },
};

module.exports = usersQueries;
