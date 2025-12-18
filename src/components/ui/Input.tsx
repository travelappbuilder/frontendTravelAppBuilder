import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input {...props} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)] bg-white text-[var(--color-text)]" />
    </div>
  );
};

export default Input;
