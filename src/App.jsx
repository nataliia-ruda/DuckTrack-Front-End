import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Registration from "./components/Registration.jsx";
import Homepage from "./components/Homepage.jsx";
import NewApplicationPage  from "./components/NewApplicationPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./core/AuthContext";
import { useContext } from "react";
import NewApplicationForm from "./components/NewApplicationForm.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
    <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="signup" element={<Registration />} />

  
  {/* Protected Route for Home Page */}
  <Route
    path="home"
    element={
      <ProtectedRoute user={user}>
        <Homepage />
      </ProtectedRoute>
    }
  />
  
  {/* Protected Route for New Application Page */}
   <Route
    path="new-application"
    element={
      <ProtectedRoute user={user}>
        <NewApplicationPage/>
      </ProtectedRoute>
    }
  /> 
</Routes>
    </>
  );
}

export default App;
