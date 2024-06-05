import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { FileLoader } from 'three';

const fragmentShaderPath = '/shaders/raymarching.fs.glsl';
const vertexShaderPath = '/shaders/raymarching.vs.glsl';

export default function RayMarching({ testPos, uniforms, ...props }) {
    const { clock } = useThree();
    const [vertexShader, fragmentShader] = useLoader(FileLoader, [
        vertexShaderPath,
        fragmentShaderPath,
    ]);

    // this is just for fun. remove when actual editor built
    useFrame(() => {
        uniforms.current.spheres.value[2].center.y = Math.sin(
            clock.getElapsedTime()
        );
        uniforms.current.spheres.value[2].center.z =
            -0.5 + 0.5 * Math.sin(clock.getElapsedTime());
    });

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
