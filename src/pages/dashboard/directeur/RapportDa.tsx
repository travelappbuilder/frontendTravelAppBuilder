import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#ca8a04", "#dc2626", "#8b5cf6", "#ec4899"];

const RapportDa: React.FC = () => {
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [revenusMensuels, setRevenusMensuels] = useState<any[]>([]);
  const [revenusAnnuels, setRevenusAnnuels] = useState<any[]>([]);
  const [periodesRentables, setPeriodesRentables] = useState<any[]>([]);
  const [performanceAgence, setPerformanceAgence] = useState<any[]>([]);

  // Générer des données simulées
  const generateData = (annee: number) => {
    // Revenus mensuels
    const mensuels = Array.from({ length: 12 }, (_, i) => ({
      mois: new Date(0, i).toLocaleString("fr-FR", { month: "short" }),
      revenu: Math.floor(Math.random() * 20000000) + 5000,
    }));
    setRevenusMensuels(mensuels);

    // Revenus annuels sur 5 ans
    const annuels = Array.from({ length: 7 }, (_, i) => ({
      annee: annee - 4 + i,
      revenu: Math.floor(Math.random() * 240000000) + 100000,
    }));
    setRevenusAnnuels(annuels);

    // Périodes rentables (part de revenu par trimestre)
    const periodes = [
      { label: "T1", value: Math.floor(Math.random() * 100) },
      { label: "T2", value: Math.floor(Math.random() * 100) },
      { label: "T3", value: Math.floor(Math.random() * 100) },
      { label: "T4", value: Math.floor(Math.random() * 100) },
    ];
    setPeriodesRentables(periodes);

    // Performance de l'agence
    const performance = [
      { label: "Productivité", value: Math.floor(Math.random() * 100) },
      { label: "Satisfaction", value: Math.floor(Math.random() * 100) },
      { label: "Organisation", value: Math.floor(Math.random() * 100) },
    ];
    setPerformanceAgence(performance);
  };

  useEffect(() => {
    const stored = localStorage.getItem("entrepriseData");
    if (stored) setEntrepriseData(JSON.parse(stored));
    generateData(year);
  }, []);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
    generateData(selectedYear);
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

      <h1 className="text-3xl font-bold text-blue-900 mb-6">Rapports et Statistiques</h1>

      {/* Sélecteur d'année */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Année :</label>
        <select
          value={year}
          onChange={handleYearChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Revenus mensuels */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Revenus mensuels ({year})</h2>
        <BarChart width={700} height={300} data={revenusMensuels}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenu" fill="#2563eb" />
        </BarChart>
      </div>

      {/* Revenus annuels */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Revenus annuels</h2>
        <LineChart width={700} height={300} data={revenusAnnuels}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="annee" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenu" stroke="#16a34a" strokeWidth={3} />
        </LineChart>
      </div>

      {/* Périodes rentables */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Périodes rentables (trimestres)</h2>
        <PieChart width={400} height={300}>
          <Pie data={periodesRentables} dataKey="value" nameKey="label" outerRadius={100} label>
            {periodesRentables.map((p, index) => (
              <Cell 
              key={`Cell-${index}`} 
              fill={COLORS[index % COLORS.length]}>
              <title>{`${p.label}: ${p.value}`}</title>
              </Cell>
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Performance de l'agence */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Performance de l'agence</h2>
        <div className="grid grid-cols-3 gap-6">
          {performanceAgence.map((p, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded shadow flex flex-col items-center"
            >
              <p className="font-semibold">{p.label}</p>
              <p className="text-green-700 font-bold text-2xl">{p.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RapportDa;
