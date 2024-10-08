import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { GLSL3, Matrix4, Vector3 } from 'three';
import { FileLoader } from 'three';

const fragmentShaderPath = '/shaders/raymarching.fs.glsl';
const vertexShaderPath = '/shaders/raymarching.vs.glsl';

const defaultShape = {
    translation: new Vector3(-1.0, -1.0, 1.0),
    transform: new Matrix4(),
    property1: 0.8,
    property2: 0.8,
    property3: 0.8,
    property4: 0.8,
    id: -1,
};

export default function RayMarching({ testPos, shapes, skybox, ...props }) {
    const [vertexShader, fragmentShader] = useLoader(FileLoader, [
        vertexShaderPath,
        fragmentShaderPath,
    ]);

    const uniforms = useRef({
        n_shapes: { type: 'int', value: shapes.length },
        shapes: {
            type: [
                {
                    translation: 'vec3',
                    property1: 'float',
                    property2: 'float',
                    property3: 'float',
                    property4: 'float',
                    shape_type: 'int',
                    transform: 'mat4',
                },
            ],
            value: Array(50).fill(defaultShape),
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
        skybox_col: { type: 'vec4', value: skybox.color },
        skybox_l_color: { type: 'vec3', value: skybox.lightColor },
        ambientIntensity: { type: 'float', value: skybox.ambientIntensity },
    });

    function setBuffer() {
        console.log('re-making buffer');
        uniforms.current.n_shapes.value = shapes.length;
        // fill buffer with the SAME buffer object
        // NOTE this is just padding - don't use these objects ever
        const buffer = Array(50).fill(defaultShape);
        // initialize buffer
        shapes.forEach((shape, i) => {
            buffer[i] = shape;
        });
        uniforms.current.shapes.value = buffer;
    }

    useEffect(() => {
        setBuffer();
    }, [shapes]);

    useEffect(() => {
        uniforms.current.skybox_col.value = skybox.color;
    }, [skybox.color]);

    useEffect(() => {
        uniforms.current.skybox_l_color.value = skybox.lightColor;
    }, [skybox.lightColor]);

    useEffect(() => {
        uniforms.current.ambientIntensity.value = skybox.ambientIntensity;
    }, [skybox.ambientIntensity]);

    return (
        <mesh {...props}>
            <planeGeometry />
            <rawShaderMaterial
                glslVersion={GLSL3}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms.current}
            />
        </mesh>
    );
}
