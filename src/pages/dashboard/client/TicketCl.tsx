import React, { useEffect, useState } from "react";
import BusCard from "./BusCard";

interface TicketClProps {
  setActiveContent: (value: string) => void;
}

const TicketCl: React.FC<TicketClProps> = ({ setActiveContent }) => {
  const [ticket, setTicket] = useState<any>(null);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    // Récupérer les tickets
    const tickets = JSON.parse(localStorage.getItem("ticketsData") || "[]");
    if (tickets.length > 0) {
      setTicket(tickets[tickets.length - 1]); // dernier ticket
      console.log("Tickets enregistres : ", tickets)
    }
    

    // Récupérer les infos du client depuis personnelsData
    const personnels = JSON.parse(localStorage.getItem("personnelsData") || "[]");
    const clientData = personnels.find((p: any) => p.role === "ROLE_CLIENT") || null;
    setClient(clientData);
  }, []);

  if (!ticket) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">Aucun ticket trouvé</h2>
        <button
          onClick={() => setActiveContent("reservation")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retour aux réservations
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    const content = `
TICKET DE VOYAGE
-------------------------
Nom: ${client?.nom || "Norbert Allaissem Ibrahim"}
Email: ${client?.email || "norbertallaissemibrahim@gmail.com"}
Téléphone: ${client?.telephone || "6 77 88 98 76"}

Trajet: ${ticket.trajet.villeDepart} ➜ ${ticket.trajet.villeArrivee}
Date: ${ticket.trajet.dateDepart} à ${ticket.trajet.heureDepart}
Entreprise: ${ticket.trajet.idEntreprise}
Agence: ${ticket.trajet.idAgence}
Prix: ${ticket.trajet.prix} FCFA

Bus: ${ticket.bus.join(", ")}
-------------------------
Merci pour votre réservation !
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ticket_${ticket.idTicket || "1"}.txt`;
    link.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Votre Ticket</h2>

      <div className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-900">Informations du client</h3>
        <p><strong>Nom :</strong> {client?.nom || "Nom Inconnu"}</p>
        <p><strong>Email :</strong> {client?.email || "email@example.com"}</p>
        <p><strong>Téléphone :</strong> {client?.telephone || "000-000-0000"}</p>
      </div>

      <div className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-900">Détails du trajet</h3>
        <p><strong>Entreprise :</strong> {ticket.trajet.idEntreprise}</p>
        <p><strong>Agence :</strong> {ticket.trajet.idAgence}</p>
        <p><strong>Départ :</strong> {ticket.trajet.villeDepart} ➜ {ticket.trajet.villeArrivee}</p>
        <p><strong>Date :</strong> {ticket.trajet.dateDepart} à {ticket.trajet.heureDepart}</p>
        <p><strong>Prix :</strong> {ticket.trajet.prix} FCFA</p>
      </div>

      <div className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-900">Bus assigné</h3>
        <BusCard bus={ticket.bus} />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Télécharger le ticket
        </button>

        <button
          onClick={() => setActiveContent("reservation")}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Retour aux réservations
        </button>
      </div>
    </div>
  );
};

export default TicketCl;
