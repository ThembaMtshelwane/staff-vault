import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../store";

const PrivateRoutes = ({ role }: { role: "admin" | "general" }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  if (role && userInfo.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
