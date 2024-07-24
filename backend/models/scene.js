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
    translation: { type: vectorSchema, required: true },
    rotation: { type: vectorSchema, required: true },
    scale: { type: vectorSchema, required: true },
    property1: { type: Number, required: true },
    property2: { type: Number, required: true },
    property3: { type: Number, required: true },
    property4: { type: Number, required: true },
    shape_type: { type: Number, required: false }, // change it to false for now cos not sent
    id: { type: Number, required: true },
});

// TODO: will need to update with things like camera, colour etc
const sceneSchema = Schema(
    {
        shapes: [shapeSchema],
        metadata: {
            user_id: String,
            title: String,
            last_edited: { type: Date, default: Date.now },
            thumbnail: String, // should this be a link to the thumbnail image?
        },
    },
    { collection: 'scenes' }
);

module.exports = mongoose.model('scenes', sceneSchema);
