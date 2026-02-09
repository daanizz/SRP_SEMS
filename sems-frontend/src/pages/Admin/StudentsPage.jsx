import React, { useEffect, useState } from "react";
import { getStudents } from "../../api/studentApi";
import API from "../../api/authApi";
import StudentDetailsModal from "./StudentDetailsModal";
import Sidebar from "../../components/Sidebar";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await getStudents({
      name: search || undefined,
      categoryId: category || undefined,
    });
    setStudents(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/api/admin/getCategories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [search, category]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeNav="Students" />

      {/* Page Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Students</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Academic Year</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.categoryId?.name}</td>
                  <td className="p-3">{s.classId?.name}</td>
                  <td className="p-3">{s.academicYearId?.year}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedStudent(s._id)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedStudent && (
          <StudentDetailsModal
            studentId={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
