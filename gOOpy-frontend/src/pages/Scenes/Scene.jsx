import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Scene({ image, name, lastEditDate, sceneId }) {
    return (
        <div className='bg-white max-w-56 w-full rounded-lg shadow-lg'>
            <Link to={`/editor/${sceneId}`}>
                <div className='aspect-w-1 aspect-h-1'>
                    <img
                        className='rounded-t-lg object-cover w-full h-full'
                        src={image}
                        alt={name}
                    />
                </div>
            </Link>
            <div className='px-2 pt-1 pb-1'>
                <h1 className='truncate ... w-full text-lg' aria-label={name}>
                    {name}
                </h1>
                <p className='truncate ... w-full text-xs'>{lastEditDate}</p>
            </div>
        </div>
    );
}
