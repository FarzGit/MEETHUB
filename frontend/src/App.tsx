import LandingPage from "./pages/landingPage/landingPage"
import MainPage from "./pages/userMainPage/mainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <>
   
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<MainPage/>} />

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App