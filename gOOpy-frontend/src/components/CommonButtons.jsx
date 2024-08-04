import GoopyButton from './GoopyButton';
import { Matrix4, Vector3 } from 'three';
import { createImageDataURL } from './ThumbnailGeneration';
import { SHAPE_TYPES } from '../pages/Editor/constants';

const MAX_SHAPES = 50; // should match shaders
const DOWNLOAD_FILE_TYPE = 'png';

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
    saveResult,
    user,
    setSceneSaved,
    sceneSaved,
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
                        navigate,
                        user,
                        setSceneSaved
                    );
                }}
            >
                <div className='flex justify-between'>
                    <h1>Save Scene</h1>
                    {sceneSaved && (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='green'
                            className='size-6'
                        >
                            <path
                                fillRule='evenodd'
                                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
                                clipRule='evenodd'
                            />
                        </svg>
                    )}
                </div>
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
