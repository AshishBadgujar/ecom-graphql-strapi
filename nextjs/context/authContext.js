import React, { useState, createContext, useContext, useEffect } from "react";
// Create the context 
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const localStorageValue = localStorage.getItem("jwt")
    // Use this value as the defalt value for the state 
    const [isAuth, setIsAuth] = useState(localStorageValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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