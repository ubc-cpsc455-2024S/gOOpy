const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VectorSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
});

const ShapeSchema = new Schema({
    center: { type: VectorSchema, required: true },
    radius: { type: Number, required: true },
    id: { type: Number, required: true },
});

// TODO: will need to update with things like camera, colour etc
const SceneSchema = Schema({
    shapes: [ShapeSchema],
    metadata: {
        userID: String,
        title: String,
        lastEdited: { type: Date, default: Date.now },
    },
});
