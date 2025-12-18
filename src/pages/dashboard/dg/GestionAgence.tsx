import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const GestionAgence: React.FC = () => {
  const [agences, setAgences] = useState<any[]>([]);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [popup, setPopup] = useState<{ type: "edit" | "delete"; index: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ---- ENTREPRISE ----
    const storedEntrepriseData = localStorage.getItem("entrepriseData");
    if (storedEntrepriseData) {
      setEntrepriseData(JSON.parse(storedEntrepriseData));
    }

    // ---- AGENCES ----
    const storedAgencesData = localStorage.getItem("agencesData");

    if (storedAgencesData) {
      try {
        const parsed = JSON.parse(storedAgencesData);

        // Force le parsing en tableau même si une seule agence
        if (Array.isArray(parsed)) {
          setAgences(parsed);
        } else {
          setAgences([parsed]);
        }
      } catch (e) {
        console.error("Erreur parsing agencesData :", e);
        setAgences([]); // Valeur sûre
      }
    }
  }, []);

  const handleEdit = (index: number) => setPopup({ type: "edit", index });
  const handleDelete = (index: number) => setPopup({ type: "delete", index });

  const confirmDelete = () => {
    if (popup && popup.type === "delete") {
      const newAgences = [...agences];
      newAgences.splice(popup.index, 1);

      setAgences(newAgences);
      localStorage.setItem("agencesData", JSON.stringify(newAgences));
      setPopup(null);
    }
  };

  const cancelPopup = () => setPopup(null);

  const colors = ["#E0F7FA", "#F1F8E9", "#FFF3E0", "#FCE4EC"];

  return (
    <div className="relative p-6">
      {/* Filigrane */}
      {entrepriseData && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <svg width="600" height="620">
            <defs>
              <path id="curve" d="M 50 400 A 250 250 0 0 1 450 400" />
            </defs>
            <text fill="rgba(207, 226, 202, 0.3)" fontSize="65" fontWeight="bold" textAnchor="middle">
              <textPath href="#curve" startOffset="50%">
                {entrepriseData.nomEntreprise}
              </textPath>
            </text>
          </svg>
        </div>
      )}

      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion des Agences</h1>
          <button
            onClick={() => navigate("/create-agence")}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Nouvelle Agence
          </button>
        </div>

        {agences.length === 0 ? (
          <p className="text-gray-600">Aucune agence enregistrée. Cliquez sur "Nouvelle Agence" pour en créer une.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {agences.map((agence, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition flex flex-col md:flex-row gap-6"
              >
                {/* Logo */}
                <img
                  src={agence.logoAgence || "/path/to/default-logo.png"}
                  alt="Logo Agence"
                  className="w-32 h-32 object-cover rounded-full"
                />

                {/* Informations principales */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{agence.nomAgence}</h2>
                    <p className="text-lg text-gray-700 mb-1">{agence.adresseAgence}</p>
                    <p className="text-lg text-gray-700 mb-1"><strong>Email:</strong> {agence.emailAgence}</p>
                    <p className="text-lg text-gray-700 mb-1"><strong>Téléphone:</strong> {agence.telephoneAgence}</p>
                    <p className="text-lg text-gray-700 mb-1"><strong>Heure de réunion:</strong> {agence.heureDepartStandard}</p>
                    <p className="text-lg text-gray-700 mb-1"><strong>Politique tarifs:</strong> {agence.politiqueTarifs}</p>
                    <p className="text-lg text-gray-700 mb-1"><strong>Politique annulation:</strong> {agence.politiqueAnnulation}</p>
                  </div>

                  {/* Infos DG supplémentaires */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors[index % colors.length] }}>
                      <strong>Nombre de Gestionnaires:</strong><br /> {agence.nombreGestionnaires || 7}
                    </div>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors[(index + 1) % colors.length] }}>
                      <strong>Nombre de Chauffeurs:</strong><br /> {agence.nombreChauffeurs || 10}
                    </div>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors[(index + 2) % colors.length] }}>
                      <strong>Directeur d'agence:</strong><br /> {agence.directeurAgence || "N/A"}
                    </div>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors[(index + 3) % colors.length] }}>
                      <strong>Revenu Mensuel:</strong><br /> {agence.revenuMensuel || "9 976 000"} {agence.deviseEntreprise || "XAF"}
                    </div>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors[index % colors.length] }}>
                      <strong>Revenu Annuel:</strong><br /> {agence.revenuAnnuel || "100 976 000"} {agence.deviseEntreprise || "XAF"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between items-end gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    <FaEdit /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    <FaTrash /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup modale */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {popup.type === "edit" && (
              <>
                <h2 className="text-xl font-bold mb-4">Modifier l'agence</h2>
                <p>Vous allez modifier l'agence: <strong>{agences[popup.index].nomAgence}</strong></p>
                <div className="mt-6 flex justify-end gap-4">
                  <button onClick={cancelPopup} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Annuler</button>
                  <button
                    onClick={() => {
                      navigate(`/edit-agence/${popup.index}`);
                      setPopup(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white"
                  >
                    Modifier
                  </button>
                </div>
              </>
            )}

            {popup.type === "delete" && (
              <>
                <h2 className="text-xl font-bold mb-4">Supprimer l'agence</h2>
                <p>Voulez-vous vraiment supprimer l'agence: <strong>{agences[popup.index].nomAgence}</strong> ?</p>
                <div className="mt-6 flex justify-end gap-4">
                  <button onClick={cancelPopup} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Annuler</button>
                  <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">Supprimer</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionAgence;
