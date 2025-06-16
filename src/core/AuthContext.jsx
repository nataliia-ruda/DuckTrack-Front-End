import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.loggedIn) {
          setUser(data.user);
          setIsLogged(true);
        } else {
          setUser(null);
          setIsLogged(false);
        }
      })
      .catch((err) => {
        console.error("Session check failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = ({ user_id, user_first_name, user_last_name, gender }) => {
    setIsLogged(true);
    setUser({ user_id, user_first_name, user_last_name, gender });
  };

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      setIsLogged(false);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
