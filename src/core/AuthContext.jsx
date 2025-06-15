import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);

    const login = ({ user_id, user_first_name, user_last_name, gender }) => {
        setIsLogged(true);
        setUser({ user_id, user_first_name, user_last_name, gender });
    };

    const logout = () => {
        setIsLogged(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLogged, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;