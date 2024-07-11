import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import RayMarching from './RayMarching/RayMarching';
import ShapeManager from '../../components/ShapeManager';
import ShapeDetails from '../../components/ShapeDetails';

// hard coded list of objects (temporary)
// TODO: make sure shape has property1 and shape type
const obj1 = {
    center: new Vector3(0.0, 0.0, 0.0),
    radius: 1.0,
    get property1() {
        return this.radius;
    },
    shape_type: 'Sphere',
    id: 0,
};
const obj2 = {
    center: new Vector3(1.0, 1.0, 1.0),
    radius: 1.3,
    get property1() {
        return this.radius;
    },
    shape_type: 'Sphere',
    id: 1,
};
const obj3 = {
    center: new Vector3(-1.0, -1.0, 1.0),
    radius: 0.8,
    get property1() {
        return this.radius;
    },
    shape_type: 'Sphere',
    id: 2,
};

const MAX_SIZE = 50; // should match shaders

function Editor() {
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchShape = async () => {
            try {
                const resp = await axios.get('http://127.0.0.1:3000/scene/ab');
                if (resp.data) {
                    let data = resp.data;
                    console.log(data.shapes);
                    setShapes(data.shapes);
                }
            } catch (error) {
                setLoading(true);
            }
            setLoading(false);
        };
        fetchShape();
    }, []);

    if (loading) {
        return <p>loading</p>;
    }

    return (
        <div className='flex justify-between p-5'>
            <div className='flex'>
                <ShapeManager
                    shapes={shapes}
                    currentShape={currentShape}
                    setShapes={setShapes}
                    setCurrentShape={setCurrentShape}
                    setCurrIndex={setCurrIndex}
                    determineNewID={determineNewID}
                />
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
