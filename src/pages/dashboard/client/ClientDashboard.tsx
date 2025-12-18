import React, { useState, useEffect } from "react";
import NavbarCl from "./NavbarCl";
import SidebarCl from "./SidebarCl";

import ReservationCl from "./ReservationCl";
import VisualisationCl from "./VisualisationCl";
import HistoriqueCl from "./HistoriqueCl";
import RapportCl from "./RapportCl";
import ParametreCl from "./ParametreCl";
import PaiementCl from "./PaiementCl";
import TicketCl from "./TicketCl";

/* ────────────────────────────────
   PAGE D’ACCUEIL DU CLIENT
──────────────────────────────── */
interface AccueilProps {
  onNavigate: (section: string) => void;
}

const AccueilCl: React.FC<AccueilProps> = ({ onNavigate }) => {
  const userData = JSON.parse(localStorage.getItem("clientData") || "{}");

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">

      {/* FILIGRANE */}
      {userData.nom && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <svg width="600" height="620">
            <defs>
              <path id="curve" d="M 50 400 A 250 250 0 0 1 450 400" />
            </defs>
            <text
              fill="rgba(207, 226, 202, 0.2)"
              fontSize="65"
              fontWeight="bold"
              textAnchor="middle"
            >
              <textPath href="#curve" startOffset="50%">
                {userData.nom}
              </textPath>
            </text>
          </svg>
        </div>
      )}

      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          Tableau de bord - Espace Client
        </h1>

        <p className="text-gray-700 text-lg">
          Bienvenue dans votre espace de réservation.  
          Vous pouvez rechercher des trajets, réserver, payer, télécharger vos tickets,
          et consulter l’historique de vos voyages.
        </p>

        {/* Cartes actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

          <div
            onClick={() => onNavigate("visualisation")}
            className="p-4 bg-blue-100 rounded shadow cursor-pointer hover:bg-blue-200 transition"
          >
            <p className="font-semibold text-blue-800">Voir ma position</p>
            <p className="text-sm text-gray-700 mt-1">
              Visualisez votre position actuelle sur la carte en temps réel.
            </p>
          </div>

          <div
            onClick={() => onNavigate("reservation")}
            className="p-4 bg-green-100 rounded shadow cursor-pointer hover:bg-green-200 transition"
          >
            <p className="font-semibold text-green-800">Liste des réservations possibles</p>
            <p className="text-sm text-gray-700 mt-1">
              Accédez à vos réservations et tickets.
            </p>
          </div>

          <div
            onClick={() => onNavigate("historique")}
            className="p-4 bg-yellow-100 rounded shadow cursor-pointer hover:bg-yellow-200 transition"
          >
            <p className="font-semibold text-yellow-800">Historique</p>
            <p className="text-sm text-gray-700 mt-1">
              Consultez vos trajets déjà effectués.
            </p>
          </div>
          <div className="p-4 bg-pink-100 rounded shadow hover:bg-pink-200 transition">
            <p className="font-semibold text-pink-700">Promotions & Offres</p>
            <p className="text-sm text-gray-700 mt-1">
              Profitez de nos offres spéciales et réductions sur vos trajets.
            </p>
            <button className="mt-2 px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600">
              Voir promos
            </button>
          </div>

          <div className="p-4 bg-purple-100 rounded shadow hover:bg-purple-200 transition">
            <p className="font-semibold text-purple-700">Support & Assistance</p>
            <p className="text-sm text-gray-700 mt-1">
              Besoin d'aide pour vos réservations ou paiements ? Nous sommes là pour vous.
            </p>
            <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">
              Contacter support
            </button>
          </div>

          <div className="p-4 bg-orange-100 rounded shadow hover:bg-orange-200 transition">
            <p className="font-semibold text-orange-700">Contactez TAB</p>
            <p className="text-sm text-gray-700 mt-1">
              Notre équipe Travel App Builder (TAB) est à votre écoute pour toute suggestion.
            </p>
            <button className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">
              Nous contacter
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────
   DASHBOARD PRINCIPAL CLIENT
──────────────────────────────── */
const ClientDashboardCl: React.FC = () => {
  const [activeContent, setActiveContent] = useState("home");

  // 🔥 Synchronisation avec localStorage après réservation
  useEffect(() => {
    const syncActive = () => {
      const section = localStorage.getItem("activeSection");
      if (section) {
        setActiveContent(section);
        localStorage.removeItem("activeSection");
      }
    };

    window.addEventListener("storage", syncActive);
    return () => window.removeEventListener("storage", syncActive);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeContent]);

  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return <AccueilCl onNavigate={setActiveContent} />;

      case "reservation":
        return <ReservationCl setActiveContain={setActiveContent} />;

      case "visualisation":
        return <VisualisationCl />;

      case "historique":
        return <HistoriqueCl />;

      case "rapport":
        return <RapportCl />;

      case "parametres":
        return <ParametreCl />;

      case "paiement":
        return <PaiementCl setActiveContent={setActiveContent} />;

      case "tickets":
        return <TicketCl />;

      default:
        return <AccueilCl onNavigate={setActiveContent} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* SIDEBAR FIXE */}
      <div className="w-64 fixed left-0 top-0 h-full bg-white shadow z-40">
        <SidebarCl setActiveContent={setActiveContent} />
      </div>

      {/* SECTION PRINCIPALE */}
      <div className="flex-1 ml-64 flex flex-col h-full">

        {/* NAVBAR FIXE */}
        <div className="sticky top-0 z-30 bg-white shadow">
          <NavbarCl />
        </div>

        {/* ZONE SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 mt-5">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardCl;
