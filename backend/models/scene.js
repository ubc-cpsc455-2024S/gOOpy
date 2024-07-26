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
        skybox_color: {
            type: colorSchema,
            default: {
                hex: '#70e0f9',
                rgb: { r: 111.88125, g: 224.01112499999996, b: 248.625, a: 1 },
                hsv: { h: 190.8, s: 55.00000000000001, v: 97.5, a: 1 },
            },
        },
        skybox_light_color: {
            type: colorSchema,
            default: {
                hex: '#9beca4',
                rgb: {
                    r: 155.4630681818182,
                    g: 235.875,
                    b: 163.50426136363635,
                    a: 1,
                },
                hsv: {
                    h: 125.99999999999999,
                    s: 34.090909090909086,
                    v: 92.5,
                    a: 1,
                },
            },
        },
        ambient_intensity: { type: Number, default: 0.023 },
        metadata: {
            user_id: { type: String, default: '' },
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            copy_permission: { type: Boolean, default: false },
            last_edited: { type: Date, default: Date.now },
            thumbnail: { type: String, default: '' },
        },
    },
    { collection: 'scenes' }
);

module.exports = mongoose.model('scenes', sceneSchema);
