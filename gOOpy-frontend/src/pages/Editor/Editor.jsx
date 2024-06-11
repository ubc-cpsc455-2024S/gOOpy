import React, { useReducer, useRef, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import RayMarching from './RayMarching/RayMarching';

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

const defaultState = (() => {
    const defaultShapesMap = new Map();
    defaultShapesMap.set(0, 0);
    defaultShapesMap.set(1, 1);
    defaultShapesMap.set(2, 2);
    const defaultBuffer = [...Array(MAX_SIZE)].map(() => {
        return {
            center: new Vector3(0.0, 0.0, 0.0),
            radius: 1.0,
            id: null,
        };
    });
    // TEMPORARY SETTING BUFFER VALUES:
    defaultBuffer[0] = obj1;
    defaultBuffer[1] = obj2;
    defaultBuffer[2] = obj3;
    return {
        shapeIDs: defaultBuffer.slice(0, 3).map((o) => o.id),
        shapesMap: defaultShapesMap,
        nextID: 3, // TODO fix these (reducer initialization function for loading data?)
        shapesCount: 3,
        buffer: defaultBuffer,
    };
})(); // temp for example data

function editorReducer(state, action) {
    const newState = { ...state }; // copy of state to modify
    switch (action.type) {
        case 'addShape':
            // To add a shape, we need to
            // 1. Add the new ID to the state list
            // 2. Add the shapes id -> index mapping
            // 3. Get the first unused object in the list
            // 4. reset it's values, and set ID to nextID (and increment nextID)
            // 5. increment counters
            newState.shapeIDs = [...newState.shapeIDs];
            newState.shapeIDs.push(newState.nextID);
            newState.shapesMap.set(newState.nextID, newState.shapesCount);
            const newShape = newState.buffer[newState.shapesCount];
            newShape.center = new Vector3(0, 0, 0);
            newShape.radius = 1.0;
            newShape.id = newState.nextID;
            newState.nextID += 1;
            newState.shapesCount += 1;
            return newState;
        case 'modifyAxis':
            // Notice: this reducer doesn't actually modify state...
            const { index, newValue, axis } = action.payload;

            // buffer.current[newState.shapesMap.get(index)].center[axis] =
            //     newValue;

            const bufferCopy = newState.buffer;
            console.log(
                'ma',
                bufferCopy[newState.shapesMap.get(index)].center[axis]
            );

            bufferCopy[newState.shapesMap.get(index)].center[axis] = newValue;

            console.log(
                'ma',
                bufferCopy[newState.shapesMap.get(index)].center[axis]
            );

            newState.buffer = bufferCopy;
            // uniforms.current.spheres.value[shapesMap.get(index)].center;
            return newState;
    }
}

function Editor() {
    const [editorData, dispatch] = useReducer(editorReducer, defaultState);
    const { shapeIDs, shapesMap, shapesCount, buffer } = editorData;
    const [currentShape, setCurrentShape] = useState(buffer[0].id);
    // TODO: change 'FF0000' to currentShape's color
    const [color, setColor] = useColor('FF0000');

    console.log('current shape', shapesMap.get(currentShape));

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
                        {shapeIDs.map((shapeID, index) => (
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
                    <RayMarching
                        scale={[2.0, 2.0, 1.0]}
                        buffer={buffer}
                        shapesCount={shapesCount}
                    />
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
