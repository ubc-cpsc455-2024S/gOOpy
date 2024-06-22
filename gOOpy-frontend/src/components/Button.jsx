export default function Button({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className='bg-font-brown hover:bg-editor-hover text-white font-bold py-2 px-4 rounded-full'
        >
            {children}
        </button>
    );
}
