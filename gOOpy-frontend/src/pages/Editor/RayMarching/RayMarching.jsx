import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3, Vector4 } from 'three';
import { FileLoader } from 'three';

const fragmentShaderPath = '/shaders/raymarching.fs.glsl';
const vertexShaderPath = '/shaders/raymarching.vs.glsl';

export default function RayMarching({ testPos, shapes, skybox, ...props }) {
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
        skybox_col: { type: 'vec4', value: skybox.color },
        skybox_l_color: { type: 'vec3', value: skybox.lightColor },
        ambientIntensity: { type: 'float', value: skybox.ambientIntensity },
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

    useEffect(() => {
        uniforms.current.skybox_col.value = skybox.color;
    }, [skybox.color]);

    useEffect(() => {
        uniforms.current.skybox_l_color.value = skybox.lightColor;
    }, [skybox.lightColor]);

    useEffect(() => {
        console.log(skybox.ambientIntensity);
        uniforms.current.ambientIntensity.value = skybox.ambientIntensity;
    }, [skybox.ambientIntensity]);

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
