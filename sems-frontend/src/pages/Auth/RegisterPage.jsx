import React, { useState } from "react";
import { registerUser } from "../../api/authApi";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      const { data } = await registerUser(form);
      setMessage(data.message);

      alert("Teacher registered Successfully!");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6"
>
          Register Teacher
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />

        <Input label="Email" name="email" value={form.email} onChange={handleChange} />

        <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600"
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            
          </select>
        </div>

        <Button onClick={handleRegister}>Register</Button>

        
      </motion.div>
    </div>
  );
};

export default RegisterPage;
