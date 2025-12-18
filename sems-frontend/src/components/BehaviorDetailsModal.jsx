

import React from "react";
import { motion } from "framer-motion";
import { X, AlertCircle, TrendingUp } from "lucide-react";
import MoodBadge from "./MoodBadge";

const BehaviorDetailsModal = ({ log, onClose }) => {
  if (!log) return null;

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
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-3xl flex justify-between items-center shadow-lg">
          <div>
            <h3 className="text-2xl font-bold">Behavior Log Details</h3>
            <p className="text-blue-100 mt-1">{log.date}</p>
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

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Mood & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Mood Status</p>
              <MoodBadge mood={log.mood} />
            </div>

            <div className="bg-purple-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Time</p>
              <p className="text-lg font-bold text-gray-800">
                {log.details.time}
              </p>
            </div>
          </div>

          {/* Activity Info */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Activity Information
            </h4>
            <p><b>Activity:</b> {log.details.activity}</p>
            <p><b>Duration:</b> {log.details.duration}</p>
            <p><b>Teacher:</b> {log.details.teacher}</p>
          </div>

          {/* Observations */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">Observations</h4>
            <p className="leading-relaxed text-gray-700">
              {log.details.observations}
            </p>
          </div>

          {/* Positive Points */}
          {log.details.positivePoints && (
            <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
              <h4 className="font-bold mb-3">Positive Points</h4>
              <ul className="space-y-2">
                {log.details.positivePoints.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-2"
                  >
                    ✓ {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Concerns */}
          {log.details.concernPoints && (
            <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" /> Concerns
              </h4>
              <ul className="space-y-2">
                {log.details.concernPoints.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-2"
                  >
                    • {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="font-bold mb-2">Recommendations</h4>
            <p>{log.details.recommendations}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BehaviorDetailsModal;

