import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const { user, setUser } = useGlobalContext();

  const token = user?.token;

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("user");
      setUser(null);
    }
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
