import { Canvas, useFrame, useThree } from '@react-three/fiber';
import RayMarching from '../pages/Editor/RayMarching/RayMarching';
import { Matrix4, Vector3, Vector4 } from 'three';
import { buildMatrices } from '../pages/Editor/matrixHelpers';

const logo_floor = [
    {
        translation: { x: 0, y: -3.518, z: -1.982 },
        scale: { x: 1, y: 1, z: 1 },
        rotation: { x: -0.529, y: 0, z: 0 },
        property1: 3,
        property2: 1.943,
        property3: 1,
        property4: 0.314,
        shape_type: 1,
        id: 0,
    },
];
const logo_g = [
    {
        translation: { x: -3.712, y: 1.943, z: 5 },
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
        translation: { x: -5, y: 2.09, z: 4.566 },
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
        translation: { x: -4.985, y: -0.816, z: 5 },
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
const logo_o1 = [
    {
        translation: { x: -1.471, y: 1.86, z: 3.858 },
        property1: 1.441,
        property2: 0.318,
        property3: 0.2,
        property4: 0.2,
        rotation: { x: -1.624, y: 0.943, z: 0.319 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 2,
        id: 5,
    },
];
const logo_o2 = [
    {
        translation: { x: 1.686, y: 1.886, z: 4.01 },
        property1: 1.479,
        property2: 0.318,
        property3: 0.2,
        property4: 0.2,
        rotation: { x: -1.42, y: 0.229, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 2,
        id: 4,
    },
];

const logo_p = [
    {
        translation: { x: 3.595, y: 0.509, z: 5 },
        property1: 0.239,
        property2: 0.5,
        property3: 2.295,
        property4: 0.2,
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 3,
        id: 8,
    },
    {
        translation: { x: 5, y: 2.217, z: 5 },
        property1: 0.884,
        property2: 0.344,
        property3: 0.2,
        property4: 0.2,
        rotation: { x: -1.497, y: -0.102, z: -0.465 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 2,
        id: 9,
    },
];

const logo_y = [
    {
        translation: { x: 4.779, y: -2.095, z: 5 },
        property1: 0.211,
        property2: 0.5,
        property3: 2.212,
        property4: 0.2,
        rotation: { x: 0.027, y: 0.45, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        shape_type: 3,
        id: 10,
    },
];

export function LiveLogo() {
    return (
        <div className='w-96 h-96 z-0'>
            <Canvas
                className=''
                orthographic
                camera={{
                    left: -1,
                    right: 1,
                    top: 1,
                    bottom: -1,
                    near: 0,
                    far: 1,
                    position: [0, 0, 0.5],
                }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <LogoWrapper />
            </Canvas>
        </div>
    );
}

const shapes = buildMatrices([
    // ...logo_floor,
    ...logo_g,
    ...logo_o1,
    ...logo_o2,
    ...logo_p,
    ...logo_y,
]);

function LogoWrapper() {
    const { clock } = useThree();

    useFrame(() => {
        buildMatrices(logo_g);
        const move = new Matrix4().makeTranslation(
            0.0,
            0.5 * Math.sin(clock.getElapsedTime()),
            0.5 + 0.2 * Math.cos(clock.getElapsedTime() + 0.2)
        );
        logo_g.forEach((s) => s.transform.multiply(move));
    });

    useFrame(() => {
        buildMatrices(logo_o1);
        const move = new Matrix4().makeTranslation(
            -0.3 * Math.sin(clock.getElapsedTime()),
            -0.2 * Math.sin(clock.getElapsedTime()),
            -0.1 * Math.cos(clock.getElapsedTime() + 1.3)
        );
        logo_o1.forEach((s) => s.transform.multiply(move));
    });

    useFrame(() => {
        buildMatrices(logo_o2);
        const move = new Matrix4().makeTranslation(
            0.3 * Math.sin(clock.getElapsedTime() + 1.3),
            0.1 * Math.sin(clock.getElapsedTime()),
            0.0
        );
        logo_o2.forEach((s) => s.transform.multiply(move));
    });

    useFrame(() => {
        buildMatrices(logo_p);
        const move = new Matrix4().makeTranslation(
            0.1 * Math.cos(clock.getElapsedTime() + 2),
            0.2 * Math.sin(clock.getElapsedTime()),
            0.0
        );
        logo_p.forEach((s) => s.transform.multiply(move));
    });

    useFrame(() => {
        buildMatrices(logo_y);
        const move = new Matrix4().makeTranslation(
            0.0,
            0.0 - 0.2 * Math.sin(clock.getElapsedTime() + 1.0),
            -0.1 * Math.cos(clock.getElapsedTime())
        );
        logo_y.forEach((s) => s.transform.multiply(move));
    });

    return (
        <RayMarching
            scale={[2.0, 2.0, 1.0]}
            shapes={shapes}
            skybox={{
                color: new Vector4(0, 0.7, 1, 1),
                lightColor: new Vector3(0, 1, 0.16, 1),
                ambientIntensity: 0.2,
            }}
        />
    );
}
