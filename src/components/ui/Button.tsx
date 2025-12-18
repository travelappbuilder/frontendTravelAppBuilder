import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white px-6 py-2 rounded-lg font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
