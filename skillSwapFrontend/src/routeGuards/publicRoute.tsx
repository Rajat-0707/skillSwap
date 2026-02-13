import { Navigate } from "react-router-dom";
import { AuthContext } from "../authcontext"; 
import { useContext } from "react";

export default function PublicRoute({ children }: { children: React.ReactElement }) {

  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { isLoggedIn } = auth;

  if (isLoggedIn) {
    return <Navigate to="/search" replace />;
  }

  return children;
}
