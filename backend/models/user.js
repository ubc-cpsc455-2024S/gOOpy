const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    oauth_id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: String,
    profile_pic: String,
    scenes: [{ type: Schema.Types.ObjectId, ref: 'Scene' }],
    // TODO: might have to store oauth access tokens, refresh tokens etc
});

module.exports = mongoose.model('Users', userSchema);
