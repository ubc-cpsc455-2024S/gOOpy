import {
    header,
    imageStyle,
    outerDiv,
    paragraph,
    textDiv,
} from './infoBlockConstants';

export default function LeftAlignedInfoBlock({ image, title, text }) {
    return (
        <div className={outerDiv + ' ' + 'flex-wrap'}>
            <img src={image} className={imageStyle} />
            <div className={textDiv + ' ' + 'sm:pl-10 xl:pl-20'}>
                <h1 className={header + ' ' + 'sm:text-left'}>{title}</h1>
                <p className={paragraph + ' ' + 'sm:text-left'}>{text}</p>
            </div>
        </div>
    );
}
