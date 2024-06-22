import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/slices/userSlice.js';
import { useState } from 'react';
import Button from '../../components/Button.jsx';

const Login = () => {
    const dispatch = useDispatch();

    // for demo: delete after
    const [username, setUsername] = useState('');

    async function login(event) {
        event.preventDefault();
        dispatch(userLogin(username));
    }

    return (
        <div className='flex align-middle'>
            <form className='sliders' onSubmit={login}>
                <label>Username: </label>
                <input
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password: </label>
                <input name='password' />
                <Button
                    type='submit'
                    className='bg-font-brown hover:bg-editor-hover text-white font-bold py-2 px-4 rounded-full'
                    onClick={() => login(username)}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;

// TODO: enable user to logout (edit store id to be null essentially)
// TODO: change the login button to logout once the user is logged in (classname not null)
// This above point will have to be done in the header.
// TODO: once user logs in take them to user page.
