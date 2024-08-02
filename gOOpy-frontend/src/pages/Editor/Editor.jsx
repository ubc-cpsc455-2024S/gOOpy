import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'react-color-palette/css';
import { Canvas } from '@react-three/fiber';
import { Vector3, Vector4 } from 'three';
import RayMarching from './RayMarching/RayMarching';
import ShapeManager from '../../components/ShapeManager';
import ShapeDetails from '../../components/ShapeDetails';
import { useNavigate, useParams } from 'react-router-dom';
import SceneManager from '../../components/SceneManager';
import { useColor } from 'react-color-palette';
import { obj1, obj2, obj3 } from './constants';
import {
    createNewScene,
    getSceneInfo,
    saveSceneInfo,
} from '../../apiCalls/sceneAPI';
import { buildMatrices } from './matrixHelpers';
import { useAuth } from '../../components/AuthProvider';
import { createImageDataURL } from '../../components/ThumbnailGeneration';

const THUMBNAIL_DIMENSION = 100;

const fetchScene = async (
    setLoading,
    setShapes,
    setNextId,
    sceneId,
    setSkyboxColor,
    setSkyboxLightColor,
    setSkyboxAmbientIntensity,
    setMetadata
) => {
    function initializeScene(data) {
        setShapes(buildMatrices(data.shapes));
        setNextId(Math.max(...data.shapes.map((shape) => shape.id), 0));
        setSkyboxColor(data.skybox_color);
        setSkyboxLightColor(data.skybox_light_color);
        setSkyboxAmbientIntensity(data.ambient_intensity);
        setMetadata({
            title: data.metadata.title,
            description: data.metadata.description,
            copyPermission: data.metadata.copy_permission,
            lastEdited: data.metadata.last_edited,
        });
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

const fetchSceneLocal = (
    setLoading,
    setShapes,
    setNextId,
    setSkyboxColor,
    setSkyboxLightColor,
    setSkyboxAmbientIntensity,
    setMetadata,
    data
) => {
    function initializeScene(data) {
        setShapes(buildMatrices(data.shapes));
        setNextId(Math.max(...data.shapes.map((shape) => shape.id), 0));
        setSkyboxColor(JSON.parse(JSON.stringify(data.skybox_color)));
        setSkyboxLightColor(
            JSON.parse(JSON.stringify(data.skybox_light_color))
        );
        setSkyboxAmbientIntensity(data.ambient_intensity);
        setMetadata({
            title: data.metadata.title,
            description: data.metadata.description,
            copyPermission: data.metadata.copy_permission,
            lastEdited: data.metadata.last_edited,
        });
    }

    try {
        initializeScene(data);
    } catch (error) {
        setLoading(true);
    }
    setLoading(false);
};

const saveResult = async (
    sceneId,
    shapes,
    skyboxColor,
    skyboxLightColor,
    skyboxAmbientIntensity,
    metadata,
    navigate,
    user
) => {
    let data = {
        shapes: shapes,
        skybox_color: skyboxColor,
        skybox_light_color: skyboxLightColor,
        ambient_intensity: skyboxAmbientIntensity,
        metadata: {
            title: metadata.title,
            description: metadata.description,
            copy_permission: metadata.copyPermission,
            last_edited: new Date(),
            thumbnail: createImageDataURL(THUMBNAIL_DIMENSION, 'webp'),
            user_id: user?._id,
        },
    };

    // if there is no user
    if (user === null) {
        console.log('SAVING SCENE TO LOCAL STORAGE');
        // save scene temporarily
        localStorage.setItem('login_scene_temp', JSON.stringify(data));
        // re-route to login since there is no user
        navigate(`/login`);
        return;
    }

    if (!sceneId) {
        try {
            const resp = await createNewScene(data);
            navigate(`/editor/${resp.data}`);
        } catch (e) {
            console.error(e);
        }
    } else {
        await saveSceneInfo(sceneId, data);
    }
};

function Editor() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [needSave, setNeedSave] = useState(false);
    const [canvasReady, setCanvasReady] = useState(false);
    const [shapes, setShapes] = useState(
        // JSON stringify+parse does a deep copy
        buildMatrices(JSON.parse(JSON.stringify([obj1, obj2, obj3])))
    );
    const [currentShape, setCurrentShape] = useState(null);
    const [nextId, setNextId] = useState(() => {
        return Math.max(...shapes.map((shape) => shape.id), 0);
    });

    const { sceneId } = useParams();
    const [skyboxColor, setSkyboxColor] = useColor('#000000');
    const [skyboxLightColor, setSkyboxLightColor] = useColor('white');
    const [ambientIntensity, setAmbientIntensity] = useState(0.2);
    const [editorView, setEditorView] = useState('shapes');
    const determineNewID = () => {
        const newNextId = nextId + 1;
        setNextId(newNextId);
        return newNextId;
    };

    const [metadata, setMetadata] = useState({
        title: 'my_scene',
        description: 'this is my scene',
        copyPermission: true,
        lastEdited: Date(),
    });

    useEffect(() => {
        // check if local cache has anything and load it; if not just do it normally
        const stored = JSON.parse(localStorage.getItem('login_scene_temp'));
        if (!sceneId && stored != null) {
            // load it
            console.log('LOADING SCENE FROM LOCAL STORAGE');
            fetchSceneLocal(
                setLoading,
                setShapes,
                setNextId,
                setSkyboxColor,
                setSkyboxLightColor,
                setAmbientIntensity,
                setMetadata,
                stored
            );
            setNeedSave(true);
        } else {
            fetchScene(
                setLoading,
                setShapes,
                setNextId,
                sceneId,
                setSkyboxColor,
                setSkyboxLightColor,
                setAmbientIntensity,
                setMetadata
            );
        }
    }, [sceneId]);

    useEffect(() => {
        console.log('canvas ready', canvasReady);
        // We need to wait until the canvas has been loaded and rendered to
        // TODO for now, we use canvasReady, as well as a manual delay
        if (canvasReady && user && needSave) {
            console.log('QUEUED SAVE');
            setTimeout(() => {
                saveResult(
                    sceneId,
                    shapes,
                    skyboxColor,
                    skyboxLightColor,
                    ambientIntensity,
                    metadata,
                    navigate,
                    user
                );
                setNeedSave(false);
            }, 600);
        }
    }, [canvasReady, user, needSave]);

    if (loading) {
        return <p>loading</p>;
    }
    console.log('CLEARING LOCAL SCENE STORAGE'); // only after loading is true
    localStorage.removeItem('login_scene_temp');

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
                                skyboxColor={skyboxColor}
                                skyboxLightColor={skyboxLightColor}
                                skyboxAmbientIntensity={ambientIntensity}
                                metadata={metadata}
                                currentShape={currentShape}
                                setShapes={setShapes}
                                setCurrentShape={setCurrentShape}
                                determineNewID={determineNewID}
                                setEditorView={setEditorView}
                                navigate={navigate}
                                saveResult={saveResult}
                                user={user}
                            />
                        )}
                        {editorView == 'scene' && (
                            <SceneManager
                                skyboxColController={setSkyboxColor}
                                skyboxColor={skyboxColor}
                                skyboxLightController={setSkyboxLightColor}
                                skyboxLightColor={skyboxLightColor}
                                setAmbientIntensity={setAmbientIntensity}
                                skyboxAmbient={ambientIntensity}
                                setEditorView={setEditorView}
                                metadata={metadata}
                                setMetadata={setMetadata}
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
                    onCreated={() => setCanvasReady(true)}
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
                            ambientIntensity: ambientIntensity,
                        }}
                    />
                </Canvas>
            </div>
        </div>
    );
}

export default Editor;
