import {
    header,
    imageStyle,
    outerDiv,
    paragraph,
    textDiv,
} from './infoBlockConstants';

export default function RightAlignedInfoBlock({ image, title, text }) {
    return (
        <div className={outerDiv + ' ' + 'flex-wrap-reverse'}>
            <div className={textDiv + ' ' + 'sm:pr-10 xl:pr-20'}>
                <h1 className={header + ' ' + 'sm:text-right'}>{title}</h1>
                <p className={paragraph + ' ' + 'sm:text-right'}>{text}</p>
            </div>
            <img src={image} className={imageStyle} />
        </div>
    );
}
