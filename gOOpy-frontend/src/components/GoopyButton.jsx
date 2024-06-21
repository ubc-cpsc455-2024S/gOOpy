function GoopyButton(props) {
    return (
        <div
            className={`cursor-pointer ${
                props.hovering
                    ? 'bg-bg-yellow'
                    : 'bg-editor-box hover:bg-editor-hover'
            } ${props.styleClasses}`}
            onClick={props.onClickBehavior}
        >
            {props.children}
        </div>
    );
}

export default GoopyButton;
