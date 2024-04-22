import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRouter = ()=>  {
  const { userInfo } = useSelector((state: RootState) => state.authSlice);

  return userInfo ? <Outlet/> : <Navigate  to="/" replace />;
}

export default PrivateRouter;
