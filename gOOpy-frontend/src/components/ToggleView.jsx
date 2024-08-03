import React, { useState } from 'react';
import GoopyButton from './GoopyButton';
function ToggleView({ label, classes, children }) {
    const [showing, toggleView] = useState(false);
    return (
        <div className={`${classes}`}>
            <GoopyButton
                onClick={() => {
                    toggleView(!showing);
                }}
                classes={`border-b button cursor-pointer flex w-full`}
                isSelected={showing}
            >
                <h4 className='text-xl'>{label}</h4>
            </GoopyButton>
            {showing && children}
        </div>
    );
}

export default ToggleView;
