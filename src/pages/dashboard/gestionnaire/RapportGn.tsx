import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

interface Trajet {
  id: number;
  date: string; // ISO
  passagers: number;
  revenu: number;
  type: string; // "trajet régulier", "vip", "occasionnel"
  conducteurId: number;
  agenceId: number;
  niveauSatisfaction: number; // 1 à 5
}

const RapportGn: React.FC = () => {
  const [trajets, setTrajets] = useState<Trajet[]>([]);

  // 🔥 Générer des données simulées
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("trajetsGn") || "[]");
    if (stored.length > 0) {
      setTrajets(stored);
    } else {
      const types = ["Trajet régulier", "VIP", "Occasionnel"];
      const simulated: Trajet[] = [];
      const today = new Date();
      for (let i = 1; i <= 30; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), i, 8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));
        const passagers = Math.floor(Math.random() * 50) + 1;
        const revenu = passagers * (Math.floor(Math.random() * 5000) + 2000);
        simulated.push({
          id: i,
          date: date.toISOString(),
          passagers,
          revenu,
          type: types[Math.floor(Math.random() * types.length)],
          conducteurId: Math.floor(Math.random() * 5) + 1,
          agenceId: 1,
          niveauSatisfaction: Math.floor(Math.random() * 5) + 1
        });
      }
      localStorage.setItem("trajetsGn", JSON.stringify(simulated));
      setTrajets(simulated);
    }
  }, []);

  // Totaux
  const totalTrajets = trajets.length;
  const totalPassagers = trajets.reduce((acc, t) => acc + (t.passagers || 0), 0);
  const totalRevenu = trajets.reduce((acc, t) => acc + (t.revenu || 0), 0);

  // Répartition des types de trajets
  const typesData = Object.entries(trajets.reduce((acc: any, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
  }, {})).map(([type, value]) => ({ name: type, value }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  // Revenu journalier
  const dailyRevenue = trajets.reduce((acc: any, t) => {
    const day = new Date(t.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + t.revenu;
    return acc;
  }, {});
  const dailyRevenueData = Object.entries(dailyRevenue).map(([date, revenu]) => ({ date, revenu }));

  // Revenu mensuel
  const monthlyRevenue = trajets.reduce((acc: any, t) => {
    const d = new Date(t.date);
    const month = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}`;
    acc[month] = (acc[month] || 0) + t.revenu;
    return acc;
  }, {});
  const monthlyRevenueData = Object.entries(monthlyRevenue).map(([month, revenu]) => ({ month, revenu }));

  // Performance / crédibilité moyenne
  const avgSatisfaction = trajets.length > 0
    ? (trajets.reduce((acc, t) => acc + (t.niveauSatisfaction || 0), 0) / trajets.length).toFixed(2)
    : 0;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Rapport & Statistiques du Gestionnaire</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Trajets effectués</h3>
          <p className="text-3xl font-bold text-blue-700">{totalTrajets}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Passagers transportés</h3>
          <p className="text-3xl font-bold text-green-700">{totalPassagers}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Revenu total</h3>
          <p className="text-3xl font-bold text-purple-700">{totalRevenu.toLocaleString()} FCFA</p>
        </div>

        <div className="bg-white p-6 shadow rounded col-span-1 md:col-span-2">
          <h3 className="text-lg font-bold mb-2">Revenu journalier</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenu" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-bold mb-2">Répartition des types de trajets</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={typesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {typesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                >
                  <title>{`${entry.name}: ${entry.value}`}</title>
                </Cell>
              ))}
            </Pie>
            <Tooltip /> {/* Optionnel : affichage interactif */}
          </PieChart>
        </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow rounded col-span-1 md:col-span-2">
          <h3 className="text-lg font-bold mb-2">Revenu mensuel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenu" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-bold mb-2">Crédibilité / Satisfaction</h3>
          <p className="text-3xl font-bold text-yellow-600">{avgSatisfaction} / 5</p>
        </div>
      </div>
    </div>
  );
};

export default RapportGn;
