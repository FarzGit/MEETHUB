/* eslint-disable @typescript-eslint/no-unused-vars */
import LandingPage from "./pages/User/landingPage/landingPage"
import MainPage from "./pages/User/userMainPage/mainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRouter from "./validations/privateRouter";
import AdminLoginPage from "./pages/Admin/adminLoginPage/adminLoginPage";
import PremiumPage from "./pages/User/Premium/premium";
import UsersList from "./pages/Admin/usersList/usersList";
import MeetInterface from "./pages/meet/meetInterface";
import AdninPrivateRouter from "./validations/adminPrivateRoute";






function App() {

  


  return (
    <>

      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route  element={<PrivateRouter/>}>
            <Route path="/home" element={<MainPage />} />
            <Route path="/premium" element={<PremiumPage />} />
          </Route>

          <Route path="/admin-login" element={<AdminLoginPage/>} />
          <Route element={<AdninPrivateRouter/>}>
          <Route path="/users-list" element={<UsersList/>} />
          </Route>
          <Route path="/meet/:roomId" element={<MeetInterface/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App