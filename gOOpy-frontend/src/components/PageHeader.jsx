import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/slices/userSlice';
import { loginUserGoogle } from '../apiCalls/userAPI';

export default function PageHeader() {
    const userID = useSelector((state) => state.user._id);
    const dispatch = useDispatch();
    return (
        <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
            <Link to='/' className='text-3xl font-bold'>
                gOOpy
            </Link>
            {userID === null ? (
                <Link to='/login'>Login</Link>
            ) : (
                <button
                    onClick={() => {
                        dispatch(userLogout());
                        loginUserGoogle();
                    }}
                >
                    Login with Google
                </button>
            )}
        </header>
    );
}
