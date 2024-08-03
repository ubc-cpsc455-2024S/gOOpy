import { useEffect, useState } from 'react';
import GoopyButton from './GoopyButton';

function EditorTabCarousel({ setEditorView, selected }) {
    return (
        <div className='flex flex-row overflow-scroll bg-panel-primary border no-scrollbar'>
            <GoopyButton
                classes='border-r p-2'
                onClick={() => {
                    setEditorView('shapes');
                }}
                isSelected={selected === 'shapes'}
            >
                Shapes
            </GoopyButton>
            <GoopyButton
                classes='border-r p-2'
                onClick={() => {
                    setEditorView('scene');
                }}
                isSelected={selected === 'scene'}
            >
                Scene
            </GoopyButton>
        </div>
    );
}

export default EditorTabCarousel;
