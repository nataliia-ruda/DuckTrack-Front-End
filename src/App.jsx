import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Registration from "./components/Registration.jsx";
import Homepage from "./components/Homepage.jsx";
import NewApplicationPage from "./components/NewApplicationPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./core/AuthContext";
import { useContext } from "react";
import MyApplicationsPage from "./components/MyApplicationsPage.jsx";
import "./App.css";
import EditApplicationPage from "./components/EditApplicationPage.jsx";

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
              <NewApplicationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="my-applications"
          element={
            <ProtectedRoute user={user}>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="my-applications/:id"
          element={
            <ProtectedRoute user={user}>
              <EditApplicationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
