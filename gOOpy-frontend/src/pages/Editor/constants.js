export const SHAPE_TYPES = {
    Sphere: 0,
    Box: 1,
    Torus: 2,
};

// index of SHAPE_PROPERTIES refers to value of SHAPE_TYPE above.
// IE SHAPE_PROPERTIES[1] is the Box properties.
export const SHAPE_PROPERTIES = [
    [{ title: 'Radius', values: [{ descriptor: 'r', min: 0, max: 5 }] }],
    [
        {
            title: 'Dimensions',
            values: [
                { descriptor: 'x', min: 0, max: 5 },
                { descriptor: 'x', min: 0, max: 5 },
            ],
        },
    ],
    [
        {
            title: 'Dimensions',
            values: [
                { descriptor: 'r', min: 0, max: 5 },
                { descriptor: 'w', min: 0, max: 5 },
            ],
        },
    ],
];
