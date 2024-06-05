import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import RayMarching from './RayMarching/RayMarching';

/**
 *  useEditorData is a custom react hook to handle state management for our 3D scene editor
 *  TODO this hook should handle scene object data as described in discord (or maybe slightly differently?)
 */
function useEditorData() {
    // hard coded list of objects (temporary)
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

    // UPDATE FUNCTION FOR CUSTOM HOOK
    // TODO Eventually this will be used to sync our multiple data structures
    // Maybe we can actually change this to use usereducer instead of usestate for this hook?
    // https://react.dev/reference/react/useReducer
    function setEditorData(index, newValue) {
        setSceneObjects((prev) => {
            prev[index].center.x = newValue;
            return prev;
        });
    }

    return [sceneObjects, setEditorData, uniforms];
}

function Editor() {
    const [editorData, setEditorData, uniforms] = useEditorData();

    return (
        <div className='flex justify-between p-5'>
            <div className='sliders'>
                <h1 className='text-3xl font-bold'>Editor</h1>
                <Slider
                    defaultValue={editorData[0].center.x}
                    index={0}
                    setEditorData={setEditorData}
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

function Slider({ defaultValue, index, setEditorData }) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setEditorData(index, newValue);
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
