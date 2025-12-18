import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 transition-all shadow-sm"
      />
    </div>
  );
};

export default Input;
