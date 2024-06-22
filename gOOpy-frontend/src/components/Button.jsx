export default function Button({ children, onClick = null }) {
    function buttonOnClick(event) {
        if (!onClick) return;
        event.preventDefault();
        onClick();
    }

    return (
        <button
            onClick={buttonOnClick}
            className='bg-font-brown hover:bg-editor-hover text-white font-bold py-2 px-4 rounded-full'
        >
            {children}
        </button>
    );
}
