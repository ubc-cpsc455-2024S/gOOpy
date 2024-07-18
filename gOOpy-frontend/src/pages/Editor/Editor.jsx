import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { Vector3, Vector4 } from 'three';
import RayMarching from './RayMarching/RayMarching';
import ShapeManager from '../../components/ShapeManager';
import ShapeDetails from '../../components/ShapeDetails';
import { useParams } from 'react-router-dom';
import SceneManager from '../../components/SceneManager';
import { useColor } from 'react-color-palette';
import { SHAPE_TYPES } from './constants';
import { getSceneInfo, saveSceneInfo } from '../../apiCalls/sceneAPI';

const THUMBNAIL_HEIGHT = 250;
const THUMBNAIL_WIDTH = 250;

// hard coded list of objects (temporary)
// TODO: make sure shape has property1 and shape type
const obj1 = {
    center: new Vector3(0.0, 0.0, 0.0),
    property1: 1.0,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Sphere,
    id: 0,
};
const obj2 = {
    center: new Vector3(1.0, 1.0, 1.0),
    property1: 1.3,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Sphere,
    id: 1,
};
const obj3 = {
    center: new Vector3(-1.0, -1.0, 1.0),
    property1: 0.8,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Box,
    id: 2,
};

export const fetchShapes = async (
    setLoading,
    setShapes,
    setNextId,
    sceneId
) => {
    fetchUserInfo: try {
        if (!sceneId) break fetchUserInfo;
        let resp = await getSceneInfo(sceneId);
        if (resp.data) {
            let data = resp.data;
            setShapes(data.shapes);
            setNextId(Math.max(...data.shapes.map((shape) => shape.id), 0));
        }
    } catch (error) {
        setLoading(true);
    }
    setLoading(false);
};

export const saveResult = async (sceneId, shapes) => {
    let data = {
        shapes: shapes,
        metadata: {
            // TODO: determine if oauth_id or _id from mongoDB
            user_id: '668f76634cfd55de99230ca9',
            title: 'new_model',
            lastEdited: new Date(),
            thumbnail: resizeImage(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT),
        },
    };
    await saveSceneInfo(sceneId, data);
};

function Editor() {
    const [loading, setLoading] = useState(true);
    const [shapes, setShapes] = useState([obj1, obj2, obj3]);
    const [currentShape, setCurrentShape] = useState(null);
    const [nextId, setNextId] = useState(() => {
        return Math.max(...shapes.map((shape) => shape.id), 0);
    });

    const { sceneId } = useParams();
    const [skyboxColor, setSkyboxColor] = useColor('FFFFFF');
    const [skyboxLightColor, setSkyboxLightColor] = useColor('white');
    const [skyboxAmbientIntensity, setAmbientIntensity] = useState(0.2);
    const [editorView, setEditorView] = useState('shapes');

    const determineNewID = () => {
        const newNextId = nextId + 1;
        setNextId(newNextId);
        return newNextId;
    };

    useEffect(() => {
        fetchShapes(setLoading, setShapes, setNextId, sceneId);
    }, []);

    if (loading) {
        return <p>loading</p>;
    }

    return (
        <div className='flex justify-between p-5'>
            <div className='flex absolute top-0 start-0 h-screen w-screen z-10'>
                <div className='mt-14 ml-5 editor-panel flex flex-col'>
                    <div className='grow'>
                        {editorView == 'shapes' && (
                            <ShapeManager
                                sceneId={sceneId}
                                shapes={shapes}
                                currentShape={currentShape}
                                setShapes={setShapes}
                                setCurrentShape={setCurrentShape}
                                determineNewID={determineNewID}
                                setEditorView={setEditorView}
                                saveResult={saveResult}
                            />
                        )}
                        {editorView == 'scene' && (
                            <SceneManager
                                skyboxColController={setSkyboxColor}
                                skyboxColor={skyboxColor}
                                skyboxLightController={setSkyboxLightColor}
                                skyboxLightColor={skyboxLightColor}
                                setAmbientIntensity={setAmbientIntensity}
                                skyboxAmbient={skyboxAmbientIntensity}
                                setEditorView={setEditorView}
                            ></SceneManager>
                        )}
                    </div>
                </div>
                <div className='mt-14 editor-panel'>
                    {currentShape != null &&
                        editorView == 'shapes' &&
                        shapes.length > 0 && (
                            <ShapeDetails
                                // TODO better way to find the shapes's index?
                                index={shapes.findIndex(
                                    (s) => s.id === currentShape
                                )}
                                shapes={shapes}
                            />
                        )}
                </div>
            </div>

            <div className='w-96 h-96 z-0 absolute top-15 right-5'>
                <Canvas
                    className=''
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
                    gl={{ preserveDrawingBuffer: true }}
                >
                    <RayMarching
                        scale={[2.0, 2.0, 1.0]}
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

// returns resized image encoded as base64 string
function resizeImage(width, height) {
    const resizedCanvas = document.createElement('canvas');
    const resizedContext = resizedCanvas.getContext('2d');
    resizedCanvas.width = width.toString();
    resizedCanvas.height = height.toString();

    const originalCanvas = document.getElementsByTagName('canvas')[0];
    resizedContext.drawImage(originalCanvas, 0, 0, width, height);
    return resizedCanvas.toDataURL();
}
