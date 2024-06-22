import { useDispatch, useSelector } from 'react-redux';
import { tempUserLogin } from '../../redux/slices/userSlice.js';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const userID = useSelector((state) => state.user.userID);

    // for demo: delete after
    const [username, setUsername] = useState('');

    async function userLogin(event) {
        event.preventDefault();
        let resp = await axios.get(`http://127.0.0.1:3000/users/${username}`);
        console.log(resp.data);
    }

    return (
        <div className='flex align-middle'>
            <form className='sliders' onSubmit={userLogin}>
                <label>Username: </label>
                <input
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password: </label>
                <input name='password' />
                <button
                    type='submit'
                    className='bg-font-brown hover:bg-editor-hover text-white font-bold py-2 px-4 rounded-full'
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

// TODO: enable user to logout (edit store id to be null essentially)
// TODO: change the login button to logout once the user is logged in (classname not null)
// This above point will have to be done in the header.
// TODO: once user logs in take them to user page.
