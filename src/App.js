import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContext";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import axios from "axios";
import TravelPlannerPage from "./Pages/TravelPlannerPage";
import PlansPage from "./Pages/PlansPage";

function App() {
  const [token, setToken] = useState(null);

  const login = (username, password) => {
    axios
      .post(
        "http://127.0.0.1:5000/api/users/login",
        {
          email: username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        alert("Login successful");
        setToken(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed", error);
      });
  };

  const logout = () => {
    axios
      .get("http://127.0.0.1:5000/api/users/logout", { withCredentials: true })
      .then((response) => {
        console.log(response);
        alert("Logout successful");
        setToken(null);
      })
      .catch((error) => {
        console.log(error);
        alert("Logout failed", error);
      });
  };

  const loggedOutRoutes = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/t" element={<TravelPlannerPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  const loggedInRoutes = (
    <Routes>
      <Route path="/" element={<TravelPlannerPage />} />
      <Route path="/plans" element={<PlansPage />} />
      {/* <Route path="/about" element={<AboutPage />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <BrowserRouter>
        <Navbar />
        {!token ? loggedOutRoutes : loggedInRoutes}
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
