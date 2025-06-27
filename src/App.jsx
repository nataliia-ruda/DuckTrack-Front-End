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
import EditProfilePage from "./components/EditProfilePage.jsx";
import StatisctisPage from "./components/StatisctisPage.jsx";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import VerifyEmailPage from "./components/VerifyEmailPage.jsx";
import VerifyRequiredPage from "./components/VerifyRequiredPage.jsx";


function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="signup" element={<Registration />} />
      <Route path="/verify-email" element={<VerifyEmailPage/>}/>
      <Route path="/verify-required" element={<VerifyRequiredPage />} />

      <Route
        path="home"
        element={
          <ProtectedRoute user={user}>
            <Homepage />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/update-profile/:id"
        element={
          <ProtectedRoute user={user}>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="statistics"
        element={
          <ProtectedRoute user={user}>
            <StatisctisPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
