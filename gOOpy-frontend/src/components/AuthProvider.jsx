import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LOCAL_SERVER_URL } from '../apiCalls/sceneAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const initialUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionUser = await axios.get(
                    `${LOCAL_SERVER_URL}/auth/session-user`,
                    { withCredentials: true }
                );
                const u = JSON.parse(sessionUser.data);
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
