import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { addAcademicYear } from "../../api/academicApi";

const AddAcademicYearModal = ({ open, onClose }) => {
  if (!open) return null;

  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!year.trim()) {
      setError("Year is required");
      return;
    }

    try {
      await addAcademicYear({ year });
      alert("Academic Year created successfully!");
      onClose();
      setYear("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add academic year";

      setError(msg);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Add Academic Year</h2>
            <button onClick={onClose}>
              <X className="w-7 h-7" />
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <Input
            label="Academic Year (e.g. 2024-25)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024-25"
          />

          <div className="mt-6">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddAcademicYearModal;
