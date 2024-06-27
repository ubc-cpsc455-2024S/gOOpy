import React, { useState } from 'react';
import GoopyButton from './GoopyButton';
function ToggleView(props) {
    const [showing, toggleView] = useState(false);
    return (
        <div className={`${props.classes}`}>
            <GoopyButton
                onClick={() => {
                    toggleView(!showing);
                }}
                classes={`border-b button cursor-pointer flex w-full`}
            >
                <h4 className='text-xl'>{props.label}</h4>
            </GoopyButton>
            {showing && props.children}
        </div>
    );
}

export default ToggleView;
