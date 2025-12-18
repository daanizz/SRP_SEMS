import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import BehaviorFilter from "./BehaviorFilter";
import BehaviorTable from "./BehaviorTable";
import BehaviorDetailsModal from "../../components/BehaviorDetailsModal";
import AddBehaviorModal from "../../components/AddBehaviorModal";
import { behaviorData } from "./behaviorData";

if (!localStorage.getItem("accessToken")) {
  window.location.href = "/login";
}

const BehaviorPage = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedDate, setSelectedDate] = useState("03-12-2025");
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeNav, setActiveNav] = useState("Behavior");

  const [showAddModal, setShowAddModal] = useState(false);
  const [logs, setLogs] = useState(behaviorData);

  const students = ["John Doe", "Jane Smith", "Mike Johnson"];

  const handleAdded = (newLog) => {
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Behavior Tracking</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition"
          >
            + Add Log
          </button>
        </div>

        <BehaviorFilter
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          students={students}
        />

        <BehaviorTable data={logs} onView={(log) => setSelectedLog(log)} />

        <BehaviorDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />

        {showAddModal && (
          <AddBehaviorModal
            onClose={() => setShowAddModal(false)}
            onAdded={handleAdded}
          />
        )}
      </div>
    </div>
  );
};

export default BehaviorPage;
