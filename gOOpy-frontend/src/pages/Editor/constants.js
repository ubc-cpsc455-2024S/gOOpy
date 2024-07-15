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
