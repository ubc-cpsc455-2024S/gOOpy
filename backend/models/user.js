const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: String,
    scenes: [{ type: Schema.Types.ObjectId, ref: 'Scene' }],
    // TODO: might have to store oauth access tokens, refresh tokens etc
});

module.exports = mongoose.model('User', userSchema);
