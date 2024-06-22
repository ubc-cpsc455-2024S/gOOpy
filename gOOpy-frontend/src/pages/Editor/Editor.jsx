import React, { useReducer, useRef, useState } from 'react';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import RayMarching from './RayMarching/RayMarching';
import GoopyButton from '../../components/GoopyButton';
import ShapeManager from '../../components/ShapeManager';
import ShapeDetails from '../../components/ShapeDetails';

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
    const [currentShape, setCurrentShape] = useState(null);
    const [currentIndex, setCurrIndex] = useState(() => {
        return Math.max(...shapes.map((shape) => shape.id), 0);
    });

    // help from https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    const updateAxis = (index, newValue, axis) => {
        if (currentShape == null) {
            return;
        }
        // This is how you can do it if you must actually update the state
        // let newShapes = [...shapes];
        // newShapes[index].center[axis] = newValue;
        // setShapes(newShapes);

        // It seems it will let us modify the values directly without updating state
        // While this *might* introduce bugs, it may also help with performance?
        shapes[index].center[axis] = newValue;
    };

    const updateRadius = (index, newValue) => {
        if (currentShape == null) {
            return;
        }
        shapes[index].radius = newValue;
    };

    const determineNewID = () => {
        const newCurrIndex = currentIndex + 1;
        setCurrIndex(newCurrIndex);
        return newCurrIndex;
    };

    return (
        <div className='flex justify-between p-5'>
            <div className='flex'>
<<<<<<< HEAD
                <div className='sliders border'>
                    <h1 className='text-3xl font-bold'>Editor</h1>
                    <div
                        className='no-scrollbar overflow-y-auto border'
                        // TODO move this custom CSS to tailwind somehow
                        style={{
                            height: '65vh', // changed this so that editor fits on page
                            minWidth: '12vw',
                        }}
                    >
                        {shapes.map((shape, index) => (
                            <div className='flex justify-between' key={index}>
                                <GoopyButton
                                    styleClasses={`border-b button cursor-pointer flex w-full`}
                                    onClickBehavior={() => {
                                        setCurrentShape(
                                            shape.id == currentShape
                                                ? null
                                                : shape.id
                                        );
                                    }}
                                    hovering={currentShape === shape.id}
                                >
                                    <p className='ps-1'>
                                        Shape {shapes[index].id}
                                    </p>
                                </GoopyButton>
                                {currentShape != shape.id && (
                                    <GoopyButton
                                        styleClasses={`border-l border-b pl-1 pr-1`}
                                        onClickBehavior={(e) => {
                                            setShapes((state) => {
                                                const newState = [...state];
                                                let index = newState.indexOf(
                                                    newState.find(
                                                        (s) => s.id == shape.id
                                                    )
                                                );
                                                newState.splice(index, 1);
                                                return newState;
                                            });
                                            e.stopPropagation();
                                        }}
                                        hovering={false}
                                    >
                                        <p>X</p>
                                    </GoopyButton>
                                )}
                            </div>
                        ))}
                    </div>
                    <GoopyButton
                        styleClasses='border-l border-r border-b p-1'
                        onClickBehavior={() => {
                            const newId = determineNewID();
                            setShapes((state) => {
                                const newState = [...state];
                                newState.push({
                                    center: new Vector3(0, 0, 0),
                                    radius: 1.0,
                                    id: newId,
                                });
                                return newState;
                            });
                            setCurrentShape(newId);
                        }}
                    >
                        Add Shape
                    </GoopyButton>
                    <GoopyButton
                        styleClasses='border-l border-r border-b p-1'
                        onClickBehavior={() => {
                            setShapes((state) => {
                                return [];
                            });
                            setCurrentShape(null);
                        }}
                    >
                        Reset Scene
                    </GoopyButton>
                    <GoopyButton
                        styleClasses='border-l border-r border-b p-1'
                        onClickBehavior={() => {
                            // TODO for shiyu!!! save scene to redux store
                            let data = {
                                shapes: shapes,
                                metadata: {
                                    userId: 123, // fake user id for now
                                    title: 'new',
                                    lastEdited: new Date(),
                                },
                            };
                            let jsonData = JSON.stringify(data);
                            console.log(jsonData);
                        }}
                    >
                        Save Scene
                    </GoopyButton>
                </div>

=======
                <ShapeManager
                    shapes={shapes}
                    currentShape={currentShape}
                    setShapes={setShapes}
                    setCurrentShape={setCurrentShape}
                    setCurrIndex={setCurrIndex}
                    determineNewID={determineNewID}
                />
>>>>>>> 0f3d8acb187682400d51ad52412252ba077b5cf7
                {currentShape != null && shapes.length > 0 && (
                    <ShapeDetails
                        // TODO better way to find the shapes's index?
                        index={shapes.findIndex((s) => s.id === currentShape)}
                        shapes={shapes}
                        updateAxis={updateAxis}
                        updateRadius={updateRadius}
                        Slider={Slider}
                    />
                )}
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
