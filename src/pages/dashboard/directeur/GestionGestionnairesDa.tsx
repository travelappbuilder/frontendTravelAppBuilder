import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GestionGestionnairesDa: React.FC = () => {
  const navigate = useNavigate();
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [gestionnaires, setGestionnaires] = useState<any[]>([]);

  // Charger entreprise et gestionnaires
  useEffect(() => {
    const storedEntreprise = localStorage.getItem("entrepriseData");
    if (storedEntreprise) setEntrepriseData(JSON.parse(storedEntreprise));

    const storedPersonnels = localStorage.getItem("personnelsData");
    if (storedPersonnels) {
      const list = JSON.parse(storedPersonnels);
      const filteredGestionnaires = list.filter(
        (p: any) => p.roleUtilisateur === "ROLE_GESTIONNAIRE"
      );
      setGestionnaires(filteredGestionnaires);
    }
  }, []);

  // Composant de diagramme circulaire simple
  const PerformanceCircle = ({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <svg width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#16a34a"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <p className="mt-2 font-semibold">{label}</p>
        <p className="text-green-700 font-bold">{value}%</p>
      </div>
    );
  };

  return (
    <div className="relative p-6 bg-white shadow rounded-lg min-h-screen">
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

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Gestion des Gestionnaires
      </h1>

      {/* Bouton créer gestionnaire */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/create-personnel-da")}
          className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-semibold"
        >
          ➕ Créer un Gestionnaire
        </button>
      </div>

      {/* Liste des gestionnaires */}
      {gestionnaires.length === 0 ? (
        <p className="text-gray-500 text-lg">Aucun gestionnaire enregistré.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gestionnaires.map((g, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-xl shadow border border-gray-200"
            >
              <h2 className="text-xl font-bold text-green-800 mb-3">
                {g.nomUtilisateur} {g.prenomUtilisateur}
              </h2>

              <p>
                <strong>Email :</strong> {g.emailUtilisateur}
              </p>
              <p>
                <strong>Téléphone :</strong> {g.telephoneUtilisateur}
              </p>
              <p>
                <strong>ID Agence :</strong> {g.idAgence || "Non renseigné"}
              </p>
              <p>
                <strong>ID Entreprise :</strong> {g.idEntreprise || "Non renseigné"}
              </p>
              <p>
                <strong>Salaire mensuel :</strong> {g.salaireMensuel || "700 000"} XAF
              </p>

              {/* Sous-cartes de performance */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <PerformanceCircle label="Productivité" value={85} />
                <PerformanceCircle label="Organisation" value={90} />
                <PerformanceCircle label="Satisfaction" value={87} />
              </div>

              {/* Bouton Modifier */}
              <button
                className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                onClick={() =>
                  alert("Voulez-vous modifier les données du gestionnaires")
                }
              >
                Modifier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GestionGestionnairesDa;
