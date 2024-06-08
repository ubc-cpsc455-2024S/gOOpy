import React, { useReducer, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import RayMarching from './RayMarching/RayMarching';

/**
 *  useEditorData is a custom react hook to handle state management for our 3D scene editor
 */
function useEditorData() {
    // hard coded list of objects (temporary)
    const obj1 = {
        center: new Vector3(0.0, 0.0, 0.0),
        radius: 1.0,
        id: 0,
    };
    const obj2 = {
        center: new Vector3(1.0, 1.0, 1.0),
        radius: 1.3,
        id: 1,
    };
    const obj3 = {
        center: new Vector3(-1.0, -1.0, 1.0),
        radius: 0.8,
        id: 2,
    };

    const MAX_SIZE = 3; // should match shaders
    let shapesCount = 3; // EDIT FIX THIS LATER (reducer initialization function for loading data?)
    let nextID = 3; // fix later
    const shapesMap = new Map();
    const buffer = [...Array(MAX_SIZE)].map(() => {
        return {
            center: new Vector3(0.0, 0.0, 0.0),
            radius: 1.0,
            id: null,
        };
    });

    // TEMPORARY SETTING BUFFER VALUES:
    buffer[0] = obj1;
    buffer[1] = obj2;
    buffer[2] = obj3;

    const [state, dispatch] = useReducer((state, action) => {
        const newState = [...state]; // copy of state to modify
        switch (action.type) {
            case 'addShape':
                const { shapeType } = action.payload;
                // TODO change this based on type? or different reducer per type
                shapesCount += 1;
                let shapeData = buffer[shapesCount];
                shapeData.center = new Vector3(0.0, 0.0, 0.0);
                shapeData.radius = 1.0;
                shapeData.radius = nextID;
                newState.append(shapeData);
                shapesMap.set(nextID, shapesCount - 1);
                nextID++;
                return newState;
            case 'modifyAxis':
                // temp demo action
                const { index, newValue, axis } = action.payload;
                newState[index].center[axis] = newValue;
                return newState;
        }
    }, buffer.slice(0, 3));

    // unsure if this is the best strat. This lets us keep track of uniforms object to be passed to shader
    const uniforms = useRef({
        n_spheres: { type: 'int', value: shapesCount },
        spheres: {
            type: [{ center: 'vec3', radius: 'float' }],
            value: buffer,
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
    });

    return [state, dispatch, uniforms];
}

function Editor() {
    const [editorData, dispatch, uniforms] = useEditorData();
    const [currentShape, selectShape] = useState(editorData[0].id);

    return (
        <div className='flex justify-between p-5'>
            <div className='flex'>
            <div className='sliders border'>
                <h1 className='text-3xl font-bold'>Editor</h1>
                {/* <Slider
                    defaultValue={editorData[0].center.x}
                    index={0}
                    dispatch={dispatch}
                /> */}
                <div
                    className='overflow-auto ...'
                    style={{ minHeight: '80vh', minWidth: '10vw' }}
                >
                    {editorData.map((option, index) => (
                        <div
                            key={index}
                            className='border button'
                            onClick={() => selectShape(option.id)}
                        >
                            Shape {option.id}
                        </div>
                    ))}
                </div>
            </div>
            <div className='sliders border ms-2'>
            <h4 className='text-2xl font-bold'>Shape {currentShape} &gt; Properties</h4>
            <div className='border flex flex-col p-2'>
            <h4 className='text-1xl font-bold'>Transform</h4>
            <div className='flex'>
            <h4 className='text-1xl font-bold mr-2'>x:</h4>               
                <Slider
                    defaultValue={editorData[0].center.x}
                    index={currentShape}
                    dispatch={dispatch}
                    axis={"x"}
                />
            </div>
            <div className='flex'>
            <h4 className='text-1xl font-bold mr-2'>y:</h4>               
                <Slider
                    defaultValue={editorData[0].center.y}
                    index={currentShape}
                    dispatch={dispatch}
                    axis={"y"}
                />
            </div>
            <div className='flex'>
            <h4 className='text-1xl font-bold mr-2'>z:</h4>               
                <Slider
                    defaultValue={editorData[0].center.z}
                    index={currentShape}
                    dispatch={dispatch}
                    axis={"z"}
                />
            </div>

            </div>
            </div>
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

function Slider({ defaultValue, index, dispatch, axis}) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                dispatch({
                    type: 'modifyAxis',
                    payload: { index, newValue, axis },
                });
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
