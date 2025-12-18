import React, { useState } from "react";
import NavbarGn from "./NavbarGn";
import SidebarGn from "./SidebarGn";

import GestionTrajetGn from "./GestionTrajetGn";
import VisualisationGn from "./VisualisationGn";
import ParametreGn from "./ParametreGn";
import RapportGn from "./RapportGn";
import NotificationGn from "./NotificationGn";

const GestionnaireDashboard: React.FC = () => {
  const [activeContent, setActiveContent] = useState("dashboard");

  const renderContent = () => {
    switch (activeContent) {
      case "trajets":
        return <GestionTrajetGn />;

      case "visualisation":
        return <VisualisationGn />;

      case "parametre":
        return <ParametreGn />;

      case "rapport":
        return <RapportGn />;

      case "notifications":
        return <NotificationGn />;

      default:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Tableau de bord Gestionnaire
            </h2>

            <p className="text-gray-600 text-lg">
              Bienvenue 👋  
              Visualisez rapidement les informations clés concernant les agences,
              les trajets, les bus et vos équipes.
            </p>

            {/* Mini statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-5 bg-blue-600 text-white rounded-xl shadow">
                <h3 className="text-lg font-semibold">Trajets actifs</h3>
                <p className="text-4xl font-bold mt-2">15</p>
                <p className="opacity-80 text-sm">En cours aujourd’hui</p>
              </div>

              <div className="p-5 bg-green-600 text-white rounded-xl shadow">
                <h3 className="text-lg font-semibold">Buses disponibles</h3>
                <p className="text-4xl font-bold mt-2">42</p>
                <p className="opacity-80 text-sm">Prêts à l’utilisation</p>
              </div>

              <div className="p-5 bg-orange-500 text-white rounded-xl shadow">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-4xl font-bold mt-2">3</p>
                <p className="opacity-80 text-sm">En attente d’action</p>
              </div>
                               {/* Conseils au Gestionnaire sur son travail */}
                <div className="p-5 bg-white rounded-xl shadow border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Conseil du jour</h3>
                  <p className="text-gray-700">
                    Pour optimiser la gestion des trajets, assurez-vous de vérifier régulièrement les disponibilités des bus et de coordonner avec les chauffeurs pour éviter les retards.
                  </p>
                </div>
                  <div className="p-5 bg-white rounded-xl shadow border-l-4 border-green-600 mt-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Astuce de gestion</h3>
                    <p className="text-gray-700">
                      Utilisez les rapports hebdomadaires pour identifier les tendances de réservation et ajuster les horaires des trajets en conséquence, maximisant ainsi l'efficacité opérationnelle.
                    </p>
                  </div>
                  <div className="p-5 bg-white rounded-xl shadow border-l-4 border-orange-500 mt-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Rappel important</h3>
                    <p className="text-gray-700">
                      N'oubliez pas de consulter les notifications critiques chaque matin pour rester informé des incidents ou des mises à jour importantes concernant les trajets et les bus.
                    </p>
                   </div>                
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <SidebarGn setActiveContent={setActiveContent} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">

        {/* NAVBAR */}
        <div className="sticky top-0 z-30">
          <NavbarGn 
            setActiveContent={setActiveContent} 
          />
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 flex-1">
          {renderContent()}
        </main>

      </div>
    </div>
  );
};

export default GestionnaireDashboard;
