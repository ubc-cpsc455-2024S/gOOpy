import Button from '../../components/Button.jsx';
import { loginUserGoogle } from '../../apiCalls/userAPI.js';

const Login = () => {
    return (
        <div className='flex align-middle'>
            <Button
                type='submit'
                className='bg-font-brown hover:bg-editor-hover text-white font-bold py-2 px-4 rounded-full'
                onClick={async () => {
                    await loginUserGoogle();
                }}
            >
                Login with Google
            </Button>
        </div>
    );
};

export default Login;

// TODO: once user logs in take them to user page.
