function GoopyButton({ onClick, classes, children, isSelected = false }) {
    return (
        <div
            className={`cursor-pointer ${
                isSelected
                    ? 'bg-bg-yellow'
                    : 'bg-editor-box hover:bg-editor-hover'
            } ${classes}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default GoopyButton;
