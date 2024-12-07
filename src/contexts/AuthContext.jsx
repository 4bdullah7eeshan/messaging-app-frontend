import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    const token = localStorage.getItem("authToken");
    console.log("Retrieved token:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://messaging-app-backend-kwd9.onrender.com/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Verify Token Response Status:", response.status);

      if (!response.ok) {
        throw new Error("Token invalid");
      }

      const data = await response.json();
      console.log("User Data from Verify Token:", data.user);

      setUser(data.user);
    } catch (error) {
      console.error("Token validation failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);

      if (token) {
        const response = await fetch("https://messaging-app-backend-kwd9.onrender.com/auth/sign-out", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Logout failed on the server.");
        }
      }

      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => useContext(AuthContext);
