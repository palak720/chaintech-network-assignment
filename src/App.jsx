
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { getCurrentUser } from "./services/auth";

function PrivateRoute({ children }) {
  return getCurrentUser() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
