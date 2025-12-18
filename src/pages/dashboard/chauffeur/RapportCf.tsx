import React, { useState, useEffect, useMemo, use } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  RadialBarChart, RadialBar,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from "recharts";

const RapportCf: React.FC = () => {
  // 🔥 Données entreprise
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  useEffect(() => {
    const storedEntreprise = localStorage.getItem("entrepriseData");
    if (storedEntreprise) {
      setEntrepriseData(JSON.parse(storedEntreprise));
    }
  }, []);

  // 🔥 Récupération des trajets du chauffeur
  const rawTrajets = JSON.parse(localStorage.getItem("trajetsCf") || "[]");

  // 🔥 Années disponibles
  const years = [...new Set(rawTrajets.map((t: any) => new Date(t.date).getFullYear()))];

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // 🔥 Trajets filtrés par année
  const trajets = useMemo(() =>
    rawTrajets.filter((t: any) =>
      new Date(t.date).getFullYear() === selectedYear
    ),
    [selectedYear, rawTrajets]
  );

  // 🔥 Calculs statistiques
  const total = trajets.length;
  const succes = trajets.filter((t: any) => t.statut === "succes").length;
  const probleme = trajets.filter((t: any) => t.statut === "probleme").length;

  const accidents = trajets.filter((t: any) => t.accident === true).length;
  const pannes = trajets.filter((t: any) => t.panne === true).length;
  const destructionBus = trajets.filter((t: any) => t.destruction === true).length;

  // 🔥 Indice crédibilité chauffeur
  const credibilite =
    total === 0 ? 0 : Math.max(30, Math.min(100, 100 - probleme * 10 - accidents * 15));

  // 🔥 Graph 1 – Réussite vs Problèmes
  const barData = [
    { name: "Statut des trajets", Succes: succes, Probleme: probleme },
  ];

  // 🔥 Graph 2 – Accidents & Pannes
  const lineData = [
    { name: "Incidents", Accidents: accidents, Pannes: pannes },
  ];

  // 🔥 Graph 3 – PieChart des statuts
  const pieData = [
    { name: "Succès", value: succes },
    { name: "Problème", value: probleme },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Rapport & Statistiques Chauffeur</h2>
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
      {/* Choix de l'année */}
      <div className="mb-6">
        <label className="font-bold mr-3">Année :</label>
        <select
          className="p-2 border rounded bg-white shadow"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.length === 0 ? (
            <option value={currentYear}>{currentYear}</option>
          ) : (
            years.map((y) => <option key={y} value={y}>{y}</option>)
          )}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded text-center">
          <h3 className="font-bold">Trajets</h3>
          <p className="text-3xl text-blue-600">{total}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h3 className="font-bold">Accidents</h3>
          <p className="text-3xl text-red-600">{accidents}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h3 className="font-bold">Pannes</h3>
          <p className="text-3xl text-orange-500">{pannes}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h3 className="font-bold">Crédibilité</h3>
          <p className="text-3xl text-green-600">{credibilite}%</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BarChart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Trajets : Succès vs Problèmes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Succes" fill="#28a745" />
              <Bar dataKey="Probleme" fill="#dc3545" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LineChart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Accidents & Pannes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Accidents" stroke="#dc3545" strokeWidth={3} />
              <Line type="monotone" dataKey="Pannes" stroke="#fd7e14" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PieChart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Répartition des Trajets</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Crédibilité */}
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="font-bold mb-2">Indice de Crédibilité</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              innerRadius="40%"
              outerRadius="80%"
              data={[{ name: "Crédibilité", value: credibilite, fill: "#28a745" }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar minAngle={15} background clockWise dataKey="value" />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-2xl font-bold text-green-600">{credibilite}%</p>
        </div>

      </div>
    </div>
  );
};

export default RapportCf;
