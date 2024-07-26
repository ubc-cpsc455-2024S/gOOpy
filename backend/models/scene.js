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

const colorSchema = new Schema(
    {
        hex: String,
        rgb: {
            r: Number,
            g: Number,
            b: Number,
            a: Number,
        },
        hsv: { h: Number, s: Number, v: Number, a: Number },
    },
    { _id: false }
);

const sceneSchema = Schema(
    {
        shapes: [shapeSchema],
        skybox_color: colorSchema,
        skybox_light_color: colorSchema,
        ambient_intensity: Number,
        metadata: {
            user_id: String,
            title: String,
            description: String,
            copy_permission: Boolean,
            last_edited: { type: Date, default: Date.now },
            thumbnail: String,
        },
    },
    { collection: 'scenes' }
);

module.exports = mongoose.model('scenes', sceneSchema);
