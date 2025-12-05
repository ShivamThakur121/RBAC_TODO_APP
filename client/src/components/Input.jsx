import React from "react";
const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
      {...props}
    />
  </div>
);

export default Input;
