import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import { useAuth } from './AuthProvider';
import { logoutUserGoogle } from '../apiCalls/userAPI';

export default function PageHeader() {
    const { user, setUser } = useAuth();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const result = await logoutUserGoogle();
        if (result) {
            // dispatch(clearUser());
            setUser(null);
        }
    };

    return (
        <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
            <Link to='/' className='text-3xl font-bold'>
                gOOpy
            </Link>
            {user ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <Link to={`/login`}>Login</Link>
            )}
        </header>
    );
}
