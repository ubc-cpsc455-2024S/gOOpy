export const SHAPE_TYPES = {
    Sphere: 0,
    Box: 1,
    Torus: 2,
    Cylinder: 3,
};

const translation = {
    title: 'Translation',
    values: [
        { descriptor: 'x', min: -5, max: 5, path: ['center', 'x'] },
        { descriptor: 'y', min: -5, max: 5, path: ['center', 'y'] },
        { descriptor: 'z', min: -5, max: 5, path: ['center', 'z'] },
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
        rotation,
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
                { descriptor: 'r', min: 0, max: 5, path: ['property1'] },
                { descriptor: 'w', min: 0, max: 5, path: ['property2'] },
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
];
