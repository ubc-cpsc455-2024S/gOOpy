const Login = () => {
    return (
        <div className='flex align-middle'>
            <form className='sliders'>
                <label>Username: </label>
                <input name='username' />
                <label>Password: </label>
                <input name='password' />
            </form>
        </div>
    );
};

export default Login;
