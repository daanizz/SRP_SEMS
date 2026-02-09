import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Target,
  Check,
  Eye,
  Gamepad2,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    icon: Activity,
    path: "/admin/dashboard",
    roles: ["admin"],
  },
  {
    name: "Dashboard",
    icon: Activity,
    path: "/teacher/dashboard",
    roles: ["teacher"],
  },
  {
    name: "Students",
    icon: Calendar,
    path: "/admin/students",
    roles: ["admin"],
  },
  {
    name: "Behavior",
    icon: Eye,
    path: "/behavior",
    roles: ["admin", "teacher"],
  },
  {
    name: "Therapy",
    icon: Target,
    path: "/therapy",
    roles: ["admin", "teacher"],
  },
  {
    name: "Evaluation",
    icon: Check,
    path: "/evaluation",
    roles: ["admin", "teacher"],
  },
  {
    name: "Games",
    icon: Gamepad2,
    path: "/games",
    roles: ["teacher"],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fullName = localStorage.getItem("fullName");
  const role = localStorage.getItem("role"); // admin | teacher

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-xl font-bold">Student Portal</h1>
        <p className="text-sm text-blue-300 mt-1">{fullName}</p>
        <p className="text-xs text-blue-400 uppercase tracking-wider">
          {role}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition
                  ${
                    isActive
                      ? "bg-blue-700 shadow-lg"
                      : "hover:bg-blue-800/50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-red-300 hover:bg-red-600/20"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
