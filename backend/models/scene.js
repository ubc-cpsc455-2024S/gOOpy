const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vectorSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
});

const shapeSchema = new Schema({
    center: { type: vectorSchema, required: true },
    radius: { type: Number, required: true },
    id: { type: Number, required: true },
});

// TODO: will need to update with things like camera, colour etc
const sceneSchema = Schema({
    shapes: [shapeSchema],
    metadata: {
        userID: String,
        title: String,
        lastEdited: { type: Date, default: Date.now },
        thumbnail: String, // should this be a link to the thumbnail image?
    },
});

module.exports = mongoose.model('Scene', sceneSchema);
