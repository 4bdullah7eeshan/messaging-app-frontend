import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     const storedUser = JSON.parse(localStorage.getItem("user"));
  //     setUser(storedUser);
  //   }
  //   setLoading(false);
  // }, []);
  const validateToken = async () => {
    const token = localStorage.getItem("authToken");
    console.log("Retrieved token:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/verify-token", {
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
