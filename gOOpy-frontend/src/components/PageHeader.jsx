import { Link } from 'react-router-dom';
import GoopyButton from './GoopyButton';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/slices/userSlice';

export default function PageHeader() {
    const userID = useSelector((state) => state.user.userID);
    const dispatch = useDispatch();
    return (
        <header className='sticky top-0 z-50 flex justify-between items-center bg-hd-color p-2'>
            <Link to='/' className='text-3xl font-bold'>
                gOOpy
            </Link>
            {userID === null ? (
                <Link to='/login'>Login</Link>
            ) : (
                <GoopyButton
                    styleClass={''}
                    onClick={() => dispatch(userLogout())}
                >
                    <p>Logout</p>
                </GoopyButton>
            )}
        </header>
    );
}
