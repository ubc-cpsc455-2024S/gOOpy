import '../../index.css';
import MainBanner from './HomeComponents/MainBanner';
import LeftAlignedInfoBlock from './HomeComponents/LeftAlignedInfoBlock';
import RightAlignedInfoBlock from './HomeComponents/RightAlignedInfoBlock';

import Carousel from './HomeComponents/Carousel';
import HomeFooter from './HomeComponents/HomeFooter';
function Home() {
    return (
        <main className='text-center'>
            <MainBanner />
            <LeftAlignedInfoBlock
                image={'./home/goopy_images/man.png'}
                title={'About gOOpy'}
                text={
                    'gOOpy is a 3D modeling software using ray marching rendering method, and signed distance functions (SDFs) to define geometry. Our goal is to enable artists to create 3D scenes in a unique way compared to traditional mesh-based methods. What users should expect is a platform where you can make an account to create, modify, download, and share scenes with other users.'
                }
            />
            <RightAlignedInfoBlock
                image={'./home/goopy_images/mushroom.png'}
                title={'What is Ray Marching?'}
                text={
                    'For each pixel, we cast a ray into the scene to check for collisions. Unlike ray tracing which finds intersections of rays with polygons, ray marching (in our implementation) figures out the distance to the nearest shape, and then takes small steps until it hits the surface. This allows for some very fun new possibilities.'
                }
            />
            <Carousel
                imagePaths={[
                    './home/goopy_images/mushroom.png',
                    './home/goopy_images/toilet_angel.png',
                    './home/goopy_images/space.png',
                    './home/goopy_images/computer.png',
                    './home/goopy_images/dogbear.png',
                    './home/goopy_images/man.png',
                    './home/goopy_images/mushroom.png',
                    './home/goopy_images/toilet_angel.png',
                    './home/goopy_images/space.png',
                    './home/goopy_images/computer.png',
                    './home/goopy_images/dogbear.png',
                    './home/goopy_images/man.png',
                    './home/goopy_images/mushroom.png',
                    './home/goopy_images/toilet_angel.png',
                    './home/goopy_images/space.png',
                    './home/goopy_images/computer.png',
                    './home/goopy_images/dogbear.png',
                    './home/goopy_images/man.png',
                ]}
            />
            <HomeFooter />
        </main>
    );
}

export default Home;
