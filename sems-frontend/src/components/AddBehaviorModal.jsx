import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

const AddBehaviorModal = ({ onClose, onAdded }) => {
  const [studentName, setStudentName] = useState("");
  const [mood, setMood] = useState("Happy");
  const [incidents, setIncidents] = useState(0);
  const [notes, setNotes] = useState("");

  const teacherName = localStorage.getItem("userName"); // save this during login
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5050/api/behavior/add",
        {
          studentName,
          mood: mood.toLowerCase(),
          incidents,
          notes,
          date: today,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      onAdded(data);
      onClose();
    } catch (err) {
      alert("Failed to add log");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add Behavior Log
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-700 hover:rotate-90 transition" />
          </button>
        </div>

        {/* Student */}
        <div>
          <label className="font-semibold text-gray-700">Student Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 mt-1 border rounded-xl bg-gray-50 shadow-sm focus:border-blue-600 outline-none"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        {/* Mood */}
        <div>
          <label className="font-semibold text-gray-700">Mood</label>
          <select
            className="w-full px-4 py-3 mt-1 border rounded-xl bg-gray-50 shadow-sm"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option>Happy</option>
            <option>Neutral</option>
            <option>Sad</option>
          </select>
        </div>

        {/* Incidents */}
        <div>
          <label className="font-semibold text-gray-700">Incidents</label>
          <input
            type="number"
            className="w-full px-4 py-3 mt-1 border rounded-xl bg-gray-50 shadow-sm"
            value={incidents}
            onChange={(e) => setIncidents(Number(e.target.value))}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold text-gray-700">Notes</label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 mt-1 border rounded-xl bg-gray-50 shadow-sm"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition"
        >
          Save Log
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddBehaviorModal;
