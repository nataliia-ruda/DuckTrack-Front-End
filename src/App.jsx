import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Registration from "./components/Registration.jsx";
import Homepage from "./components/Homepage.jsx";
import NewApplicationForm from "./components/NewApplicationForm.jsx";




function App() {
 
  return (
    <>
       <Routes>
       <Route path="/" element={ <LandingPage/> } />
       <Route path="signup" element={ <Registration/> } />
       <Route path="home" element={ <Homepage/> } />
       <Route path="newapplication" element={ <NewApplicationForm/> } />
       </Routes>
    </>
  )
}

export default App
