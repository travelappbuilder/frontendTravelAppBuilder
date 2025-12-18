import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GestionChauffeursDa: React.FC = () => {
  const navigate = useNavigate();
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [chauffeurs, setChauffeurs] = useState<any[]>([]);

  // Charger entreprise et chauffeurs
  useEffect(() => {
    const storedEntreprise = localStorage.getItem("entrepriseData");
    if (storedEntreprise) setEntrepriseData(JSON.parse(storedEntreprise));

    const storedPersonnels = localStorage.getItem("personnelsData");
    if (storedPersonnels) {
      const list = JSON.parse(storedPersonnels);
      const filteredChauffeurs = list.filter(
        (p: any) => p.roleUtilisateur === "ROLE_CHAUFFEUR"
      );
      setChauffeurs(filteredChauffeurs);
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
            stroke="#2563eb"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <p className="mt-2 font-semibold">{label}</p>
        <p className="text-blue-700 font-bold">{value}%</p>
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
        Gestion des Chauffeurs
      </h1>

      {/* Bouton créer chauffeur */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/create-personnel-da")}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
        >
          ➕ Créer un Chauffeur
        </button>
      </div>

      {/* Liste des chauffeurs */}
      {chauffeurs.length === 0 ? (
        <p className="text-gray-500 text-lg">Aucun chauffeur enregistré.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chauffeurs.map((c, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-xl shadow border border-gray-200"
            >
              <h2 className="text-xl font-bold text-blue-800 mb-3">
                {c.nomUtilisateur} {c.prenomUtilisateur}
              </h2>

              <p>
                <strong>Email :</strong> {c.emailUtilisateur}
              </p>
              <p>
                <strong>Téléphone :</strong> {c.telephoneUtilisateur}
              </p>
              <p>
                <strong>ID Agence :</strong> {c.idAgence || "Non renseigné"}
              </p>
              <p>
                <strong>ID Entreprise :</strong>{" "}
                {c.idEntreprise || "Non renseigné"}
              </p>
              <p>
                <strong>Salaire mensuel :</strong> {c.Salaire || "500 000"} XAF

              </p>

              {/* Sous-cartes de performance */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <PerformanceCircle label="Ponctualité" value={80} />
                <PerformanceCircle label="Sécurité" value={92} />
                <PerformanceCircle label="Satisfaction" value={88} />
              </div>

              {/* Bouton détails */}
              <button
                className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                onClick={() =>
                  alert("Voulez-vous modifier les données du chauffeur")
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

export default GestionChauffeursDa;
