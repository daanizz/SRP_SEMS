import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import SidebarTherapy from "../../components/SidebarTherapy";
import TherapyFilter from "./TherapyFilter";
import TherapyList from "./TherapyList";
import TherapyDetailsModal from "../../components/TherapyDetailsModal";
import { therapyData } from "./therapyData";

const TherapyPage = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedDate, setSelectedDate] = useState("05 Feb 2024");
  const [activeNav, setActiveNav] = useState("Therapy");
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  const students = ["John Doe", "Jane Smith", "Mike Johnson", "Emily Brown"];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <SidebarTherapy activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md p-6 flex justify-between items-center sticky top-0 z-10"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Therapy Tracking
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </motion.button>
        </motion.div>

        <div className="p-8">
          {/* Filters */}
          <TherapyFilter
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            students={students}
          />

          {/* Cards/List */}
          <TherapyList data={therapyData} onSelect={(t) => setSelectedTherapy(t)} />
        </div>
      </div>

      {/* Modal */}
      <TherapyDetailsModal
        therapy={selectedTherapy}
        onClose={() => setSelectedTherapy(null)}
      />
    </div>
  );
};

export default TherapyPage;
