import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { loginUserGoogle, logoutUserGoogle } from '../apiCalls/userAPI';

export default function PageHeader() {
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    return (
        <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
            <Link to='/' className='text-3xl font-bold'>
                gOOpy
            </Link>
            {isAuthenticated ? (
                <button
                    onClick={async () => {
                        dispatch(clearUser());
                        await logoutUserGoogle();
                    }}
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={async () => {
                        await loginUserGoogle();
                        console.log(isAuthenticated);
                    }}
                >
                    Login with Google
                </button>
            )}
        </header>
    );
}
