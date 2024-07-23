import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionUser = await axios.get(
                    'http://localhost:3000/auth/session-user',
                    { withCredentials: true }
                );
                setUser(sessionUser).data;
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
