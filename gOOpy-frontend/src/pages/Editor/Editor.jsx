import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { AmbientLight, Color, Vector3, Vector4 } from 'three';
import RayMarching from './RayMarching/RayMarching';
import ShapeManager from '../../components/ShapeManager';
import ShapeDetails from '../../components/ShapeDetails';
import GoopyButton from '../../components/GoopyButton';
import SceneManager from '../../components/SceneManager';
import { useColor } from 'react-color-palette';
import Slider from '../../components/Slider';

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
    const [loading, setLoading] = useState(true);
    const [shapes, setShapes] = useState([obj1, obj2, obj3]);
    const [currentShape, setCurrentShape] = useState(null);
    const [currentIndex, setCurrIndex] = useState(() => {
        return Math.max(...shapes.map((shape) => shape.id), 0);
    });
    const [skyboxColor, setSkyboxColor] = useColor('FFFFFF');
    const [skyboxLightColor, setSkyboxLightColor] = useColor('white');
    const [skyboxAmbientIntensity, setAmbientIntensity] = useState(0.2);
    const [editorView, setEditorView] = useState('shapes');

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
                <div>
                    <div className='flex flex-row border-t border-l border-r overflow-scroll bg-panel-primary'>
                        <GoopyButton
                            classes='border-r p-2'
                            onClick={() => {
                                setEditorView('shapes');
                            }}
                        >
                            Shapes
                        </GoopyButton>
                        <GoopyButton
                            classes='border-r p-2'
                            onClick={() => {
                                setEditorView('scene');
                            }}
                        >
                            Scene
                        </GoopyButton>
                    </div>
                    <div style={{ width: '20vw', height: '80vh' }}>
                        {editorView == 'shapes' && (
                            <ShapeManager
                                shapes={shapes}
                                currentShape={currentShape}
                                setShapes={setShapes}
                                setCurrentShape={setCurrentShape}
                                setCurrIndex={setCurrIndex}
                                determineNewID={determineNewID}
                            />
                        )}
                        {editorView == 'scene' && (
                            <SceneManager
                                skyboxColController={setSkyboxColor}
                                skyboxColor={skyboxColor}
                                skyboxLightController={setSkyboxLightColor}
                                skyboxLightColor={skyboxLightColor}
                                skyboxAmbientController={setAmbientIntensity}
                                skyboxAmbient={skyboxAmbientIntensity}
                            ></SceneManager>
                        )}
                    </div>
                </div>
                {currentShape != null &&
                    editorView == 'shapes' &&
                    shapes.length > 0 && (
                        <ShapeDetails
                            // TODO better way to find the shapes's index?
                            index={shapes.findIndex(
                                (s) => s.id === currentShape
                            )}
                            shapes={shapes}
                            updateAxis={updateAxis}
                            updateRadius={updateRadius}
                            Slider={Slider}
                        />
                    )}
            </div>

            <div>
                <Canvas
                    style={{ width: '50vw' }}
                    className='h-full'
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
                        scale={[1.5, 1.0, 1.0]}
                        shapes={shapes}
                        skybox={{
                            color: new Vector4(
                                skyboxColor.rgb.r / 255,
                                skyboxColor.rgb.g / 255,
                                skyboxColor.rgb.b / 255,
                                1 - skyboxColor.rgb.a / 255
                            ),
                            lightColor: new Vector3(
                                skyboxLightColor.rgb.r / 255,
                                skyboxLightColor.rgb.g / 255,
                                skyboxLightColor.rgb.b / 255
                            ),
                            ambientIntensity: skyboxAmbientIntensity,
                        }}
                    />
                </Canvas>
            </div>
        </div>
    );
}

export default Editor;
