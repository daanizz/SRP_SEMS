
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

import { addStudent } from "../../api/studentApi";
import { getCategories } from "../../api/categoryApi";
import { getAcademicYears } from "../../api/academicApi";
import { getAllClasses } from "../../api/classApi";

const AddStudentModal = ({ open, onClose }) => {
  if (!open) return null;

  const [form, setForm] = useState({
    name: "",
    dob: "",
    categoryId: "",
    academicYearId: "",
    classId: "",
    behaviour: "",
    hobby: "",
    healthIssues: "",
    emergencyContact: "",
    consultantDr: "",
    drNumber: "",
  });

  const [categories, setCategories] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Load dropdown data
  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
    getAcademicYears().then(res => setAcademicYears(res.data.years));
    getAllClasses().then(res => setClasses(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setErrorMsg("");

    if (
      !form.name ||
      !form.categoryId ||
      !form.academicYearId ||
      !form.classId
    ) {
      setErrorMsg("Name, Category, Academic Year and Class are required");
      return;
    }

    if (!/^\d{10}$/.test(form.emergencyContact)) {
      setErrorMsg("Emergency Contact must be exactly 10 digits");
      return;
    }

    if (form.drNumber && !/^\d{10}$/.test(form.drNumber)) {
      setErrorMsg("Doctor Number must be exactly 10 digits");
      return;
    }

    const payload = {
      ...form,
      dob: form.dob ? new Date(form.dob).toISOString() : null,
    };

    try {
      await addStudent(payload);
      alert("Student added successfully!");
      onClose();
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Failed to add student"
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-auto"
        >
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h2 className="text-3xl font-bold">Add Student</h2>
            <button onClick={onClose}>
              <X className="w-7 h-7" />
            </button>
          </div>

          {errorMsg && (
            <p className="text-red-500 font-semibold mb-4">{errorMsg}</p>
          )}

          <div className="grid grid-cols-2 gap-4">

            <Input label="Name" name="name" onChange={handleChange} />

            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              onChange={handleChange}
            />

            {/* Category */}
            <div>
              <label className="font-semibold">Category</label>
              <select
                name="categoryId"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label className="font-semibold">Academic Year</label>
              <select
                name="academicYearId"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Select Academic Year</option>
                {academicYears.map(y => (
                  <option key={y._id} value={y._id}>{y.year}</option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="font-semibold">Class</label>
              <select
                name="classId"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls._id} value={cls._id}>{cls.name}</option>
                ))}
              </select>
            </div>

            <Input label="Behaviour" name="behaviour" onChange={handleChange} />
            <Input label="Hobby" name="hobby" onChange={handleChange} />
            <Input label="Health Issues" name="healthIssues" onChange={handleChange} />
            <Input label="Emergency Contact" name="emergencyContact" onChange={handleChange} />
            <Input label="Consultant Doctor" name="consultantDr" onChange={handleChange} />
            <Input label="Doctor Number" name="drNumber" onChange={handleChange} />
          </div>

          <div className="mt-6">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddStudentModal;
