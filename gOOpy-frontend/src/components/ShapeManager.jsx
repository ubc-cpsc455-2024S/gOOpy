import { Matrix4, Vector3 } from 'three';
import GoopyButton from './GoopyButton';
import EditorTabCarousel from './EditorTabCarousel';
import { SHAPE_TYPES } from '../pages/Editor/constants';
import { createImageDataURL } from './ThumbnailGeneration';

const MAX_SHAPES = 50; // should match shaders
const DOWNLOAD_FILE_TYPE = 'png';

function ShapeManager({
    shapes,
    skyboxColor,
    skyboxLightColor,
    skyboxAmbientIntensity,
    metadata,
    setEditorView,
    setCurrentShape,
    currentShape,
    setShapes,
    determineNewID,
    sceneId,
    saveResult,
    navigate,
    user,
}) {
    return (
        <div className='sliders border h-full flex flex-col min-w-64 ...'>
            <div>
                <EditorTabCarousel
                    setEditorView={setEditorView}
                ></EditorTabCarousel>
                <h1 className='text-3xl font-bold'>Editor</h1>
            </div>
            <div
                className='no-scrollbar overflow-scroll border grow'
                // TODO move this custom CSS to tailwind somehow
            >
                <div className='scroll-container'>
                    {shapes.map((shape, index) => (
                        <div className='flex justify-between' key={index}>
                            <GoopyButton
                                classes={`border-b button cursor-pointer flex w-full `}
                                onClick={() => {
                                    setCurrentShape(
                                        shape.id == currentShape
                                            ? null
                                            : shape.id
                                    );
                                }}
                                isSelected={currentShape === shape.id}
                            >
                                <p className='ps-1'>Shape {shapes[index].id}</p>
                            </GoopyButton>
                            {currentShape != shape.id && (
                                <GoopyButton
                                    classes={`border-l border-b pl-1 pr-1`}
                                    onClick={() => {
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
                                    }}
                                >
                                    <p>X</p>
                                </GoopyButton>
                            )}
                        </div>
                    ))}
                </div>
            </div>
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
                            user
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
        </div>
    );
}

export default ShapeManager;
