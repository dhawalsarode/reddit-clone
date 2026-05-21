import {
  createContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../api/authApi";

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

  useEffect(() => {

  const fetchUser = async () => {

    if (!token) return;

    try {

      const response =
        await getCurrentUser();

      setUser(response.data);

    } catch (error) {

      console.log(error);

      logout();
    }
  };

  fetchUser();

}, [token]);


  const logout = () => {

  localStorage.removeItem("token");

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