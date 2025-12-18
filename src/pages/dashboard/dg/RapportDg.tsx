import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const RapportDg: React.FC = () => {
  const [entrepriseData, setEntrepriseData] = useState<any>(null);

  // Année sélectionnée
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // Données dynamiques
  const [revenusMensuels, setRevenusMensuels] = useState<any[]>([]);
  const [personnelParAgence, setPersonnelParAgence] = useState<any[]>([]);
  const [rolesData, setRolesData] = useState<any[]>([]);
  const [villesRevenus, setVillesRevenus] = useState<any[]>([]);
  const [reservationsMensuelles, setReservationsMensuelles] = useState<any[]>([]);

  /* Utility pour générer un nombre aléatoire dans un intervalle */
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  /* Génère les données selon l'année */
  const genererDonnees = (year: number) => {
    const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

    setRevenusMensuels(
      mois.map((m) => ({ mois: m, revenu: rand(12, 40) * 1_000_000 }))
    );

    setReservationsMensuelles(
      mois.map((m) => ({ mois: m, res: rand(150, 800) }))
    );

    setPersonnelParAgence([
      { agence: "Yaoundé", total: rand(15, 30) },
      { agence: "Douala", total: rand(12, 28) },
      { agence: "Bafoussam", total: rand(7, 15) },
      { agence: "Maroua", total: rand(4, 10) },
      { agence: "Bertoua", total: rand(3, 8) },
    ]);

    setRolesData([
      { role: "Directeurs", value: rand(3, 6) },
      { role: "Gestionnaires", value: rand(8, 15) },
      { role: "Chauffeurs", value: rand(40, 60) },
    ]);

    setVillesRevenus([
      { ville: "Yaoundé", revenu: rand(5, 10) * 1_000_000 },
      { ville: "Douala", revenu: rand(4, 9) * 1_000_000 },
      { ville: "Garoua", revenu: rand(2, 5) * 1_000_000 },
      { ville: "Ngaoundéré", revenu: rand(1, 4) * 1_000_000 },
      { ville: "Maroua", revenu: rand(1, 3) * 1_000_000 },
      { ville: "Kribi", revenu: rand(1, 3) * 1_000_000 },
      { ville: "Bamenda", revenu: rand(1, 3) * 1_000_000 },
      { ville: "Bafoussam", revenu: rand(1, 3) * 1_000_000 },
      { ville: "Bertoua", revenu: rand(1, 2) * 1_000_000 },
      { ville: "Ebolowa", revenu: rand(1, 2) * 1_000_000 },
    ]);
  };

  useEffect(() => {
    const stored = localStorage.getItem("entrepriseData");
    if (stored) setEntrepriseData(JSON.parse(stored));

    genererDonnees(selectedYear);
  }, []);

  // Recharge les données lorsqu’on change d’année
  useEffect(() => {
    genererDonnees(selectedYear);
  }, [selectedYear]);

  return (
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

      {/* Contenu principal */}
      <div className="relative space-y-14">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Rapports et Statistiques</h1>

          {/* Sélecteur d'année */}
          <select
            className="border px-3 py-2 rounded-lg shadow bg-white"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value={2023}>Année 2023</option>
            <option value={2024}>Année 2024</option>
            <option value={2025}>Année 2025</option>
            <option value={2026}>Année 2026</option>
          </select>
        </div>

        {/* Revenus */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Revenus mensuels ({selectedYear})
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenusMensuels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenu" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personnel */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Nombre de personnels par agence
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personnelParAgence}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="agence" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#16A34A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
              Répartition des rôles
            </h2>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={rolesData}
                    dataKey="value"
                    nameKey="role"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#9333EA"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenus par ville */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-orange-600">
            Villes les plus rentables ({selectedYear})
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={villesRevenus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ville" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenu" stroke="#EA580C" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Réservations */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Réservations mensuelles ({selectedYear})
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reservationsMensuelles}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="res" stroke="#DC2626" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RapportDg;
