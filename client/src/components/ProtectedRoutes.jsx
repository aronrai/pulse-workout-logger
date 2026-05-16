import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Loading from "./Loading";

const ProtedtedRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const isInitialising = useAuthStore((state) => state.isInitialising);
  if (isInitialising) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default ProtedtedRoutes;
