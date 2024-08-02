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

const THUMBNAIL_DIMENSION = 100;

const fetchScene = async (
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
        console.log('d', data.metadata);
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

    fetchSceneInfo: try {
        if (!sceneId) break fetchSceneInfo;
        let resp = await getSceneInfo(sceneId);
        if (resp.data) {
            initializeScene(resp.data);
        }
    } catch (error) {
        setLoading(true);
    }
    setLoading(false);
};

const getSceneFromLocal = (setLoading, data, initializeScene) => {
    try {
        initializeScene(data);
    } catch (error) {
        setLoading(true);
    }
    setLoading(false);
};

function Editor() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [shapes, setShapes] = useState(
        buildMatrices([{ ...obj1 }, { ...obj2 }, { ...obj3 }])
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

    const saveResult = async () => {
        let data = {
            shapes: shapes,
            skybox_color: skyboxColor,
            skybox_light_color: skyboxLightColor,
            ambient_intensity: ambientIntensity,
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

    //debugging
    useEffect(() => console.log('metadata', metadata), [metadata]);

    useEffect(() => {
        // if the ID is defined, load the scene with this ID
        if (sceneId) {
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
            return;
        }

        // check if local cache has anything and load it; if not just do it normally
        const stored = JSON.parse(localStorage.getItem('login_scene_temp'));
        if (stored != null) {
            // load the scene from local storage
            console.log('LOADING SCENE FROM LOCAL STORAGE');
            console.log(stored);
            getSceneFromLocal(setLoading, stored, initializeScene);

            console.log('user', user);

            // save it if logged in, then redirect to new url
            if (user != null) {
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
            }
        } else {
            fetchScene(setLoading, sceneId, initializeScene);
        }
    }, [sceneId, user]);

    if (loading) {
        return <p>loading</p>;
    }
    // Since the scene has been loaded, we can safely clear local storage
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

// ASSUMES CANVAS IS A SQUARE
export function createImageDataURL(resizedDimension, fileType) {
    const originalCanvas = document.getElementsByTagName('canvas')[0];

    const filledCanvas = document.createElement('canvas');
    const filledContext = filledCanvas.getContext('2d');
    filledCanvas.width = originalCanvas.width;
    filledCanvas.height = originalCanvas.height;

    filledContext.fillStyle = '#FFFFFF';
    filledContext.fillRect(0, 0, filledCanvas.width, filledCanvas.height);

    if (resizedDimension == originalCanvas.height) {
        console.log('thing works');
        filledContext.drawImage(originalCanvas, 0, 0);
        return filledCanvas.toDataURL(`image/${fileType}`);
    } else {
        const sigma = 1 / (2 * (resizedDimension / originalCanvas.height));
        filledContext.filter = `blur(${sigma}px)`;
        filledContext.drawImage(originalCanvas, 0, 0);

        const resizedCanvas = document.createElement('canvas');
        const resizedContext = resizedCanvas.getContext('2d');
        resizedCanvas.width = resizedDimension.toString();
        resizedCanvas.height = resizedDimension.toString();

        resizedContext.drawImage(
            filledCanvas,
            0,
            0,
            resizedDimension,
            resizedDimension
        );

        return resizedCanvas.toDataURL(`image/${fileType}`);
    }
}
