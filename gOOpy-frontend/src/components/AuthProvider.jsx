import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { LOCAL_SERVER_URL } from '../apiCalls/sceneAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const initialUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState(initialUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionUser = await axios.get(
                    `${LOCAL_SERVER_URL}/auth/session-user`,
                    { withCredentials: true }
                );
                const u = JSON.parse(sessionUser.data);
                console.log(u._id);
                setUser(u);
            } catch (err) {
                console.log('not logged in');
            }
        };
        fetchUser();
    }, [setUser]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
