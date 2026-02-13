import { Navigate } from "react-router-dom";
import { AuthContext } from "../authcontext"; 
import { useContext } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {

  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { isLoggedIn } = auth;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
