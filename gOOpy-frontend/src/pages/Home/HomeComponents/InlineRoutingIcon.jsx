import { Link } from 'react-router-dom';

export default function InlineRoutingIcon({
    icon,
    pagePath = '',
    text,
    onClick = () => {},
}) {
    return (
        <Link to={pagePath}>
            <div
                onClick={onClick}
                className='flex shadow-xl justify-center items-center bg-white hover:bg-grey-blue border-black border-2 mx-20 max-w-full min-w-52 sm:min-w-56 md:min-w-64 lg:min-w-80 rounded-3xl pl-3 pr-3'
            >
                {icon}
                <p className='text-2xl md:text-3xl lg:text-4xl pl-5'>{text}</p>
            </div>
        </Link>
    );
}
