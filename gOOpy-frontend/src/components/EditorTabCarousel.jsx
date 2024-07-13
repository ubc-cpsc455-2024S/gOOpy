import GoopyButton from './GoopyButton';

function EditorTabCarousel({ setEditorView }) {
    return (
        <div className='flex flex-row overflow-scroll bg-panel-primary border'>
            <GoopyButton
                classes='border-r p-2'
                onClick={() => {
                    setEditorView('shapes');
                }}
            >
                Shapes
            </GoopyButton>
            <GoopyButton
                classes='border-r p-2'
                onClick={() => {
                    setEditorView('scene');
                }}
            >
                Scene
            </GoopyButton>
        </div>
    );
}

export default EditorTabCarousel;
