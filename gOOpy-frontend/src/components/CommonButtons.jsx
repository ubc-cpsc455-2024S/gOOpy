import GoopyButton from './GoopyButton';
import { Matrix4, Vector3 } from 'three';
import { saveSceneInfo, createNewScene } from '../apiCalls/sceneAPI';
import { createImageDataURL } from '../pages/Editor/Editor';
import { SHAPE_TYPES } from '../pages/Editor/constants';

const MAX_SHAPES = 50; // should match shaders
const DOWNLOAD_FILE_TYPE = 'png';

const saveResult = async (
    sceneId,
    shapes,
    skyboxColor,
    skyboxLightColor,
    skyboxAmbientIntensity,
    metadata,
    navigate
) => {
    let data = {
        shapes: shapes,
        skybox_color: skyboxColor,
        skybox_light_color: skyboxLightColor,
        ambient_intensity: skyboxAmbientIntensity,
        metadata: {
            // TODO: determine if oauth_id or _id from mongoDB
            user_id: '668f76634cfd55de99230ca9',
            title: metadata.title,
            description: metadata.description,
            copy_permission: metadata.copyPermission,
            last_edited: new Date(),
            thumbnail: createImageDataURL(THUMBNAIL_DIMENSION, 'webp'),
        },
    };
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

export const CommonButtons = ({
    determineNewID,
    shapes,
    setShapes,
    setCurrentShape,
    sceneId,
    skyboxColor,
    skyboxLightColor,
    skyboxAmbientIntensity,
    metadata,
    navigate,
    setEditorView,
}) => {
    return (
        <div className='flex-none'>
            <GoopyButton
                classes='border-l border-r border-b p-1'
                isDisabled={shapes.length >= MAX_SHAPES}
                onClick={() => {
                    if (shapes.length >= MAX_SHAPES) return;
                    const newId = determineNewID();
                    setShapes((state) => [
                        ...state,
                        {
                            translation: new Vector3(0, 0, 0),
                            // these property values are chosen such that the default shapes look nice
                            property1: 1.0,
                            property2: 0.5,
                            property3: 0.2,
                            property4: 0.2,
                            transform: new Matrix4(),
                            rotation: new Vector3(),
                            scale: new Vector3(1.0, 1.0, 1.0),
                            shape_type: SHAPE_TYPES.Sphere,
                            id: newId,
                        },
                    ]);
                    setEditorView('shapes');
                    setCurrentShape(newId);
                }}
            >
                Add Shape
            </GoopyButton>
            <GoopyButton
                classes='border-l border-r border-b p-1'
                onClick={() => {
                    setShapes((state) => {
                        return [];
                    });
                    setCurrentShape(null);
                }}
            >
                Reset Scene
            </GoopyButton>
            <GoopyButton
                classes='border-l border-r border-b p-1'
                onClick={async () => {
                    saveResult(
                        sceneId,
                        shapes,
                        skyboxColor,
                        skyboxLightColor,
                        skyboxAmbientIntensity,
                        metadata,
                        navigate
                    );
                }}
            >
                Save Scene
            </GoopyButton>
            <GoopyButton
                classes='border-l border-r border-b p-1'
                onClick={() => {
                    const canvasHeight =
                        document.getElementsByTagName('canvas')[0].height;
                    const data = createImageDataURL(canvasHeight, 'png');
                    const t = document.createElement('a');
                    t.download = `${metadata.title}.${DOWNLOAD_FILE_TYPE}`;
                    t.href = data;
                    t.click();
                }}
            >
                Download Image
            </GoopyButton>
        </div>
    );
};
