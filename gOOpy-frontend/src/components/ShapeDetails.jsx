import { useEffect, useState } from 'react';
import { SHAPE_TYPES, SHAPE_PROPERTIES } from '../pages/Editor/constants';
import Slider from './Slider';

function ShapeDetails({ index, shapes }) {
    const [shapeType, setShapeType] = useState(shapes[index].shape_type);

    useEffect(() => {
        setShapeType(shapes[index].shape_type);
    }, [shapes, index]);

    // help from https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    // I can't remember if we are still using help from the above link...
    const updateField = (newValue, index, fields) => {
        // split fields into [...rest, last]
        const [last, ...rest] = fields.toReversed();
        rest.reverse();

        const obj = rest.reduce((acc, curr) => acc[curr], shapes[index]);
        obj[last] = newValue;
    };

    // TODO: change 'FF0000' to currentShape's color
    // const [color, setColor] = useColor('FF0000');
    return (
        <div className='sliders border ms-2 editor-panel'>
            <h4 className='text-2xl font-bold'>
                Shape {shapes[index].id} &gt; Properties
            </h4>
            <div className='border flex flex-col p-2'>
                <h4 className='text-1xl font-bold'>Type</h4>
                <div className='flex'>
                    <SelectType
                        shapeType={shapeType}
                        callback={updateField}
                        setShapeType={setShapeType}
                        index={index}
                    />
                </div>
            </div>
            <CustomProperties
                shapeType={shapeType}
                shapes={shapes}
                index={index}
                updateField={updateField}
            />
        </div>
    );
}

// TODO clean up the intense shapes, index prop drilling
function CustomProperties({ shapeType, shapes, index, updateField }) {
    const properties = SHAPE_PROPERTIES[shapeType];

    return properties.map((property) => (
        <div className='border flex flex-col p-2' key={property.title}>
            <h4 className='text-1xl font-bold'>{property.title}</h4>
            {property.values.map((v) => (
                <div className='flex' key={v.descriptor}>
                    <h4 className='text-1xl font-bold mr-2'>{v.descriptor}:</h4>
                    <Slider
                        defaultValue={v.path.reduce(
                            (acc, curr) => acc[curr],
                            shapes[index]
                        )}
                        index={index}
                        callback={updateField}
                        callbackParams={[v.path]}
                        max={v.max}
                        min={v.min}
                    />
                </div>
            ))}
        </div>
    ));
}

function SelectType({ shapeType, setShapeType, callback, index }) {
    return (
        <select
            value={shapeType}
            onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setShapeType(newValue);
                callback(newValue, index, ['shape_type']);
            }}
        >
            {Object.entries(SHAPE_TYPES).map(([key, value]) => (
                <option key={key} value={value}>
                    {key}
                </option>
            ))}
        </select>
    );
}

export default ShapeDetails;
