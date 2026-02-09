import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

import BehaviorPage from "./pages/Behavior/BehaviorPage";
import TherapyPage from "./pages/Therapy/TherapyPage";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentsPage from "./pages/Admin/StudentsPage";

import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import GamesPortal from "./pages/Games/GamePortal";
import EvaluationHome from "./pages/Evaluation/EvaluationHome";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />

        {/* TEACHER ROUTES */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* SHARED ROUTES */}
        <Route
          path="/behavior"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <BehaviorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/therapy"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <TherapyPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/evaluation"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <EvaluationHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/games"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <GamesPortal hideSidebar={true} />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
