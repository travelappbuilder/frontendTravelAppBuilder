import React, { useEffect, useState } from "react";

interface HistoriqueClProps {
  setActiveContent: (value: string) => void;
}

interface Ticket {
  idTicket: number;
  dateEmission: string;
  client: any;
  trajet: {
    villeDepart: string;
    villeArrivee: string;
    dateDepart: string; // format YYYY-MM-DD
    heureDepart: string;
    prix: number;
    idEntreprise?: string;
  };
  bus: any;
  statut?: "valide" | "annulé" | "expiré";
}

const HistoriqueCl: React.FC<HistoriqueClProps> = ({ setActiveContent }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchEntreprise, setSearchEntreprise] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("historiqueData");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const list = Array.isArray(parsed) ? parsed : [];

        // Vérification automatique des tickets expirés
        const now = new Date();

        list.forEach((t: Ticket) => {
          const depart = new Date(`${t.trajet.dateDepart} ${t.trajet.heureDepart}`);
          if (depart < now) {
            t.statut = "expiré";
          }
        });

        setTickets(list);
      } catch {
        setTickets([]);
      }
    }
  }, []);

  // Supprimer un ticket invalide
  const deleteTicket = (idTicket: number) => {
    const updated = tickets.filter((t) => t.idTicket !== idTicket);
    setTickets(updated);
    localStorage.setItem("historiqueData", JSON.stringify(updated));
  };

  // Filtrage dynamique
  const filteredTickets = tickets.filter((t) => {
    const matchEntreprise = searchEntreprise
      ? t.trajet.idEntreprise?.toLowerCase().includes(searchEntreprise.toLowerCase())
      : true;

    const matchDate = searchDate ? t.trajet.dateDepart === searchDate : true;

    return matchEntreprise && matchDate;
  });

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6 text-blue-800">Historique des Tickets</h2>

      {/* BARRE DE RECHERCHE */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Rechercher par entreprise..."
          value={searchEntreprise}
          onChange={(e) => setSearchEntreprise(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Liste */}
      {filteredTickets.length === 0 ? (
        <p className="text-gray-600 text-center">Aucun ticket trouvé.</p>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const isExpired = ticket.statut === "expiré";

            return (
              <div
                key={ticket.idTicket}
                className="bg-white p-5 shadow rounded border-l-4 border-blue-600"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Ticket #{ticket.idTicket}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      isExpired
                        ? "bg-gray-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {isExpired ? "EXPIRÉ" : "VALIDE"}
                  </span>
                </div>

                {/* DATE EMISSION */}
                <p className="text-sm text-gray-600 mb-2">
                  Émis le : {new Date(ticket.dateEmission).toLocaleString()}
                </p>

                {/* INFOS TRAJET */}
                <div className="mt-3 text-gray-800">
                  <p>
                    <strong>Départ :</strong> {ticket.trajet.villeDepart} →{" "}
                    {ticket.trajet.villeArrivee}
                  </p>

                  <p>
                    <strong>Date :</strong> {ticket.trajet.dateDepart} à{" "}
                    {ticket.trajet.heureDepart}
                  </p>

                  <p>
                    <strong>Entreprise :</strong>{" "}
                    {ticket.trajet.idEntreprise || "Inconnue"}
                  </p>

                  <p>
                    <strong>Prix :</strong> {ticket.trajet.prix} FCFA
                  </p>

                  {/* BUS */}
                  {ticket.bus && (
                    <p>
                      <strong>Bus :</strong> {ticket.bus.marqueBus} -{" "}
                      {ticket.bus.immatriculationBus}
                    </p>
                  )}
                </div>

                {/* SUPPRESSION ou IMPRESSION A LA FIN DU TRAJET */}
                {isExpired && (
                  <button
                    onClick={() => deleteTicket(ticket.idTicket)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Supprimer ce ticket (expiré)
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => setActiveContent("tickets")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default HistoriqueCl;
