import React from "react";
import { motion } from "framer-motion";
import MoodBadge from "../../components/MoodBadge";

const BehaviorTable = ({ data, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left font-bold">Date</th>
            <th className="px-6 py-4 text-left font-bold">Mood</th>
            <th className="px-6 py-4 text-left font-bold">Notes</th>
            <th className="px-6 py-4 text-left font-bold">Incidents</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((log, index) => (
            <motion.tr
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="border-b hover:bg-blue-50/50"
            >
              <td className="px-6 py-4">{log.date}</td>
              <td className="px-6 py-4">
                <MoodBadge mood={log.mood} />
              </td>
              <td className="px-6 py-4">{log.notes}</td>
              <td className="px-6 py-4 font-bold">
                {log.incidents > 0 ? (
                  <span className="text-red-600">{log.incidents}</span>
                ) : (
                  <span className="text-green-600">{log.incidents}</span>
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onView(log)}
                  className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-blue-600 hover:text-white"
                >
                  View
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default BehaviorTable;
