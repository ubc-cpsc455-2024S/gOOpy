import React, { useState, useEffect } from 'react';
function Slider({
    defaultValue,
    index,
    callback,
    callbackParams = [],
    max = 5,
    min = -5,
    useSimpleCallback = false,
    simpleCallBack,
}) {
    const [val, setVal] = useState(defaultValue);
    return (
        <input
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                if (!useSimpleCallback) {
                    setVal(newValue);
                    callback(index, newValue, ...callbackParams);
                } else {
                    setVal(newValue);
                    simpleCallBack(newValue);
                }
            }}
            type='range'
            min={min}
            max={max}
            step='0.001'
        ></input>
    );
}

export default Slider;
