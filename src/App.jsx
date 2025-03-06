import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Registration from "./components/Registration.jsx";
import LoginPage from "./components/LoginPage.jsx"



function App() {
 
  return (
    <>
       <Routes>
       <Route path="/" element={ <LandingPage/> } />
       <Route path="signup" element={ <Registration/> } />
       <Route path="signin" element={ <LoginPage/> } />
       </Routes>
    </>
  )
}

export default App
