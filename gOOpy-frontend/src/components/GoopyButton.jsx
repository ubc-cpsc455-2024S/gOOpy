function GoopyButton({
    onClick,
    classes,
    children,
    isSelected = false,
    isDisabled = false,
}) {
    const stateStyle = isDisabled
        ? 'bg-disabled-gray hover:cursor-not-allowed'
        : isSelected
        ? 'bg-bg-yellow'
        : 'bg-editor-box hover:bg-editor-hover';
    return (
        <div
            className={`cursor-pointer ${stateStyle} ${classes}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default GoopyButton;
