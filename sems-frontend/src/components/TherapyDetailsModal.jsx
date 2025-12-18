import React from "react";
import { motion } from "framer-motion";
import { X, User, Clock, Activity, FileText, Award, Target } from "lucide-react";
import { getTherapyColor, getTherapyIcon } from "../pages/Therapy/therapyUtils";

const TherapyDetailsModal = ({ therapy, onClose }) => {
  if (!therapy) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div
          className={`sticky top-0 bg-gradient-to-r ${getTherapyColor(
            therapy.type
          )} text-white p-6 rounded-t-3xl shadow-lg z-10`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{getTherapyIcon(therapy.type)}</span>
                <h3 className="text-3xl font-bold">{therapy.type}</h3>
              </div>
              <p className="text-white/90 text-lg">
                Session #{therapy.details.sessionNumber} • {therapy.date}
              </p>
            </div>
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Session Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-gray-600 font-medium">Therapist</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{therapy.details.therapist}</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <p className="text-sm text-gray-600 font-medium">Duration</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{therapy.details.duration}</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-600 font-medium">Start Time</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{therapy.details.startTime}</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-pink-600" />
                <p className="text-sm text-gray-600 font-medium">End Time</p>
              </div>
              <p className="text-sm font-bold text-gray-800">{therapy.details.endTime}</p>
            </motion.div>
          </div>

          {/* Activities */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border-l-4 border-indigo-500">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-indigo-600" />
              Session Activities
            </h4>
            <ul className="space-y-2">
              {therapy.details.activities.map((activity, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 bg-white p-3 rounded-lg"
                >
                  <span className="text-indigo-600 font-bold mt-0.5">
                    {idx + 1}.
                  </span>
                  <span className="text-gray-700">{activity}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Observations */}
          <div className="bg-blue-50 p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">
              Clinical Observations
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {therapy.details.observations}
            </p>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-l-4 border-green-500">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <Award className="w-5 h-5 text-green-600" />
              Session Achievements
            </h4>
            <ul className="space-y-2">
              {therapy.details.achievements.map((a, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 bg-white p-3 rounded-lg"
                >
                  <span className="text-green-600 text-xl">🏆</span>
                  <span className="text-gray-700 font-medium">{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Next Goals */}
          <div className="bg-purple-50 p-5 rounded-xl border-l-4 border-purple-500">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-purple-600" />
              Next Session Goals
            </h4>
            <p className="text-gray-700 font-medium">{therapy.details.nextGoals}</p>
          </div>

          {/* Homework */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              📚 Homework Assignment
            </h4>
            <p className="text-gray-700 font-medium">{therapy.details.homeworkAssigned}</p>
          </div>

          {/* Progress Badge */}
          <div className="flex justify-center pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl shadow-xl"
            >
              Progress: {therapy.progress} 🎉
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TherapyDetailsModal;
