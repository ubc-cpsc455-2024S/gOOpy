import { Vector3 } from 'three';

export const SHAPE_TYPES = {
    Sphere: 0,
    Box: 1,
    Torus: 2,
    Cylinder: 3,
    'Arc Torus': 4,
};

const translation = {
    title: 'Translation',
    values: [
        { descriptor: 'x', min: -5, max: 5, path: ['translation', 'x'] },
        { descriptor: 'y', min: -5, max: 5, path: ['translation', 'y'] },
        { descriptor: 'z', min: -5, max: 5, path: ['translation', 'z'] },
    ],
};

const rotation = {
    title: 'Rotation',
    values: [
        { descriptor: 'x', min: -5, max: 5, path: ['rotation', 'x'] },
        { descriptor: 'y', min: -5, max: 5, path: ['rotation', 'y'] },
        { descriptor: 'z', min: -5, max: 5, path: ['rotation', 'z'] },
    ],
};

// Delete const below as part of big TODO purge
// TODO scale is not used right now due to buggy behaviour with scales in [0, 1] w/ rotation (disappearing)
// This good be related to incorrect implementation (see comment in matrixHelpers > rebuildMatrix)
// Also, I am not fully convinced that lighting is correct with scaling
// Usually you need to do inverse transpose on the normals to fix this, but w/ our new method I am not sure.
const scale = {
    title: 'Scale',
    values: [
        { descriptor: 'x', min: 0.2, max: 5, path: ['scale', 'x'] },
        { descriptor: 'y', min: 0.2, max: 5, path: ['scale', 'y'] },
        { descriptor: 'z', min: 0.2, max: 5, path: ['scale', 'z'] },
    ],
};

// index of SHAPE_PROPERTIES refers to value of SHAPE_TYPE above.
// IE SHAPE_PROPERTIES[1] is the Box properties.
export const SHAPE_PROPERTIES = [
    [
        translation,
        {
            title: 'Radius',
            values: [{ descriptor: 'r', min: 0, max: 5, path: ['property1'] }],
        },
    ],
    [
        translation,
        rotation,
        {
            title: 'Dimensions',
            values: [
                { descriptor: 'x', min: 0, max: 3, path: ['property1'] },
                { descriptor: 'y', min: 0, max: 3, path: ['property2'] },
                { descriptor: 'z', min: 0, max: 3, path: ['property3'] },
            ],
        },
        {
            title: 'Roundness',
            values: [{ descriptor: 'r', min: 0, max: 1, path: ['property4'] }],
        },
    ],
    [
        translation,
        rotation,
        {
            title: 'Dimensions',
            values: [
                { descriptor: 'r', min: 0, max: 4, path: ['property1'] },
                { descriptor: 'w', min: 0, max: 4, path: ['property2'] },
            ],
        },
    ],
    [
        translation,
        rotation,
        {
            title: 'Dimensions',
            values: [
                { descriptor: 'w', min: 0, max: 5, path: ['property1'] },
                { descriptor: 'h', min: 0, max: 5, path: ['property3'] },
            ],
        },
        {
            title: 'Roundness',
            values: [{ descriptor: 'r', min: 0, max: 1, path: ['property2'] }],
        },
    ],
    [
        translation,
        rotation,
        {
            title: 'Dimensions',
            values: [
                { descriptor: 'r', min: 0, max: 4, path: ['property1'] },
                { descriptor: 'w', min: 0, max: 4, path: ['property2'] },
            ],
        },
        {
            title: 'Arc',
            values: [{ descriptor: 'l', min: 0, max: 3, path: ['property3'] }],
        },
    ],
];

// hard coded list of objects
export const obj1 = {
    translation: new Vector3(0.0, 0.0, 0.0),
    scale: new Vector3(1.0, 1.0, 1.0),
    rotation: new Vector3(0.0, 0.0, 0.0),
    property1: 1.0,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Sphere,
    id: 0,
};
export const obj2 = {
    translation: new Vector3(1.0, 1.0, 1.0),
    scale: new Vector3(1.0, 1.0, 1.0),
    rotation: new Vector3(0.0, 0.0, 0.0),
    property1: 1.3,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Sphere,
    id: 1,
};
export const obj3 = {
    translation: new Vector3(-1.0, -1.0, 1.0),
    scale: new Vector3(1.0, 1.0, 1.0),
    rotation: new Vector3(0.0, 0.0, 0.0),
    property1: 0.8,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Box,
    id: 2,
};

const shift = 4;

// same g as logo but translated
export const default_g = [
    {
        translation: { x: -3.712 + shift, y: 1.943, z: 5 },
        property1: 0.174,
        property2: 0.407,
        property3: 1.384,
        property4: 0.2,
        rotation: { x: -2.719, y: 0.433, z: -1.779 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 3,
        id: 3,
    },
    {
        translation: { x: -5 + shift, y: 2.09, z: 4.566 },
        property1: 1.036,
        property2: 0.292,
        property3: 0.2,
        property4: 0.2,
        rotation: { x: 1.61, y: 0, z: 0.395 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 2,
        id: 6,
    },
    {
        translation: { x: -4.985 + shift, y: -0.816, z: 5 },
        property1: 1.44,
        property2: 0.34,
        property3: 1.6,
        property4: 0.2,
        rotation: { x: -2.0, y: -0.3, z: 0.0 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 4,
        id: 7,
    },
];
