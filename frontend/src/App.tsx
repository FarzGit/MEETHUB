import LandingPage from "./pages/User/landingPage/landingPage"
import MainPage from "./pages/User/userMainPage/mainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRouter from "./validations/privateRouter";
import AdminLoginPage from "./pages/Admin/adminLoginPage/adminLoginPage";


function App() {


  return (
    <>

      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route  element={<PrivateRouter/>}>
            <Route path="/home" element={<MainPage />} />
          </Route>
          <Route path="/admin-login" element={<AdminLoginPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App