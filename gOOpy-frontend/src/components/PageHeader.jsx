import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { loginUserGoogle, logoutUserGoogle } from '../apiCalls/userAPI';

export default function PageHeader() {
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        const result = await logoutUserGoogle();
        if (result) {
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
                <button onClick={loginUserGoogle}>Login</button>
            )}
        </header>
    );
}
