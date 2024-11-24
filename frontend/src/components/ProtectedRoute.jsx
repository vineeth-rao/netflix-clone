import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ element: Component }) {
  const { user } = useAuthStore();

  return user ? Component : <Navigate to="/login" />;
}


