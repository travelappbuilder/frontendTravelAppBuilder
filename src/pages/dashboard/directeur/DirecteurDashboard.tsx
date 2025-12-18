import React, { useState, useEffect } from "react";
import NavbarDa from "./NavbarDa";
import SidebarDa from "./SidebarDa";

import GestionGestionnairesDa from "./GestionGestionnairesDa";
import GestionChauffeursDa from "./GestionChauffeursDa";
import GestionTrajetActivationDa from "./GestionTrajetActivationDa";
import GestionBusDa from "./GestionBusDa";
import VisualisationDa from "./VisualisationDa";
import RapportDa from "./RapportDa";
import ParametreDa from "./ParametreDa";

import { PieChart, Pie, Cell } from "recharts";

const DirecteurDashboard: React.FC = () => {
  const [activeContent, setActiveContent] = useState("home");

  const [agencesData, setAgencesData] = useState<any>(null);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    localStorage.setItem("agencesData", JSON.stringify({
  nomAgence: "Agence Bonabéri",
  adresseAgence: "Bonabéri, Rond point",
  telephoneAgence: "+237670112233",
  emailAgence: "bonaberi@agence.com",
  politiqueTarifs: "Tarifs fixes",
  politiqueAnnulation: "Non remboursable",
  villeAgence: "Douala"
}))


    const storedEntreprise = localStorage.getItem("entrepriseData");
    const storedAgence = localStorage.getItem("agencesData");

    if (storedEntreprise) setEntrepriseData(JSON.parse(storedEntreprise));
    if (storedAgence) setAgencesData(JSON.parse(storedAgence));
  }, [activeContent]);

  // Statistiques affichées dans la page d’accueil
  const stats = [
    { label: "Gestionnaires", value: agencesData?.gestionnaires || 3, color: "#2563eb" },
    { label: "Chauffeurs", value: agencesData?.chauffeurs || 7, color: "#16a34a" },
    { label: "Bus", value: agencesData?.bus || 5, color: "#ca8a04" },
    { label: "Trajets validés", value: agencesData?.trajets || 12, color: "#dc2626" },
  ];

 
  // ---------- PAGE D’ACCUEIL (TABLEAU DE BORD) ----------
  const AccueilContent = () => (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">

      {/* Filigrane */}
      {entrepriseData && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <svg width="600" height="620">
            <defs>
              <path id="curve" d="M 50 400 A 250 250 0 0 1 450 400" />
            </defs>
            <text
              fill="rgba(207, 226, 202, 0.3)"
              fontSize="65"
              fontWeight="bold"
              textAnchor="middle"
            >
              <textPath href="#curve" startOffset="50%">
                {entrepriseData.nomEntreprise}
              </textPath>
            </text>
          </svg>
        </div>
      )}

      <div className="relative">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          Tableau de bord - Directeur d'Agence
        </h1>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 bg-gray-100 rounded shadow"
            >
              <p className="text-gray-700 font-semibold">{s.label}</p>
              <p className="text-3xl font-bold" style={{ color: s.color }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Graphique */}
        <div className="mt-10 flex justify-center">
          <PieChart width={350} height={350}>
            <Pie
              data={stats}
              dataKey="value"
              nameKey="label"
              outerRadius={120}
              label
            >
              {stats.map((s, index) => (
                <Cell key={index} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

         <div>
            {/* ——————————— CARTE D’INFORMATION DE L’AGENCE ——————————— */}
        {agencesData && (
          <div className="mt-12 p-6 bg-gray-50 border rounded-lg shadow-md">

            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Informations de l'agence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Nom de l'agence : </span>
                  {agencesData.nomAgence}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Adresse : </span>
                  {agencesData.adresseAgence}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Téléphone : </span>
                  {agencesData.telephoneAgence}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Email : </span>
                  {agencesData.emailAgence}
                </p>
              </div>

              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Politique tarifs : </span>
                  {agencesData?.politiqueTarifs}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Politique annulation : </span>
                  {agencesData?.politiqueAnnulation}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Ville : </span>
                  {agencesData.villeAgence}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Entreprise : </span>
                  {entrepriseData?.nomEntreprise}
                </p>
              </div>
            </div>

            {/* bouton modifier agence */}
            <div className="mt-6">
              <button
                onClick={() => 
                  alert("Voulez vous modifiernl'agence ?")
                }
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded shadow"
              >
                Modifier les informations de l'agence
              </button>
            </div>

          </div>
        )}
       </div>
      </div>
    </div>
  );

  // ---------- ROUTAGE INTERNE ----------
  const renderContent = () => {
    switch (activeContent) {
      case "home": return <AccueilContent />;
      case "gestion-gestionnaires": return <GestionGestionnairesDa />;
      case "gestion-chauffeurs": return <GestionChauffeursDa />;
      case "gestion-trajets": return <GestionTrajetActivationDa />;
      case "gestion-bus": return <GestionBusDa />;
      case "visualisation": return <VisualisationDa />;
      case "rapport": return <RapportDa />;
      case "parametres": return <ParametreDa />;
      default: return <AccueilContent />;
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarDa setActiveContent={setActiveContent} />

     {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar fixe */}
        <div className="sticky top-0 z-30">
          <NavbarDa />
        </div>

        {/* Contenu dynamique */}
        <main className="p-6 bg-gray-100 flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DirecteurDashboard;
