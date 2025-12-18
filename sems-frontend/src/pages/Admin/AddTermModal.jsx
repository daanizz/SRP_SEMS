import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { addTerm } from "../../api/termApi";

const AddTermModal = ({ open, onClose }) => {
  if (!open) return null;

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    schemaId: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");

    if (!form.startDate || !form.endDate || !form.schemaId) {
      setError("All fields are required");
      return;
    }

    try {
      await addTerm({
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      });

      alert("Term added successfully");
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add term"
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <motion.div className="bg-white p-8 rounded-2xl w-full max-w-md">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Add Term</h2>
            <button onClick={onClose}><X /></button>
          </div>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <Input label="Start Date" type="date" name="startDate" onChange={handleChange} />
          <Input label="End Date" type="date" name="endDate" onChange={handleChange} />
          <Input label="Academic Schema ID" name="schemaId" onChange={handleChange} />

          <Button onClick={handleSubmit}>Create Term</Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddTermModal;
