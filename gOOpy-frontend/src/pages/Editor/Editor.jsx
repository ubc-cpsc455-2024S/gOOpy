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
        console.log('Colors:\n');
        console.log(data.skybox_color);
        console.log(data.skybox_light_color);
        setSkyboxColor({
            hex: data.skybox_color.hex,
            rgb: data.skybox_color.rgb,
            hsv: data.skybox_color.hsv,
        });
        setSkyboxLightColor({
            hex: data.skybox_light_color.hex,
            rgb: data.skybox_light_color.rgb,
            hsv: data.skybox_light_color.hsv,
        });
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
    loggedInUser
) => {
    let data = {
        shapes: shapes,
        skybox_color: skyboxColor,
        skybox_light_color: skyboxLightColor,
        ambient_intensity: skyboxAmbientIntensity,
        metadata: {
            // TODO: determine if oauth_id or _id from mongoDB
            title: metadata.title,
            description: metadata.description,
            copy_permission: metadata.copyPermission,
            last_edited: new Date(),
            thumbnail: createImageDataURL(THUMBNAIL_DIMENSION, 'webp'),
        },
    };
    console.log(data.metadata.thumbnail);
    // if there is a user
    if (loggedInUser.user != null) {
        data.metadata = { ...metadata, user_id: loggedInUser.user._id };
    } else {
        console.log('stringify', JSON.stringify(data));
        // save scene temporarily
        localStorage.setItem('data-cache', JSON.stringify(data));
        // re-route to login since there is no user
        console.log('Saved Data:\n');
        console.log(data);
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
    const [loading, setLoading] = useState(true);
    const [shapes, setShapes] = useState(buildMatrices([obj1, obj2, obj3]));
    const [currentShape, setCurrentShape] = useState(null);
    const [nextId, setNextId] = useState(() => {
        return Math.max(...shapes.map((shape) => shape.id), 0);
    });

    const { sceneId } = useParams();
    const [skyboxColor, setSkyboxColor] = useColor('FFFFFF');
    const [skyboxLightColor, setSkyboxLightColor] = useColor('white');
    const [ambientIntensity, setAmbientIntensity] = useState(0.2);
    const [editorView, setEditorView] = useState('shapes');
    const user = useSelector((state) => state.user);
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

    console.log('skybox color state', skyboxColor);

    useEffect(() => {
        // check if local cache has anything and load it; if not just do it normally
        const stored = JSON.parse(localStorage.getItem('data-cache'));
        if (stored != null) {
            // load it
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
            // save it if logged in, then redirect to new url
            if (user.user != null) {
                saveResult(
                    sceneId,
                    shapes,
                    skyboxColor,
                    skyboxLightColor,
                    ambientIntensity,
                    metadata,
                    navigate,
                    loggedInUser
                );
            }
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
