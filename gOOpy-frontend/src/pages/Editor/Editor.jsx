import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FileLoader, Vector3 } from 'three';

const fragmentShaderPath = '/shaders/raymarching.fs.glsl';
const vertexShaderPath = '/shaders/raymarching.vs.glsl';

function RayMarching({ testPos, uniforms, ...props }) {
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

function Editor() {
    // hard coded list of objects
    const obj1 = {
        center: new Vector3(0.0, 0.0, 0.0),
        radius: 1.0,
    };
    const obj2 = {
        center: new Vector3(1.0, 1.0, 1.0),
        radius: 1.3,
    };
    const obj3 = {
        center: new Vector3(-1.0, -1.0, 1.0),
        radius: 0.8,
    };

    // the current objects in the scene
    const [sceneObjects, setSceneObjects] = useState([obj1, obj2, obj3]);

    // unsure if this is the best strat. This lets us keep track of uniforms object to be passed to shader
    const uniforms = useRef({
        n_spheres: { type: 'int', value: 3 },
        spheres: {
            type: [{ center: 'vec3', radius: 'float' }],
            value: sceneObjects,
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
    });

    // updates a scene object's x coordinate based on index
    // I can see this translating to redux quite well, if we decide to go that route.
    function updateSceneObjects(index, newValue) {
        setSceneObjects((prev) => {
            prev[index].center.x = newValue;
            return prev;
        });
    }

    return (
        <>
            <Canvas
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
                style={{ width: 500, height: 500 }}
            >
                <RayMarching scale={[2.0, 2.0, 1.0]} uniforms={uniforms} />
            </Canvas>
            <div>
                <Slider
                    defaultValue={sceneObjects[0].center.x}
                    index={0}
                    updateSceneObjects={updateSceneObjects}
                />
            </div>
        </>
    );
}

function Slider({ defaultValue, index, updateSceneObjects }) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
            style={{ width: '500px' }}
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                updateSceneObjects(index, newValue);
                setVal(newValue);
            }}
            type='range'
            min='-5'
            max='5'
            step='0.001'
        ></input>
    );
}

export default Editor;
