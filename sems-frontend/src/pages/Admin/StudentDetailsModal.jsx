import React, { useEffect, useState } from "react";
import { getStudentDetails } from "../../api/studentApi";

const StudentDetailsModal = ({ studentId, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getStudentDetails(studentId).then((res) => {
      setData(res.data);
    });
  }, [studentId]);

  if (!data) return null;

  const { student, evaluations, therapies } = data;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-4/5 max-h-[90vh] overflow-y-auto rounded-xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* STUDENT INFO */}
        <div className="mb-6">
          <p><b>Category:</b> {student.categoryId?.name}</p>
          <p><b>Class:</b> {student.classId?.name}</p>
          <p><b>Academic Year:</b> {student.academicYearId?.year}</p>
        </div>

        {/* EVALUATIONS */}
        <h3 className="text-xl font-semibold mb-2">Evaluations</h3>
        {evaluations.length === 0 ? (
          <p className="text-gray-500">No evaluations found</p>
        ) : (
          <table className="w-full mb-6 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Subject</th>
                <th className="p-2">Score</th>
                <th className="p-2">Remarks</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map(ev => (
                <tr key={ev._id} className="border-t">
                  <td className="p-2">{ev.subjectId?.name}</td>
                  <td className="p-2">{ev.score}</td>
                  <td className="p-2">{ev.remarks || "-"}</td>
                  <td className="p-2">
                    {new Date(ev.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* THERAPY */}
        <h3 className="text-xl font-semibold mb-2">Therapy Reports</h3>
        {therapies.length === 0 ? (
          <p className="text-gray-500">No therapy records</p>
        ) : (
          <div className="space-y-3">
            {therapies.map(t => (
              <div key={t._id} className="border rounded-lg p-3">
                <p><b>Type:</b> {t.therapyType}</p>
                <p><b>Progress:</b> {t.progress}</p>
                <p className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDetailsModal;
