import React, { useState, createContext, useContext, useEffect } from "react";
// Create the context 
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsAuth(localStorage.getItem("jwt"))
        if (isAuth) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [isAuth])

    const logout = async () => {
        // const result = await AuthLogout();

        // if (result) {
        console.log("The User has logged out");
        setIsAuth('');
        localStorage.removeItem("jwt");
        // }
        // return result
    };

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Finally creating the custom hook 
export const useAuth = () => useContext(AuthContext);