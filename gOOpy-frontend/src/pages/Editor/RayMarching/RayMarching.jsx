import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { FileLoader } from 'three';

const fragmentShaderPath = '/shaders/raymarching.fs.glsl';
const vertexShaderPath = '/shaders/raymarching.vs.glsl';

export default function RayMarching({ testPos, shapes, ...props }) {
    const [vertexShader, fragmentShader] = useLoader(FileLoader, [
        vertexShaderPath,
        fragmentShaderPath,
    ]);

    // fill buffer with the SAME buffer object
    // NOTE this is just padding - don't use these objects ever
    const buffer = Array(50).fill({
        center: new Vector3(-1.0, -1.0, 1.0),
        radius: 0.8,
        id: 2,
    });
    // initialize buffer
    shapes.forEach((shape, i) => {
        buffer[i] = shape;
    });

    const uniforms = useRef({
        n_spheres: { type: 'int', value: shapes.length },
        spheres: {
            type: [{ center: 'vec3', radius: 'float' }],
            value: buffer,
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
    });

    useEffect(() => {
        console.log('re-making buffer');
        uniforms.current.n_spheres.value = shapes.length;
        const buffer = Array(50).fill({
            center: new Vector3(-1.0, -1.0, 1.0),
            radius: 0.8,
            id: 2,
        });
        // initialize buffer
        shapes.forEach((shape, i) => {
            buffer[i] = shape;
        });
        uniforms.current.spheres.value = buffer;
    }, [shapes]);

    return (
        <mesh {...props}>
            <planeGeometry />
            <rawShaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms.current}
            />
        </mesh>
    );
}
