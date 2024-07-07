const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        console.log(process.env.MONGODB_CONNECTION_STRING);
        mongoose
            .connect(process.env.MONGODB_CONNECTION_STRING) // replace later
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection error:', err);
            });
    }
}

module.exports = new Database();
