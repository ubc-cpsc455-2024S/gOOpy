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

function Editor() {
    const [shapes, setShapes] = useState([obj1, obj2, obj3]);
    const [currentShape, setCurrentShape] = useState(shapes[0].id);

    // help from https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    const updateAxis = (index, newValue, axis) => {
        // This is how you can do it if you must actually update the state
        // let newShapes = [...shapes];
        // newShapes[index].center[axis] = newValue;
        // setShapes(newShapes);

        // It seems it will let us modify the values directly without updating state
        // While this *might* introduce bugs, it may also help with performance?
        shapes[index].center[axis] = newValue;
    };

    const updateRadius = (index, newValue) => {
        shapes[index].radius = newValue;
    };

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
                            onClick={() =>
                                setShapes((state) => {
                                    const newState = [...state];
                                    newState.push({
                                        center: new Vector3(0, 0, 0),
                                        radius: 1.0,
                                        id: state.length,
                                    });
                                    return newState;
                                })
                            }
                        >
                            Add Shape
                        </button>
                        {shapes.map((shape, index) => (
                            <div
                                key={index}
                                className={`border button cursor-pointer ${
                                    currentShape === shape.id
                                        ? 'bg-bg-yellow'
                                        : 'bg-editor-box hover:bg-editor-hover'
                                }`}
                                onClick={() => setCurrentShape(shape.id)}
                            >
                                Shape {shapes[index].id}
                            </div>
                        ))}
                    </div>
                </div>
                <EditorDetails
                    // TODO better way to find the shapes's index?
                    index={shapes.findIndex((s) => s.id === currentShape)}
                    shapes={shapes}
                    updateAxis={updateAxis}
                    updateRadius={updateRadius}
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
                    <RayMarching scale={[2.0, 2.0, 1.0]} shapes={shapes} />
                </Canvas>
            </div>
        </div>
    );
}

function EditorDetails({ index, shapes, updateAxis, updateRadius }) {
    // TODO: change 'FF0000' to currentShape's color
    const [color, setColor] = useColor('FF0000');
    return (
        <div className='sliders border ms-2' key={index}>
            <h4 className='text-2xl font-bold'>
                Shape {shapes[index].id} &gt; Properties
            </h4>
            <div className='border flex flex-col p-2'>
                <h4 className='text-1xl font-bold'>Transform</h4>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>x:</h4>
                    <Slider
                        defaultValue={shapes[index].center.x}
                        index={index}
                        callback={updateAxis}
                        callbackParams={['x']}
                    />
                </div>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>y:</h4>
                    <Slider
                        defaultValue={shapes[index].center.y}
                        index={index}
                        callback={updateAxis}
                        callbackParams={['y']}
                    />
                </div>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>z:</h4>
                    <Slider
                        defaultValue={shapes[index].center.z}
                        index={index}
                        callback={updateAxis}
                        callbackParams={['z']}
                    />
                </div>
            </div>
            <div className='border flex flex-col p-2'>
                <h4 className='text-1xl font-bold'>Radius</h4>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>x:</h4>
                    <Slider
                        defaultValue={shapes[index].radius}
                        index={index}
                        callback={updateRadius}
                        min={0}
                    />
                </div>
            </div>
            <div className='border flex flex-col p-2'>
                <h4 className='text-1xl font-bold mr-2'>Colour</h4>
                <ColorPicker
                    color={color}
                    onChange={setColor}
                    hideAlpha={true}
                    hideInput={true}
                />
            </div>
        </div>
    );
}

function Slider({
    defaultValue,
    index,
    callback,
    callbackParams = [],
    max = 5,
    min = -5,
}) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setVal(newValue);
                callback(index, newValue, ...callbackParams);
            }}
            type='range'
            min={min}
            max={max}
            step='0.001'
        ></input>
    );
}

export default Editor;
