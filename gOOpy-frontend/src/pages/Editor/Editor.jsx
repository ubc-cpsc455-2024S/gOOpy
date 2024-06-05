import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import RayMarching from './RayMarching/RayMarching';

function useEditorData() {
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

    return [sceneObjects, setSceneObjects];
}

function Editor() {
    const [editorData, setEditorData] = useEditorData();

    // unsure if this is the best strat. This lets us keep track of uniforms object to be passed to shader
    const uniforms = useRef({
        n_spheres: { type: 'int', value: 3 },
        spheres: {
            type: [{ center: 'vec3', radius: 'float' }],
            value: editorData,
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
    });

    // updates a scene object's x coordinate based on index
    // I can see this translating to redux quite well, if we decide to go that route.
    function updateSceneObjects(index, newValue) {
        setEditorData((prev) => {
            prev[index].center.x = newValue;
            return prev;
        });
    }

    return (
        <div className='flex justify-between p-5'>
            <div className='sliders'>
                <h1 className='text-3xl font-bold'>Editor</h1>
                <Slider
                    defaultValue={editorData[0].center.x}
                    index={0}
                    updateSceneObjects={updateSceneObjects}
                />
            </div>

            <div>
                <Canvas
                    className='!h-96 !w-96'
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
                >
                    <RayMarching scale={[2.0, 2.0, 1.0]} uniforms={uniforms} />
                </Canvas>
            </div>
        </div>
    );
}

function Slider({ defaultValue, index, updateSceneObjects }) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
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
