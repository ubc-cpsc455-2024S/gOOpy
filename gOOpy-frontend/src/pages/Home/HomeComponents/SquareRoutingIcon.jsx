import { Link } from 'react-router-dom';

const textStyle = 'text-base md:text-xl lg:text-2xl';

export default function SquareRoutingIcon({
    icon,
    pagePath,
    topText,
    bottomText,
}) {
    return (
        <Link to={pagePath}>
            <div
                width='40%'
                className='grid grid-cols-1 justify-items-center bg-white border-black border-2 p-3 rounded-3xl'
            >
                {icon}
                <p className={textStyle}>{topText}</p>
                <p className={textStyle}>{bottomText}</p>
            </div>
        </Link>
    );
}
