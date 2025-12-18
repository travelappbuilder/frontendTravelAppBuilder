import React, { useState, useEffect } from "react";
import BusCard from "./BusCard";
import type { Bus } from "./BusCard";

interface Trajet {
  idTrajet: number;
  idEntreprise?: number | string;
  idAgence?: number | string;
  villeDepart: string;
  villeArrivee: string;
  dateDepart: string;
  heureDepart: string;
  prix: number;
  bus: Bus;
  chauffeurs: string[];
  distanceKm: number;
  statut: "activé" | "désactivé";
}

interface Props {
  setActiveContain: (value: string) => void;
}

const ReservationCl: React.FC<Props> = ({ setActiveContain }) => {
  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [selectedTrajet, setSelectedTrajet] = useState<Trajet | null>(null);

  // Champs de recherche
  const [searchEntreprise, setSearchEntreprise] = useState("");
  const [searchLieu, setSearchLieu] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const storedTrajets = localStorage.getItem("trajetsData");
    if (storedTrajets) {
      setTrajets(JSON.parse(storedTrajets));
    }
  }, []);

  // 🔥 Nouvelle version : navigation interne vers PaiementCl
  const handleReserver = (trajet: Trajet) => {
    localStorage.setItem("trajetSelectionne", JSON.stringify(trajet));

    localStorage.setItem("activeSection", "paiement");
    window.dispatchEvent(new Event("storage"));

  };

  const filteredTrajets = trajets.filter((t) => {
    return (
      (searchEntreprise === "" ||
        (t.idEntreprise + "").toLowerCase().includes(searchEntreprise.toLowerCase())) &&
      (searchLieu === "" ||
        t.villeDepart.toLowerCase().includes(searchLieu.toLowerCase()) ||
        t.villeArrivee.toLowerCase().includes(searchLieu.toLowerCase())) &&
      (searchDate === "" || t.dateDepart === searchDate)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Trajets disponibles
      </h2>

      {/* 🔍 Barre de recherche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par entreprise..."
          value={searchEntreprise}
          onChange={(e) => setSearchEntreprise(e.target.value)}
          className="border rounded p-2"
        />

        <input
          type="text"
          placeholder="Rechercher par ville..."
          value={searchLieu}
          onChange={(e) => setSearchLieu(e.target.value)}
          className="border rounded p-2"
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {filteredTrajets.length === 0 && (
        <p className="text-gray-700">Aucun trajet trouvé.</p>
      )}

      {/* Liste des trajets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrajets.map((trajet) => (
          <div
            key={trajet.idTrajet}
            className="border rounded-lg p-4 shadow bg-white cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedTrajet(trajet)}
          >
            <h1 className="text-xl text-green-700 font-bold">
              {trajet.idEntreprise} [{trajet.idAgence}]
            </h1>

            <h3 className="text-lg font-semibold mt-1">
              {trajet.villeDepart} ➜ {trajet.villeArrivee}
            </h3>

            <p className="text-yellow-700 font-bold">
              Départ: {trajet.dateDepart}
            </p>

            <p className="text-gray-900 font-bold text-lg mt-1">
              Prix : {trajet.prix} FCFA
            </p>
            {/* Bouton pour détails */}
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTrajet(trajet);
              }}
            >
              Voir les détails
            </button>
          </div>
        ))}
      </div>

      {/* Popup des détails du trajet */}
      {selectedTrajet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Détails du trajet
            </h2>

            <p className="text-lg font-semibold">
              Entreprise : {selectedTrajet.idEntreprise}
            </p>

            <p className="text-lg">Agence : {selectedTrajet.idAgence}</p>

            <p className="mt-2 text-gray-700">
              {selectedTrajet.villeDepart} ➜ {selectedTrajet.villeArrivee}
            </p>

            <p className="text-yellow-700 font-bold">
              Départ : {selectedTrajet.dateDepart} à {selectedTrajet.heureDepart}
            </p>

            <p className="text-gray-900 font-bold">
              Prix : {selectedTrajet.prix} FCFA
            </p>

            <div className="mt-4">
              <BusCard bus={selectedTrajet.bus} />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedTrajet(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Fermer
              </button>

              {/* 👉 Ici la redirection interne */}
              <button
                onClick={() => handleReserver(selectedTrajet)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Réserver ce trajet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCl;
