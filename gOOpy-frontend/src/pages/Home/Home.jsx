import { useAuth } from '../../components/AuthProvider';
import '../../index.css';
import { Link } from 'react-router-dom';
import MainBanner from './HomeComponents/MainBanner';
import AboutLeftAligned from './HomeComponents/AboutLeftAligned';

// TODO: insert context here
function Home() {
    const { user } = useAuth();
    console.log(user?._id);
    return (
        <main className='text-center'>
            <MainBanner />
            <AboutLeftAligned
                image={'./home/man.png'}
                title={'About gOOpy'}
                text={
                    'gOOpy is a 3D modeling software using ray marching rendering method, and signed distance functions (SDFs) to define geometry. Our goal is to enable artists to create 3D scenes in a unique way compared to traditional mesh-based methods. What users should expect is a platform where you can make an account to create, modify, download, and share scenes with other users.'
                }
            />
        </main>
    );
}

export default Home;
