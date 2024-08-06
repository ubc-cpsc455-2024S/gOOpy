const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(process.env.MONGODB_CONNECTION_STRING)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection error:', err);
            });
    }
}

module.exports = new Database();
