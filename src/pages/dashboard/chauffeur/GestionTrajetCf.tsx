import React, { useState, useEffect } from "react";


const GestionTrajetCf: React.FC = () => {
  const [trajets, setTrajets] = useState<any[]>([]);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [selectedTrajet, setSelectedTrajet] = useState<any>(null);

  // --- Chargement initial ---
  useEffect(() => {
    const storedEntreprise = localStorage.getItem("entrepriseData");
    if (storedEntreprise) {
      setEntrepriseData(JSON.parse(storedEntreprise));
    }
    const saved = JSON.parse(localStorage.getItem("trajetsCf") || "[]");

    if (saved.length === 0) {
      // ➤ 2 TRAJETS SIMULÉS
      const exemples = [
        {
          idTrajet: 1001,
          depart: "Douala",
          arrivee: "Yaoundé",
          date: "2025-01-15",
          heure: "08:00",
          bus: { nom: "Coaster 80 places" },
          passagers: [
            { nom: "Paul M.", telephone: "670000111" },
            { nom: "Sandrine K.", telephone: "699000222" },
            { nom: "Jean Pierre", telephone: "680223344" },
            { nom: "Annie T.", telephone: "655778899" },
            { nom: "Luc M.", telephone: "699887766" },
            { nom: "Marie L.", telephone: "677554433" },
            { nom: "Paul N.", telephone: "699112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre Modo", telephone: "688823344" },
            { nom: "Annie Theresa.", telephone: "655778822" },
            { nom: "Luc Michael.", telephone: "699987766" },
            { nom: "Marie Goro L.", telephone: "677554403" },
            { nom: "Paul Alain N.", telephone: "694112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre", telephone: "680223344" },
            { nom: "Annie T.", telephone: "655778899" },
            { nom: "Luc M.", telephone: "699887766" },
            { nom: "Marie L.", telephone: "677554433" },
            { nom: "Paul N.", telephone: "699112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre Modo", telephone: "688823344" },
            { nom: "Annie Theresa.", telephone: "655778822" },
            { nom: "Luc Michael.", telephone: "699987766" },
            { nom: "Marie Goro L.", telephone: "677554403" },
            { nom: "Paul Alain N.", telephone: "694112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre", telephone: "680223344" },
            { nom: "Annie T.", telephone: "655778899" },
            { nom: "Luc M.", telephone: "699887766" },
            { nom: "Marie L.", telephone: "677554433" },
            { nom: "Paul N.", telephone: "699112233" },
            { nom: "Sophie D.", telephone: "688445566" }        
          ],
          statut: "en attente"
        },
        {
          idTrajet: 1002,
          depart: "Bafoussam",
          arrivee: "Bamenda",
          date: "2025-01-15",
          heure: "13:30",
          bus: { nom: "Toyota Hiace 80 places" },
          passagers: [
            { nom: "Jean Pierre", telephone: "680223344" },
            { nom: "Annie T.", telephone: "655778899" },
            { nom: "Luc M.", telephone: "699887766" },
            { nom: "Marie L.", telephone: "677554433" },
            { nom: "Paul N.", telephone: "699112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre Modo", telephone: "688823344" },
            { nom: "Annie Theresa.", telephone: "655778822" },
            { nom: "Luc Michael.", telephone: "699987766" },
            { nom: "Marie Goro L.", telephone: "677554403" },
            { nom: "Paul Alain N.", telephone: "694112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre", telephone: "680223344" },
            { nom: "Annie T.", telephone: "655778899" },
            { nom: "Luc M.", telephone: "699887766" },
            { nom: "Marie L.", telephone: "677554433" },
            { nom: "Paul N.", telephone: "699112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre Modo", telephone: "688823344" },
            { nom: "Annie Theresa.", telephone: "655778822" },
            { nom: "Luc Michael.", telephone: "699987766" },
            { nom: "Marie Goro L.", telephone: "677554403" },
            { nom: "Paul Alain N.", telephone: "694112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" },
            { nom: "Nina F.", telephone: "699334455" },
            { nom: "Olivier G.", telephone: "688223311" },
            { nom: "Isabelle H.", telephone: "677665544" },
            { nom: "Jean Pierre", telephone: "680223344" },
            { nom: "Annie T.", telephone: "655778899" },
            { nom: "Luc M.", telephone: "699887766" },
            { nom: "Marie L.", telephone: "677554433" },
            { nom: "Paul N.", telephone: "699112233" },
            { nom: "Sophie D.", telephone: "688445566" },
            { nom: "Marc V.", telephone: "677889900" }
             
          ],
          statut: "en attente"
        }
      ];

      localStorage.setItem("trajetsCf", JSON.stringify(exemples));
      setTrajets(exemples);
    } else {
      setTrajets(saved);
    }
  }, []);

  // --- Mettre à jour un trajet ---
  const updateStatus = (trajet: any, status: string) => {
    const updated = trajets.map((t) =>
      t.idTrajet === trajet.idTrajet ? { ...t, statut: status } : t
    );

    setTrajets(updated);
    localStorage.setItem("trajetsCf", JSON.stringify(updated));
    setSelectedTrajet({ ...trajet, statut: status });
  };

  const closeModal = () => setSelectedTrajet(null);



  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        🚍 Mes Trajets Assignés
      </h2>
        {/* Filigrane */}
      {entrepriseData && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
          <svg width="600" height="620">
            <defs>
              <path id="curve" d="M 50 400 A 250 250 0 0 1 450 400" />
            </defs>
            <text
              fill="rgba(207,226,202,0.3)"
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
      {trajets.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Aucun trajet assigné pour le moment.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trajets.map((t: any, i: number) => (
            <div
              key={i}
              className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 shadow hover:shadow-lg cursor-pointer rounded-xl transition"
              onClick={() => setSelectedTrajet(t)}
            >
              <h3 className="font-bold text-xl text-blue-700">
                {t.depart} → <span className="text-green-700">{t.arrivee}</span>
              </h3>

              <p className="text-gray-600 mt-1">📅 Date : {t.date}</p>
              <p className="text-gray-600">⏰ Heure : {t.heure}</p>
              <p className="text-gray-600">🚌 Bus : {t.bus?.nom || "Bus non spécifié"}</p>

              <div className="mt-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full text-white ${
                    t.statut === "termine"
                      ? "bg-green-600"
                      : t.statut === "demarre"
                      ? "bg-yellow-500"
                      : t.statut === "releve"
                      ? "bg-purple-600"
                      : "bg-gray-500"
                  }`}
                >
                  {t.statut ? t.statut.toUpperCase() : "EN ATTENTE"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- POPUP MODAL --- */}
      {selectedTrajet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 animate-fade-in relative">

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={closeModal}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              🚍 Détails du Trajet
            </h2>

            {/* DÉTAILS */}
            <div className="space-y-2 mb-4">
              <p><b>Départ :</b> {selectedTrajet.depart}</p>
              <p><b>Arrivée :</b> {selectedTrajet.arrivee}</p>
              <p><b>Date :</b> {selectedTrajet.date}</p>
              <p><b>Heure :</b> {selectedTrajet.heure}</p>
              <p><b>Bus des gens :</b> {selectedTrajet.bus?.nom || "Non spécifié"}</p>
            </div>

         {/* PASSAGERS */}
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <h3 className="font-bold text-lg mb-2">👥 Liste des Passagers</h3>

            {selectedTrajet.passagers && selectedTrajet.passagers.length > 0 ? (
                <div className="max-h-64 overflow-y-auto pr-2">
                <ul className="space-y-1">
                    {selectedTrajet.passagers.map((p: any, index: number) => (
                    <li
                        key={index}
                        className="p-2 bg-white rounded border shadow-sm"
                    >
                        {p.nom} — {p.telephone}
                    </li>
                    ))}
                </ul>
                </div>
            ) : (
                <p className="text-gray-600">Aucun passager enregistré.</p>
            )}
            </div>


            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => updateStatus(selectedTrajet, "demarre")}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
              >
                🚦 Démarrer
              </button>

              <button
                onClick={() => updateStatus(selectedTrajet, "releve")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
              >
                🔄 Relevé
              </button>

              <button
                onClick={() => updateStatus(selectedTrajet, "termine")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                ✅ Terminer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default GestionTrajetCf;
