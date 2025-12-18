import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { addClass } from "../../api/classApi";

const AddClassModal = ({ open, onClose }) => {
  if (!open) return null;

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    teacherId: "",
    academicYearId: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!form.name || !form.categoryId || !form.teacherId || !form.academicYearId) {
      setErrorMsg("All fields are required");
      return;
    }

    try {
      await addClass(form);
      alert("Class added successfully!");
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to add class";
      setErrorMsg(msg);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Add Class</h2>
            <button onClick={onClose}>
              <X className="w-7 h-7" />
            </button>
          </div>

          {errorMsg && (
            <p className="text-red-500 font-semibold mb-4">{errorMsg}</p>
          )}

          {/* Form */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Class Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Category ID"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
            />

            <Input
              label="Teacher ID"
              name="teacherId"
              value={form.teacherId}
              onChange={handleChange}
            />

            <Input
              label="Academic Year ID"
              name="academicYearId"
              value={form.academicYearId}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleSubmit}>Create Class</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddClassModal;
