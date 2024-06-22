import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/slices/userSlice.js';
import { useState } from 'react';
import Button from '../../components/Button.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // for demo: delete after
    const [username, setUsername] = useState('');

    async function login(event) {
        try {
            await dispatch(userLogin(username)).unwrap();
            navigate('/user');
        } catch (error) {}
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
                <input name='password' type='password' />
                <Button
                    type='submit'
                    className='bg-font-brown hover:bg-editor-hover text-white font-bold py-2 px-4 rounded-full'
                    onClick={() => {
                        login(username);
                    }}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;

// TODO: once user logs in take them to user page.
