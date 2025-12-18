import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`card p-6 rounded-lg shadow-md bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
