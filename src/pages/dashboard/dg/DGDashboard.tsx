import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import SidebarDg from "./SidebarDg";
import NavbarDg from "./NavbarDg";
import GestionEntrepriseDg from "./GestionEntrepriseDg";
import GestionAgence from "./GestionAgence";
import GestionPersonnelsDg from "./GestionPersonnelsDg";
import RapportDg from "./RapportDg";
import VisualisationDg from "./VisualisationDg";
import ParametreDg from "./ParametreDg";

const DGDashboard: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>("home"); // État pour gérer le contenu actif
  const [entrepriseData, setEntrepriseData] = useState<any>(null); // État pour les données de l'entreprise

  // Récupérer les données de l'entreprise depuis le localStorage
  useEffect(() => {
    const storedEntrepriseData = localStorage.getItem("entrepriseData");
    if (storedEntrepriseData) {
      setEntrepriseData(JSON.parse(storedEntrepriseData));
    }
  }, []);

  // Fonction pour afficher le contenu correspondant
  const renderContent = () => {
    switch (activeContent) {
      case "gestion-entreprise":
        return <GestionEntrepriseDg />;
      case "gestion-agence":
        return <GestionAgence />;
      case "gestion-personnels":
        return <GestionPersonnelsDg />;
      case "rapport":
        return <RapportDg />;
      case "visualisation":
        return <VisualisationDg />;
      case "parametres":
        return <ParametreDg />;
      default:
  const agences = JSON.parse(localStorage.getItem("agencesData") || "[]");
  const personnels = JSON.parse(localStorage.getItem("personnelsData") || "[]");

  // Données pour le graphique
  const pieData = [
    { name: "Agences", value: agences.length, fill: "#3b82f6" },
    { name: "Personnels", value: personnels.length, fill: "#22c55e" },
  ];

  return (
    <div className="space-y-6">

      {/* TITRE */}
      <h1 className="text-4xl font-extrabold text-gray-800">
        Tableau de bord du Directeur Général
      </h1>

      {/* INFOS ENTREPRISE */}
      {entrepriseData && (
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            {entrepriseData.nomEntreprise}
          </h2>
          <p className="text-gray-600"><b>Email :</b> {entrepriseData.emailEntreprise}</p>
          <p className="text-gray-600"><b>Téléphone :</b> {entrepriseData.telephone1Entreprise}</p>
          <p className="text-gray-600"><b>Siège social :</b> {entrepriseData.siegeSocial}</p>
        </div>
      )}

      {/* CARDS : Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Nombre d'agences */}
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Agences</h3>
          <p className="text-4xl font-extrabold mt-3">{agences.length}</p>
        </div>

        {/* Nombre de personnels */}
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Personnels</h3>
          <p className="text-4xl font-extrabold mt-3">{personnels.length}</p>
        </div>

       {/* Nombre total de directeurs */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Directeurs</h3>
          <p className="text-4xl font-extrabold mt-3">
            {personnels.filter((p:any)=>p.roleUtilisateur==="ROLE_DIRECTEUR").length}
          </p>
        </div>

        {/* Nombre total de chauffeurs */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Chauffeurs</h3>
          <p className="text-4xl font-extrabold mt-3">
            {personnels.filter((p:any)=>p.roleUtilisateur==="ROLE_CHAUFFEUR").length}
          </p>
        </div>

         {/* Nombre total de gestionnaires */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Gestionnaires</h3>
          <p className="text-4xl font-extrabold mt-3">
            {personnels.filter((p:any)=>p.roleUtilisateur==="ROLE_GESTIONNAIRE").length}
          </p>
        </div>

         {/* Nombre total de bus */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Bus</h3>
          <p className="text-4xl font-extrabold mt-3">
            68
          </p>
        </div>
      </div>

      {/* GRAPHIQUE : répartition agences/personnels */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Répartition des ressources
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* RAPIDE APERÇU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Dernière agence créée */}
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500">
          <h3 className="text-xl font-bold text-indigo-600">Dernière Agence</h3>
          {agences.length > 0 ? (
            <p className="mt-3 text-gray-700">
              <b>{agences[agences.length - 1].nomAgence}</b> –{" "}
              {agences[agences.length - 1].adresseAgence}
            </p>
          ) : (
            <p className="mt-3 text-gray-500">Aucune agence enregistrée.</p>
          )}
        </div>

        {/* Dernier personnel ajouté */}
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-500">
          <h3 className="text-xl font-bold text-emerald-600">Dernier Personnel</h3>
          {personnels.length > 0 ? (
            <p className="mt-3 text-gray-700">
              <b>{personnels[personnels.length - 1].prenomUtilisateur} {personnels[personnels.length - 1].nomUtilisateur}</b><br />
              Rôle : {personnels[personnels.length - 1].roleUtilisateur}
            </p>
          ) : (
            <p className="mt-3 text-gray-500">Aucun personnel enregistré.</p>
          )}
        </div>
      </div>

      </div>
     );
  } 
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar fixe */}
      <SidebarDg setActiveContent={setActiveContent} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar fixe */}
        <div className="sticky top-0 z-30">
          <NavbarDg />
        </div>

        {/* Contenu dynamique */}
        <main className="p-6 bg-gray-100 flex-1">
          {renderContent()}
        </main>
      </div>
    </div>

  );
};

export default DGDashboard;
