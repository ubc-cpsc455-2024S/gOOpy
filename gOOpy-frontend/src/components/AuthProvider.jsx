import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionUser = await axios.get(`${LOCAL_SERVER_URL}/auth/session-user`);
                setUser(sessionUser);
            } catch (err) {
                console.log('not logged in');
            }
        };
        fetchUser
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)