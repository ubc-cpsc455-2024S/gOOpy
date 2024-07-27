import { useAuth } from '../../components/AuthProvider';
import '../../index.css';
import { Link } from 'react-router-dom';

// TODO: insert context here
function Home() {
    const { user } = useAuth();
    console.log(user?._id);
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
                <Link to='/user' className='hover:underline'>
                    Click here to see all users
                </Link>
            </div>
            {user && (
                <div className='pt-10'>
                    <Link to={`/user/${user._id}`} className='hover:underline'>
                        Click here to see your user page
                    </Link>
                </div>
            )}
            <div className='pt-10'>
                <Link to={`/tutorial`} className='hover:underline'>
                    Read the tutorial
                </Link>
            </div>
        </main>
    );
}

export default Home;
