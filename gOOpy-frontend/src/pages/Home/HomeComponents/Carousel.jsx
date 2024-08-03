import { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { header } from './infoBlockConstants';

export default function Carousel({ imagePaths }) {
    const handleDragStart = (e) => e.preventDefault();

    const hallOfFameImageStyle =
        'h-1/12 h-1/12 drop-shadow rounded-3xl pl-1 pr-1';
    const [hallOfFame, setHallOfFame] = useState([]);

    useEffect(() => {
        setHallOfFame((prevHallOfFame) =>
            imagePaths.map((path) => (
                <img
                    src={path}
                    onDragStart={handleDragStart}
                    role='presentation'
                    className={hallOfFameImageStyle}
                />
            ))
        );
    }, [imagePaths]);

    return (
        <div className='pt-5 pb-10'>
            <h1 className={header + ' ' + 'underline'}>Hall of Fame</h1>
            <div className='flex justify-center pt-5'>
                <div className='w-2/3'>
                    <AliceCarousel
                        mouseTracking
                        items={hallOfFame}
                        responsive={{
                            0: {
                                items: 2,
                                itemsFit: 'contain',
                            },
                            512: {
                                items: 3,
                                itemsFit: 'contain',
                            },
                            768: {
                                items: 4,
                                itemsFit: 'contain',
                            },
                            1024: {
                                items: 5,
                                itemsFit: 'fill',
                            },
                            1280: {
                                items: 6,
                                itemsFit: 'fill',
                            },
                        }}
                        autoPlay={true}
                        autoPlayInterval={3000}
                        paddingLeft={25}
                        paddingRight={25}
                        infinite
                        disableDotsControls
                        disableButtonsControls
                    />
                </div>
            </div>
        </div>
    );
}
