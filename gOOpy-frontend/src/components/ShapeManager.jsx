import { Vector3 } from 'three';
import GoopyButton from './GoopyButton';

function ShapeManager(props) {
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
                            styleClasses={`border-b button cursor-pointer flex w-full`}
                            onClickBehavior={() => {
                                props.setCurrentShape(
                                    shape.id == props.currentShape
                                        ? null
                                        : shape.id
                                );
                            }}
                            hovering={props.currentShape === shape.id}
                        >
                            <p className='ps-1'>
                                Shape {props.shapes[index].id}
                            </p>
                        </GoopyButton>
                        {props.currentShape != shape.id && (
                            <GoopyButton
                                styleClasses={`border-l border-b pl-1 pr-1`}
                                onClickBehavior={(e) => {
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
                                    e.stopPropagation();
                                }}
                                hovering={false}
                            >
                                <p>X</p>
                            </GoopyButton>
                        )}
                    </div>
                ))}
            </div>
            <GoopyButton
                styleClasses='border-l border-r border-b p-1'
                onClickBehavior={() => {
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
                styleClasses='border-l border-r border-b p-1'
                onClickBehavior={() => {
                    props.setShapes((state) => {
                        return [];
                    });
                    props.setCurrentShape(null);
                }}
            >
                Reset Scene
            </GoopyButton>
            <GoopyButton
                styleClasses='border-l border-r border-b p-1'
                onClickBehavior={() => {
                    let data = {
                        shapes: props.shapes,
                        metadata: {
                            userId: 123,
                            title: 'new_model',
                            lastEdited: new Date(),
                        },
                    };
                    let jsonData = JSON.stringify(data);
                    console.log(jsonData);
                }}
            >
                Save Scene
            </GoopyButton>
        </div>
    );
}

export default ShapeManager;
