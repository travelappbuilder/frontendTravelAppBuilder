// src/components/ui/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="
          h-5 
          w-5 
          animate-spin 
          rounded-full 
          border-2 
          border-white 
          border-t-transparent
        "
      ></div>
    </div>
  );
};

export default Loader;
