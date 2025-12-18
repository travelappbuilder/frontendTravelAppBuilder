import React, { useState } from "react";
import NavbarCf from "./NavbarCf";
import SidebarCf from "./SidebarCf";
import GestionTrajetCf from "./GestionTrajetCf";
import VisualisationCf from "./VisualisationCf";
import ParametreCf from "./ParametreCf";
import RapportCf from "./RapportCf";

const ChauffeurDashboard: React.FC = () => {
  const [activeContent, setActiveContent] = useState("trajets");

  const renderContent = () => {
    switch (activeContent) {
      case "trajets":
        return <GestionTrajetCf />;
      case "visualisation":
        return <VisualisationCf />;
      case "parametre":
        return <ParametreCf />;
      case "rapport":
        return <RapportCf />;
      default:
         return (
    <div className="space-y-8">

      {/* Titre */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Tableau de Bord Chauffeur</h2>
        <p className="text-gray-600">
          Bienvenue ! Voici un aperçu rapide de vos activités et des conseils importants.
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-5 rounded-xl shadow bg-blue-600 text-white">
          <h3 className="text-lg font-semibold mb-1">Trajets du Jour</h3>
          <p className="text-3xl font-bold">02</p>
          <p className="text-sm opacity-80">Prévus aujourd’hui</p>
        </div>

        <div className="p-5 rounded-xl shadow bg-green-600 text-white">
          <h3 className="text-lg font-semibold mb-1">Taux de Réussite</h3>
          <p className="text-3xl font-bold">96%</p>
          <p className="text-sm opacity-80">Sur vos derniers trajets</p>
        </div>

        <div className="p-5 rounded-xl shadow bg-orange-500 text-white">
          <h3 className="text-lg font-semibold mb-1">Accidents ce Mois</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm opacity-80">Continuez comme ça !</p>
        </div>

      </div>

      {/* Actions rapides */}
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">Actions Rapides</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <button className="p-4 bg-white shadow rounded-lg border hover:bg-blue-50 transition">
            🚍 <span className="font-bold">Voir mes trajets</span>
          </button>

          <button className="p-4 bg-white shadow rounded-lg border hover:bg-green-50 transition">
            👁 <span className="font-bold">Visualiser mes passagers</span>
          </button>

          <button className="p-4 bg-white shadow rounded-lg border hover:bg-yellow-50 transition">
            📊 <span className="font-bold">Consulter mes rapports</span>
          </button>

          <button className="p-4 bg-white shadow rounded-lg border hover:bg-red-50 transition">
            ⚙️ <span className="font-bold">Paramètres</span>
          </button>

        </div>
      </div>

      {/* Conseils importants */}
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">Conseils Importants</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Carte 1 */}
          <div className="p-5 bg-white rounded-xl shadow border-l-4 border-green-600">
            <h4 className="font-bold text-lg mb-2 text-green-700">🚦 Conduite sécurisée</h4>
            <p className="text-gray-700">
              Adoptez une vitesse modérée, évitez les freinages brusques et respectez les distances
              de sécurité. La sécurité du passager est votre première mission.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="p-5 bg-white rounded-xl shadow border-l-4 border-blue-600">
            <h4 className="font-bold text-lg mb-2 text-blue-700">🛠 Entretien du Bus</h4>
            <p className="text-gray-700">
              Vérifiez régulièrement les pneus, niveaux d’huile, phares, freins et essuie-glaces.
              Un bus bien entretenu évite les pannes en route.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="p-5 bg-white rounded-xl shadow border-l-4 border-orange-500">
            <h4 className="font-bold text-lg mb-2 text-orange-600">⏱ Gestion du Temps</h4>
            <p className="text-gray-700">
              Arrivez au point de départ 15 minutes avant l’heure pour rassurer les passagers
              et organiser le chargement.
            </p>
          </div>

          {/* Carte 4 */}
          <div className="p-5 bg-white rounded-xl shadow border-l-4 border-red-600">
            <h4 className="font-bold text-lg mb-2 text-red-600">📱 Communication Smart</h4>
            <p className="text-gray-700">
              Prévenez immédiatement votre entreprise en cas de retard, incident ou problème mécanique
              pour prendre des mesures rapides.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        Prenez soin de vos passagers, et le système prendra soin de vous 🚍💙
      </div>

    </div>
  );
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarCf setActiveContent={setActiveContent} />

     {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar fixe */}
        <div className="sticky top-0 z-30">
          <NavbarCf />
        </div>

        {/* Contenu dynamique */}
        <main className="p-6 bg-gray-100 flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ChauffeurDashboard;
