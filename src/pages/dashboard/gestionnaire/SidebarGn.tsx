import React, { useState } from "react";
import { FaCog, FaHome, FaRoute, FaChartBar, FaEye } from "react-icons/fa";

interface Props {
  setActiveContent: (value: string) => void;
}

const SidebarGn: React.FC<Props> = ({ setActiveContent }) => {
  const [isOpen, setIsOpen] = useState(false);

 const menuItems = [
  { id: "dashboard", label: "Tableau de bord", icon: <FaHome /> },
  { id: "trajets", label: "Mes trajets", icon: <FaRoute /> },
  { id: "visualisation", label: "Visualisation en direct", icon: <FaEye /> },
  { id: "rapport", label: "Rapports & Statistiques", icon: <FaChartBar /> },
];
  return (
    <>
      {/* Hamburger - Mobile */}
      <div className="md:hidden flex justify-between items-center bg-blue-900 text-white p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white p-5 space-y-3 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        {/* Titre */}
        <div className="p-6 text-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu Gestionnaire</h2>
        </div>

        {/* Menu principal */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveContent(item.id);
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700 w-full text-left"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Paramètres */}
        <div className="p-4 border-t border-gray-700 mt-4">
          <button
            onClick={() => {
              setActiveContent("parametre");
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
          >
            <FaCog />
            <span>Paramètres</span>
          </button>
        </div>
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarGn;
