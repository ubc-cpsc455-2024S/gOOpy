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
                        defaultValue={shapes[index].shape_type}
                        callback={updateField}
                        index={index}
                    />
                </div>
            </div>
            <div className='border-s border-t border-r flex flex-col p-2'>
                <h4 className='text-1xl font-bold'>Transform</h4>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>x:</h4>
                    <Slider
                        defaultValue={shapes[index].center.x}
                        index={index}
                        callback={updateField}
                        callbackParams={[['center', 'x']]}
                    />
                </div>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>y:</h4>
                    <Slider
                        defaultValue={shapes[index].center.y}
                        index={index}
                        callback={updateField}
                        callbackParams={[['center', 'y']]}
                    />
                </div>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>z:</h4>
                    <Slider
                        defaultValue={shapes[index].center.z}
                        index={index}
                        callback={updateField}
                        callbackParams={[['center', 'z']]}
                    />
                </div>
            </div>
            <div className='border-r border-l border-b border-t flex flex-col p-2'>
                <h4 className='text-1xl font-bold'>Radius</h4>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>x:</h4>
                    <Slider
                        defaultValue={shapes[index].property1}
                        index={index}
                        callback={updateField}
                        callbackParams={[['property1']]}
                        min={0}
                    />
                </div>
            </div>
            {/* <div className='border-b border-l border-r flex flex-col p-2'>
                <h4 className='text-1xl font-bold mr-2'>Colour</h4>
                <ColorPicker
                    color={color}
                    onChange={setColor}
                    hideAlpha={true}
                    hideInput={true}
                />
            </div> */}
            <CustomProperties
                properties={SHAPE_PROPERTIES[shapeType]}
                shapes={shapes}
                index={index}
                updateField={updateField}
            />
        </div>
    );
}

// TODO clean up the intense shapes, index prop drilling
function CustomProperties({ properties, shapes, index, updateField }) {
    console.log(properties);
    return properties.map((property) => (
        <div className='border flex flex-col p-2' key={property.title}>
            <h4 className='text-1xl font-bold'>{property.title}</h4>
            {property.values.map((v, i) => (
                <div className='flex' key={v.descriptor}>
                    <h4 className='text-1xl font-bold mr-2'>{v.descriptor}:</h4>
                    <Slider
                        defaultValue={shapes[index][`property${i + 1}`]}
                        index={index}
                        callback={updateField}
                        callbackParams={[[`property${i + 1}`]]}
                        max={v.max}
                        min={v.min}
                    />
                </div>
            ))}
        </div>
    ));
}

function SelectType({ defaultValue, callback, index }) {
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        setVal(defaultValue);
    }, [defaultValue]);

    return (
        <select
            value={val}
            onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setVal(newValue);
                callback(newValue, index, ['shape_type']);
            }}
        >
            <option value={SHAPE_TYPES.Sphere}>Sphere</option>
            <option value={SHAPE_TYPES.Box}>Box</option>
            <option value={SHAPE_TYPES.Torus}>Torus</option>
        </select>
    );
}

export default ShapeDetails;
