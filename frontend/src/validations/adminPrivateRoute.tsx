import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";


const AdninPrivateRouter = ()=>  {
  const { adminInfo } = useSelector((state: RootState) => state.authSlice);
  console.log('private router',adminInfo)

  return adminInfo ? <Outlet/> : <Navigate  to="/admin-login" replace />;
}

export default AdninPrivateRouter;