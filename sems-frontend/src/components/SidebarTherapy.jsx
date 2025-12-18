import React from "react";
import { motion } from "framer-motion";
import { Activity, Calendar, Target, Clock, Award ,Check,Eye} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: Activity },
  { name: "Student", icon: Calendar },
  { name: "Therapy", icon: Target },
  {name:"Behavior",icon:Eye},
  { name: "Evaluation", icon: Check },
  { name: "Goal", icon: Award },
];

const SidebarTherapy = ({ activeNav, setActiveNav }) => {
  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-64 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white shadow-2xl h-screen"
    >
      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          Student Portal
        </motion.h1>
      </div>

      <nav className="px-3 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => setActiveNav(item.name)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                activeNav === item.name
                  ? "bg-blue-700 shadow-lg shadow-blue-900/50"
                  : "hover:bg-blue-800/50"
              }`}
              whileHover={{ x: 8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default SidebarTherapy;
