import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to sign-in page if not logged in
    return <Navigate to="/sign_in" />;
  }

  return children;};

export default ProtectedRoute;
