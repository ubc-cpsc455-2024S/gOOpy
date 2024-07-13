import { Vector3 } from 'three';
import GoopyButton from './GoopyButton';
import axios from 'axios';
import EditorTabCarousel from './EditorTabCarousel';
import { SHAPE_TYPES } from '../pages/Editor/Editor';

const MAX_SHAPES = 50; // should match shaders

function ShapeManager({
    shapes,
    setEditorView,
    setCurrentShape,
    currentShape,
    setShapes,
    determineNewID,
    sceneId,
}) {
    const saveResult = async () => {
        const newId = determineNewID();
        let data = {
            _id: sceneId,
            shapes: shapes,
            metadata: {
                // TODO: determine if oauth_id or _id from mongoDB
                user_id: '668f76634cfd55de99230ca9',
                title: 'new_model',
                lastEdited: new Date(),
                // TODO: create thumbnail from scene
            },
            next_id: newId,
        };
        console.log(shapes);
        await axios.post('http://127.0.0.1:3000/scene', data);
    };
    return (
        <div className='sliders border h-full flex flex-col ...'>
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
                                    onClick={(e) => {
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
                        setShapes((state) => {
                            const newState = [...state];
                            newState.push({
                                center: new Vector3(0, 0, 0),
                                radius: 1.0,
                                shape_type: SHAPE_TYPES.Sphere,
                                id: newId,
                            });
                            return newState;
                        });
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
                        saveResult();
                    }}
                >
                    Save Scene
                </GoopyButton>
                <GoopyButton
                    classes='border-l border-r border-b p-1'
                    onClick={() => {
                        // TODO We can later specify this to be low-quality jpeg for thumbnails
                        // we might also want to make thumbnails render low-res.. We can assess this later...
                        const data = document
                            .getElementsByTagName('canvas')[0]
                            .toDataURL();
                        const t = document.createElement('a');
                        t.download = 'scene.jpg';
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
