import { useEffect, useState } from 'react';
import { SHAPE_TYPES, SHAPE_PROPERTIES } from '../pages/Editor/constants';
import Slider from './Slider';
import { rebuildMatrix } from '../pages/Editor/matrixHelpers';

function ShapeDetails({ shape }) {
    const [shapeType, setShapeType] = useState(shape.shape_type);

    useEffect(() => {
        setShapeType(shape.shape_type);
    }, [shape]);

    // help from https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
    const updateField = (newValue, fields, updateMatrix = false) => {
        // split fields into [...rest, last]
        const [last, ...rest] = fields.toReversed();
        rest.reverse();

        const obj = rest.reduce((acc, curr) => acc[curr], shape);
        obj[last] = newValue;

        if (updateMatrix) {
            rebuildMatrix(shape);
        }
    };

    return (
        <div className='sliders border ms-2 editor-panel min-w-64 no-scrollbar overflow-scroll'>
            <h4 className='text-2xl font-bold'>
                Shape {shape.id} &gt; Properties
            </h4>
            <div className='border flex flex-col p-2'>
                <h4 className='text-1xl font-bold'>Type</h4>
                <div className='flex'>
                    <SelectType
                        shapeType={shapeType}
                        callback={updateField}
                        setShapeType={setShapeType}
                    />
                </div>
            </div>
            <CustomProperties
                shapeType={shapeType}
                shape={shape}
                updateField={updateField}
            />
        </div>
    );
}

function CustomProperties({ shapeType, shape, updateField }) {
    const properties = SHAPE_PROPERTIES[shapeType];

    return properties.map((property) => (
        <div
            className='border flex flex-col p-2'
            key={shape.id + property.title}
        >
            <h4 className='text-1xl font-bold'>{property.title}</h4>
            {property.values.map((v) => (
                <div className='flex' key={shape.id + v.descriptor}>
                    <h4 className='text-1xl font-bold mr-2 grow-0'>
                        {v.descriptor}:
                    </h4>
                    <Slider
                        classes='grow'
                        defaultValue={v.path.reduce(
                            (acc, curr) => acc[curr],
                            shape
                        )}
                        callback={updateField}
                        callbackParams={[v.path, true]}
                        max={v.max}
                        min={v.min}
                    />
                </div>
            ))}
        </div>
    ));
}

function SelectType({ shapeType, setShapeType, callback }) {
    return (
        <select
            value={shapeType}
            onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setShapeType(newValue);
                callback(newValue, ['shape_type']);
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
