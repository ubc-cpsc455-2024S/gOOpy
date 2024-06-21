import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function App() {
    return (
        <>
            <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
                <Link to='/' className='text-3xl font-bold'>
                    gOOpy
                </Link>
                <Link to='/login'>Login</Link>
            </header>
            <Outlet />
        </>
    );
}
