import { useEffect, useState } from 'react';
import { SHAPE_TYPES, SHAPE_OPTIONS } from '../pages/Editor/constants';
import Slider from './Slider';

function ShapeDetails({
    index,
    shapes,
    updateAxis,
    updateRadius,
    updateField,
}) {
    const [shapeType, setShapeType] = useState(shapes[index].shape_type);

    useEffect(() => {
        setShapeType(shapes[index].shape_type);
    }, [shapes, index]);

    console.log('shape options', SHAPE_OPTIONS[shapeType]);

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
                        callback={updateAxis}
                        callbackParams={['x']}
                    />
                </div>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>y:</h4>
                    <Slider
                        defaultValue={shapes[index].center.y}
                        index={index}
                        callback={updateAxis}
                        callbackParams={['y']}
                    />
                </div>
                <div className='flex'>
                    <h4 className='text-1xl font-bold mr-2'>z:</h4>
                    <Slider
                        defaultValue={shapes[index].center.z}
                        index={index}
                        callback={updateAxis}
                        callbackParams={['z']}
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
                        callback={updateRadius}
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
            <CustomProperties properties={SHAPE_OPTIONS[shapeType]} />
        </div>
    );
}

// TODO use this for above
// loop over children maybe
function CustomProperties({ properties }) {
    console.log(properties);
    return properties.map((property) => (
        <div className='border flex flex-col p-2'>
            <h4 className='text-1xl font-bold'>{property}</h4>
            <div className='flex'></div>
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
                callback(index, newValue, 'shape_type');
            }}
        >
            <option value={SHAPE_TYPES.Sphere}>Sphere</option>
            <option value={SHAPE_TYPES.Box}>Box</option>
            <option value={SHAPE_TYPES.Torus}>Torus</option>
        </select>
    );
}

export default ShapeDetails;
