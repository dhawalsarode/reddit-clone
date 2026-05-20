import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  useEffect(() => {

    if (token) {
      localStorage.setItem(
        "token",
        token
      );
    } else {
      localStorage.removeItem("token");
    }

  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;