import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { FileLoader } from 'three';

const fragmentShaderPath = '/shaders/raymarching.fs.glsl';
const vertexShaderPath = '/shaders/raymarching.vs.glsl';

export default function RayMarching({
    testPos,
    buffer,
    shapesCount,
    ...props
}) {
    const [vertexShader, fragmentShader] = useLoader(FileLoader, [
        vertexShaderPath,
        fragmentShaderPath,
    ]);

    const uniforms = {
        n_spheres: { type: 'int', value: shapesCount },
        spheres: {
            type: [{ center: 'vec3', radius: 'float' }],
            value: buffer,
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
    };

    console.log('rm', uniforms);

    return (
        <mesh {...props} key={shapesCount}>
            <planeGeometry />
            <rawShaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
