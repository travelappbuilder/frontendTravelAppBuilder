import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RapportClProps {
  setActiveContent: (value: string) => void;
}

interface Ticket {
  idTicket: number;
  dateEmission: string;
  client: any;
  trajet: {
    villeDepart: string;
    villeArrivee: string;
    dateDepart: string;
    heureDepart: string;
    prix: number;
    idEntreprise?: string;
  };
  bus: any;
  statut?: "valide" | "expiré" | "annulé";
}

interface Stat {
  totalTickets: number;
  totalDepenses: number;
  ticketsValides: number;
  ticketsExpires: number;
  entrepriseTop: string;
  trajetTop: string;
}

const RapportCl: React.FC<RapportClProps> = ({ setActiveContent }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stat, setStat] = useState<Stat>({
    totalTickets: 0,
    totalDepenses: 0,
    ticketsValides: 0,
    ticketsExpires: 0,
    entrepriseTop: "",
    trajetTop: "",
  });
  const [chartData, setChartData] = useState<{ year: string; voyages: number }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("historiqueData");
    if (stored) {
      try {
        const list: Ticket[] = JSON.parse(stored);

        const now = new Date();
        list.forEach((t) => {
          const depart = new Date(`${t.trajet.dateDepart} ${t.trajet.heureDepart}`);
          t.statut = depart < now ? "expiré" : "valide";
        });

        setTickets(list);
        computeStats(list);
        computeChart(list);
      } catch {
        setTickets([]);
      }
    }
  }, []);

  const computeStats = (ticketsData: Ticket[]) => {
    if (!ticketsData || ticketsData.length === 0) return;

    const totalTickets = ticketsData.length;
    const ticketsValides = ticketsData.filter((t) => t.statut === "valide").length;
    const ticketsExpires = ticketsData.filter((t) => t.statut === "expiré").length;

    const totalDepenses = ticketsData.reduce((sum, t) => {
      const prix = parseFloat(String(t.trajet.prix).replace(/[^0-9.-]+/g, "")) || 0;
      return sum + prix;
    }, 0);

    const entrepriseCount: Record<string, number> = {};
    ticketsData.forEach((t) => {
      const e = t.trajet.idEntreprise || "Inconnue";
      entrepriseCount[e] = (entrepriseCount[e] || 0) + 1;
    });
    const entrepriseTop = Object.keys(entrepriseCount).reduce((a, b) =>
      entrepriseCount[a] > entrepriseCount[b] ? a : b
    );

    const trajetCount: Record<string, number> = {};
    ticketsData.forEach((t) => {
      const trajet = t.trajet.villeDepart + " → " + t.trajet.villeArrivee;
      trajetCount[trajet] = (trajetCount[trajet] || 0) + 1;
    });
    const trajetTop = Object.keys(trajetCount).reduce((a, b) =>
      trajetCount[a] > trajetCount[b] ? a : b
    );

    setStat({
      totalTickets,
      totalDepenses,
      ticketsValides,
      ticketsExpires,
      entrepriseTop,
      trajetTop,
    });
  };

  const computeChart = (ticketsData: Ticket[]) => {
    const data: Record<string, number> = {};
    ticketsData.forEach((t) => {
      const year = new Date(t.trajet.dateDepart).getFullYear().toString();
      data[year] = (data[year] || 0) + 1;
    });

    // Transforme en tableau pour recharts
    const chartArr = Object.keys(data)
      .sort()
      .map((year) => ({ year, voyages: data[year] }));
    setChartData(chartArr);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Rapport & Statistiques du Client
      </h2>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow p-4 border-l-4 border-blue-600 rounded">
          <h3 className="font-bold text-lg">Total Tickets</h3>
          <p className="text-3xl font-semibold text-blue-700">{stat.totalTickets}</p>
        </div>
        <div className="bg-white shadow p-4 border-l-4 border-green-600 rounded">
          <h3 className="font-bold text-lg">Tickets Valides</h3>
          <p className="text-3xl font-semibold text-green-700">{stat.ticketsValides}</p>
        </div>
        <div className="bg-white shadow p-4 border-l-4 border-gray-600 rounded">
          <h3 className="font-bold text-lg">Tickets Expirés</h3>
          <p className="text-3xl font-semibold text-gray-700">{stat.ticketsExpires}</p>
        </div>
      </div>

      <div className="bg-white shadow p-4 mb-8 border-l-4 border-yellow-600 rounded">
        <h3 className="font-bold text-lg">Dépenses Totales</h3>
        <p className="text-3xl font-semibold text-yellow-700">
          {stat.totalDepenses.toLocaleString()} FCFA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow p-4 border-l-4 border-purple-600 rounded">
          <h3 className="font-bold text-lg">Entreprise la plus utilisée</h3>
          <p className="text-xl font-semibold text-purple-700">{stat.entrepriseTop}</p>
        </div>
        <div className="bg-white shadow p-4 border-l-4 border-pink-600 rounded">
          <h3 className="font-bold text-lg">Trajet le plus fréquent</h3>
          <p className="text-xl font-semibold text-pink-700">{stat.trajetTop}</p>
        </div>
      </div>

      {/* Courbe annuelle */}
      <div className="bg-white shadow p-4 mb-8 rounded">
        <h3 className="text-2xl font-bold mb-4">Historique des voyages par année</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="voyages" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={() => setActiveContent("home")}
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Retour
      </button>
    </div>
  );
};

export default RapportCl;
