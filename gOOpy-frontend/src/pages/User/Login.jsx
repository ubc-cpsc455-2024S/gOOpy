import { useDispatch, useSelector } from "react-redux";
import { tempUserLogin } from '../../redux/slices/userSlice.js'

const Login = () => {
    const dispatch = useDispatch();
    const userID = useSelector((state) => state.user.userID);

    function userLogin(event) {
        event.preventDefault();
        dispatch(tempUserLogin());
        // console.log(userID);
    }

    return (
        <div className='flex align-middle'>
            <form className='sliders' onSubmit={userLogin}>
                <label>Username: </label>
                <input name='username' />
                <label>Password: </label>
                <input name='password' />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;


// TODO: enable user to logout (edit store id to be null essentially)
// TODO: change the login button to logout once the user is logged in (classname not null)
// This above point will have to be done in the header. 
// TODO: once user logs in take them to user page. 