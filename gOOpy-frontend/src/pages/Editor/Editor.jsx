import React, { useState, useEffect } from 'react';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { Vector3, Vector4 } from 'three';
import RayMarching from './RayMarching/RayMarching';
import ShapeManager from '../../components/ShapeManager';
import ShapeDetails from '../../components/ShapeDetails';
import { useAsyncError, useParams } from 'react-router-dom';
import SceneManager from '../../components/SceneManager';
import { useColor } from 'react-color-palette';
import { SHAPE_TYPES } from './constants';
import { getSceneInfo, saveSceneInfo } from '../../apiCalls/sceneAPI';
import { buildMatrices } from './matrixHelpers';

const THUMBNAIL_DIMENSION = 250;

// hard coded list of objects (temporary)
const obj1 = {
    translation: new Vector3(0.0, 0.0, 0.0),
    scale: new Vector3(1.0, 1.0, 1.0),
    rotation: new Vector3(0.0, 0.0, 0.0),
    property1: 1.0,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Sphere,
    id: 0,
};
const obj2 = {
    translation: new Vector3(1.0, 1.0, 1.0),
    scale: new Vector3(1.0, 1.0, 1.0),
    rotation: new Vector3(0.0, 0.0, 0.0),
    property1: 1.3,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Sphere,
    id: 1,
};
const obj3 = {
    translation: new Vector3(-1.0, -1.0, 1.0),
    scale: new Vector3(1.0, 1.0, 1.0),
    rotation: new Vector3(0.0, 0.0, 0.0),
    property1: 0.8,
    property2: 1.0,
    property3: 1.0,
    property4: 1.0,
    shape_type: SHAPE_TYPES.Box,
    id: 2,
};

const fetchShapes = async (setLoading, setShapes, setNextId, sceneId) => {
    function initializeScene(data) {
        setShapes(buildMatrices(data.shapes));
        setNextId(Math.max(...data.shapes.map((shape) => shape.id), 0));
    }

    fetchUserInfo: try {
        if (!sceneId) break fetchUserInfo;
        let resp = await getSceneInfo(sceneId);
        if (resp.data) {
            initializeScene(resp.data);
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
            thumbnail: createThumbnail(THUMBNAIL_DIMENSION),
        },
    };
    await saveSceneInfo(sceneId, data);
};

function Editor() {
    const [loading, setLoading] = useState(true);
    const [shapes, setShapes] = useState(buildMatrices([obj1, obj2, obj3]));
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

    const [sceneProperties, setSceneProperties] = useState({
        sceneName: 'default',
        sceneDescription: 'default description',
        allowCopy: true,
        lastEdited: Date(),
    });

    useEffect(() => {
        fetchShapes(setLoading, setShapes, setNextId, sceneId);
        /* <--load scene properties here with setSceneProperties-->*/
    }, []);

    if (loading) {
        return <p>loading</p>;
    }

    // TODO better way to find the shapes's index?
    const index = shapes.findIndex((s) => s.id === currentShape);

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
                                sceneProperties={sceneProperties}
                                setSceneProperties={setSceneProperties}
                            ></SceneManager>
                        )}
                    </div>
                </div>
                <div className='mt-14 editor-panel'>
                    {currentShape != null &&
                        editorView == 'shapes' &&
                        shapes.length > 0 && (
                            <ShapeDetails shape={shapes[index]} />
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
function createThumbnail(dimension) {
    const resizedCanvas = document.createElement('canvas');
    const resizedContext = resizedCanvas.getContext('2d');
    resizedCanvas.width = dimension.toString();
    resizedCanvas.height = dimension.toString();

    const originalCanvas = document.getElementsByTagName('canvas')[0];
    resizedContext.drawImage(originalCanvas, 0, 0, dimension, dimension);
    return resizedCanvas.toDataURL();
}
