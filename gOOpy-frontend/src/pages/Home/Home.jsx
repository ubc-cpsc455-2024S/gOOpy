import { useSelector } from 'react-redux';
import '../../index.css';
import { Link } from 'react-router-dom';

function Home() {
    const userID = useSelector((state) => state.user._id);
    return (
        <main className='p-10 text-center'>
            <span>Welcome to</span>
            <h1 className='text-5xl font-bold'>gOOpy</h1>
            <h2 className='text-1xl'>The 3D scene editor</h2>
            <div className='pt-10'>
                <Link to='/editor' className='hover:underline'>
                    Click here to see the editor
                </Link>
            </div>
            <div className='pt-10'>
                <Link to={`/user/${userID}`} className='hover:underline'>
                    Click here to see the user page
                </Link>
            </div>
        </main>
    );
}

export default Home;
