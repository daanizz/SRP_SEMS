import React from "react";

const TherapyFilter = ({
  selectedStudent,
  setSelectedStudent,
  selectedDate,
  setSelectedDate,
  students,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Student */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Student
        </label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full px-4 py-3 border-2 rounded-xl"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Filter by date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-3 border-2 rounded-xl"
        />
      </div>

      <div className="flex items-end">
        <button className="w-full px-8 py-3 bg-blue-600 text-white rounded-xl">
          Apply
        </button>
      </div>
    </div>
  );
};

export default TherapyFilter;
