import { Vector3 } from 'three';
import GoopyButton from './GoopyButton';
import axios from 'axios';
import EditorTabCarousel from './EditorTabCarousel';

function ShapeManager({
    shapes,
    setEditorView,
    setCurrentShape,
    currentShape,
    setShapes,
    determineNewID,
}) {
    const saveResult = async () => {
        let data = {
            shapes: shapes,
            metadata: {
                userId: 123,
                title: 'new_model',
                lastEdited: new Date(),
            },
        };
        let result = await axios.post('http://127.0.0.1:3000/scene', data);
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
                    onClick={() => {
                        const newId = determineNewID();
                        setShapes((state) => {
                            const newState = [...state];
                            newState.push({
                                center: new Vector3(0, 0, 0),
                                radius: 1.0,
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
            </div>
        </div>
    );
}

export default ShapeManager;
