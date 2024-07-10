const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vectorSchema = new Schema(
    {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
    },
    { _id: false }
);

const shapeSchema = new Schema({
    center: { type: vectorSchema, required: true },
    property1: { type: Number, required: true },
    shapeType: { type: String, required: true },
});

// TODO: will need to update with things like camera, colour etc
const sceneSchema = Schema({
    shapes: [shapeSchema],
    metadata: {
        user_id: String,
        title: String,
        last_edited: { type: Date, default: Date.now },
        thumbnail: String, // should this be a link to the thumbnail image?
    },
});

module.exports = mongoose.model('Scene', sceneSchema);
