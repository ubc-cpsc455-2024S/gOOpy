import React, { useReducer, useRef, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
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

    const MAX_SIZE = 50; // should match shaders
    let [shapesCount, setShapesCount] = useState(3); // EDIT FIX THIS LATER (reducer initialization function for loading data?)
    let [nextID, setNextId] = useState(3); // fix later
    const shapesMap = new Map();

    // unsure if this is the best strat. This lets us keep track of uniforms object to be passed to shader
    const uniforms = useRef({
        n_spheres: { type: 'int', value: shapesCount },
        spheres: {
            type: [{ center: 'vec3', radius: 'float' }],
            value: [...Array(MAX_SIZE)].map(() => {
                return {
                    center: new Vector3(0.0, 0.0, 0.0),
                    radius: 1.0,
                    id: null,
                };
            }),
        },
        camera_pos: {
            type: 'vec3',
            value: new Vector3(0.0, 0.0, -3.0),
        },
    });

    // TEMPORARY SETTING BUFFER VALUES:
    uniforms.current.spheres.value[0] = obj1;
    uniforms.current.spheres.value[1] = obj2;
    uniforms.current.spheres.value[2] = obj3;
    shapesMap.set(0, 0);
    shapesMap.set(1, 1);
    shapesMap.set(2, 2);

    const [state, dispatch] = useReducer(
        (state, action) => {
            const newState = [...state]; // copy of state to modify
            switch (action.type) {
                case 'addShape':
                    // To add a shape, we need to
                    // 1. Add the new ID to the state list
                    // 2. Add the shapes id -> index mapping
                    // 3. Get the first unused object in the list
                    // 4. reset it's values, and set ID to nextID (and increment nextID)
                    // 5. increment counters
                    const buffer = uniforms.current.spheres.value;
                    newState.push(nextID);
                    shapesMap.set(nextID, shapesCount);
                    const newObject = buffer[shapesCount];
                    newObject.center = new Vector3(0, 0, 0);
                    newObject.radius = 1.0;
                    newObject.id = nextID;
                    console.log(buffer[shapesMap.get(nextID)]);
                    setNextId((id) => id + 1);
                    setShapesCount((c) => c + 1);
                    return newState;
                case 'modifyAxis':
                    // Notice: this reducer doesn't actually modify state...
                    const { index, newValue, axis } = action.payload;
                    uniforms.current.spheres.value[shapesMap.get(index)].center[
                        axis
                    ] = newValue;
                    return newState;
            }
        },
        uniforms.current.spheres.value.slice(0, 3).map((o) => o.id) // temp for example data
    );

    return [state, dispatch, uniforms, shapesMap];
}

function Editor() {
    const [editorData, dispatch, uniforms, shapesMap] = useEditorData();
    const buffer = uniforms.current.spheres.value;
    const [currentShape, setCurrentShape] = useState(buffer[0].id);
    // TODO: change 'FF0000' to currentShape's color
    const [color, setColor] = useColor('FF0000');

    console.log(shapesMap.get(currentShape));

    return (
        <div className='flex justify-between p-5'>
            <div className='flex'>
                <div className='sliders border'>
                    <h1 className='text-3xl font-bold'>Editor</h1>
                    <div
                        className='overflow-auto ...'
                        // TODO move this custom CSS to tailwind somehow
                        style={{ minHeight: '80vh', minWidth: '10vw' }}
                    >
                        <button
                            onClick={() => {
                                dispatch({ type: 'addShape' });
                            }}
                        >
                            Add Shape
                        </button>
                        {editorData.map((shapeID, index) => (
                            <div
                                key={index}
                                className={`border button ${
                                    currentShape === shapeID
                                        ? 'bg-bg-yellow'
                                        : 'bg-editor-box'
                                }`}
                                onClick={() => setCurrentShape(shapeID)}
                            >
                                Shape {shapeID}
                            </div>
                        ))}
                    </div>
                </div>
                {/* todo: remove key and refactor this to be a component */}
                <div className='sliders border ms-2' key={currentShape}>
                    <h4 className='text-2xl font-bold'>
                        Shape {currentShape} &gt; Properties
                    </h4>
                    <div className='border flex flex-col p-2'>
                        <h4 className='text-1xl font-bold'>Transform</h4>
                        <div className='flex'>
                            <h4 className='text-1xl font-bold mr-2'>x:</h4>
                            <Slider
                                defaultValue={
                                    buffer[shapesMap.get(currentShape)].center.x
                                }
                                index={currentShape}
                                dispatch={dispatch}
                                axis={'x'}
                            />
                        </div>
                        <div className='flex'>
                            <h4 className='text-1xl font-bold mr-2'>y:</h4>
                            <Slider
                                defaultValue={
                                    buffer[shapesMap.get(currentShape)].center.y
                                }
                                index={currentShape}
                                dispatch={dispatch}
                                axis={'y'}
                            />
                        </div>
                        <div className='flex'>
                            <h4 className='text-1xl font-bold mr-2'>z:</h4>
                            <Slider
                                defaultValue={
                                    buffer[shapesMap.get(currentShape)].center.z
                                }
                                index={currentShape}
                                dispatch={dispatch}
                                axis={'z'}
                            />
                        </div>
                    </div>
                    <div className='border flex flex-col p-2'>
                        <h4 className='text-1xl font-bold mr-2'>
                            Object Color
                        </h4>
                        <ColorPicker
                            color={color}
                            onChange={setColor}
                            hideAlpha={true}
                            hideInput={true}
                        />
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

function Slider({ defaultValue, index, dispatch, axis }) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                // console.log(index, newValue, axis);
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
