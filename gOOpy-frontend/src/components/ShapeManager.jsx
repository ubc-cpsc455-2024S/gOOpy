import { Vector3 } from 'three';
import GoopyButton from './GoopyButton';
import axios from 'axios';

function ShapeManager(props) {
    const saveResult = async () => {
        let data = {
            shapes: props.shapes,
            metadata: {
                userId: 123,
                title: 'new_model',
                lastEdited: new Date(),
            },
        };
        let result = await axios.post('http://127.0.0.1:3000/scene', data);
    };
    return (
        <div className='sliders border'>
            <h1 className='text-3xl font-bold'>Editor</h1>
            <div
                className='no-scrollbar overflow-y-auto border'
                // TODO move this custom CSS to tailwind somehow
                style={{
                    height: '65vh', // shorten to avoid scroll-bar
                    minWidth: '18vw',
                }}
            >
                {props.shapes.map((shape, index) => (
                    <div className='flex justify-between' key={index}>
                        <GoopyButton
                            classes={`border-b button cursor-pointer flex w-full`}
                            onClick={() => {
                                props.setCurrentShape(
                                    shape.id == props.currentShape
                                        ? null
                                        : shape.id
                                );
                            }}
                            isSelected={props.currentShape === shape.id}
                        >
                            <p className='ps-1'>
                                Shape {props.shapes[index].id}
                            </p>
                        </GoopyButton>
                        {props.currentShape != shape.id && (
                            <GoopyButton
                                classes={`border-l border-b pl-1 pr-1`}
                                onClick={(e) => {
                                    props.setShapes((state) => {
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
            <GoopyButton
                classes='border-l border-r border-b p-1'
                onClick={() => {
                    const newId = props.determineNewID();
                    props.setShapes((state) => {
                        const newState = [...state];
                        newState.push({
                            center: new Vector3(0, 0, 0),
                            radius: 1.0,
                            id: newId,
                        });
                        return newState;
                    });
                    props.setCurrentShape(newId);
                }}
            >
                Add Shape
            </GoopyButton>
            <GoopyButton
                classes='border-l border-r border-b p-1'
                onClick={() => {
                    props.setShapes((state) => {
                        return [];
                    });
                    props.setCurrentShape(null);
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
    );
}

export default ShapeManager;
