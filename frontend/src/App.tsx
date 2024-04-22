import LandingPage from "./pages/landingPage/landingPage"
import MainPage from "./pages/userMainPage/mainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRouter from "./validations/privateRouter";


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App