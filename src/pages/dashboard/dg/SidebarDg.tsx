import React from "react";
import { FaHome, FaBuilding, FaUsers, FaChartBar, FaEye, FaCog } from "react-icons/fa";

interface SidebarDgProps {
  setActiveContent: (content: string) => void; // Fonction pour mettre à jour le contenu actif
}

const SidebarDg: React.FC<SidebarDgProps> = ({ setActiveContent }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <button
          onClick={() => setActiveContent("home")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaHome />
          <span>Accueil</span>
        </button>
        <button
          onClick={() => setActiveContent("gestion-entreprise")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaBuilding />
          <span>Gestion Entreprise</span>
        </button>
        <button
          onClick={() => setActiveContent("gestion-agence")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaBuilding />
          <span>Gestion Agence</span>
        </button>
        <button
          onClick={() => setActiveContent("gestion-personnels")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaUsers />
          <span>Gestion des Personnels</span>
        </button>
        <button
          onClick={() => setActiveContent("rapport")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaChartBar />
          <span>Rapport</span>
        </button>
        <button
          onClick={() => setActiveContent("visualisation")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaEye />
          <span>Visualisation</span>
        </button>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => setActiveContent("parametres")}
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded w-full text-left"
        >
          <FaCog />
          <span>Paramètres</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDg;
