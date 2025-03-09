import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Registration from "./components/Registration.jsx";
import Homepage from "./components/Homepage.jsx";
import NewApplicationForm from "./components/NewApplicationForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./core/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<Registration />} />

        <Route
          path="home"
          element={
            <ProtectedRoute user={user}>
              <Homepage />
            </ProtectedRoute>
          }
        />

        <Route
          path="newapplication"
          element={
            <ProtectedRoute user={user}>
              <NewApplicationForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
