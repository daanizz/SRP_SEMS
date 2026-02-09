import React from "react";
import { Calendar } from "lucide-react";

const BehaviorFilter = ({
  selectedStudent,
  setSelectedStudent,
  selectedDate,
  setSelectedDate,
  students,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Student
        </label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
  <option key={s._id} value={s.name}>
    {s.name}
  </option>
))}

        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Filter by date
        </label>
        <input
          type="text"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
        />
      </div>

      <div className="flex items-end">
        <button className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
          Apply
        </button>
      </div>
    </div>
  );
};

export default BehaviorFilter;
