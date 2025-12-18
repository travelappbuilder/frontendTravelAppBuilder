import React, { useEffect, useState } from "react";

interface PaiementClProps {
  setActiveContent: (value: string) => void;
}

const PaiementCl: React.FC<PaiementClProps> = ({ setActiveContent }) => {
  const [personnels, setpersonnels] = useState<any>(null);
  const [trajet, setTrajet] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem("personnelsData");
    const t = localStorage.getItem("trajetSelectionne");

    if (c) setpersonnels(JSON.parse(c));
    if (t) setTrajet(JSON.parse(t));
  }, []);

  if (!trajet) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">Aucun trajet sélectionné</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setActiveContent("reservation")}
        >
          Retour
        </button>
      </div>
    );
  }

  // Prix total
  const nombrePlaces = trajet.placesSelectionnees?.length || 3;
  const prixTotal = nombrePlaces * trajet.prix;

  /** ──────────────── GÉNÉRATION TICKET ─────────────── */
  const genererTicket = () => {
    const ticket = {
      idTicket: Date.now(),
      dateEmission: new Date().toISOString(),
      personnels,
      trajet,
      places: trajet.placesSelectionnees,
      prixTotal,
      bus: [trajet.bus.identifiantBus],
    };

    // Ajouter dans tickets
    const stored = JSON.parse(localStorage.getItem("ticketsData") || "[]");
    stored.push(ticket);
    localStorage.setItem("ticketsData", JSON.stringify(stored));

    // Ajouter dans historique du personnels
    const hist = JSON.parse(localStorage.getItem("historiquesData") || "[]");
    hist.push(ticket);
    localStorage.setItem("historiquesData", JSON.stringify(hist));
  };

  /** ──────────────── ACTION : PAYER ─────────────── */
  const handlePaiement = () => {
    setProcessing(true);

    setTimeout(() => {
      genererTicket();
      setProcessing(false);

      localStorage.setItem("activeSection", "tickets");
      window.dispatchEvent(new Event("storage"));
    }, 2000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Paiement du trajet</h2>

      {/* ───────────── INFOS personnels ───────────── */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-900">Informations du Client</h3>

            <p><strong>Nom :</strong> {personnels.nomUtilisateur || "Norbert Allaissem Ibrahim"}</p>
            <p><strong>Email :</strong> {personnels.emailUtilisateur || "norbertallaissemibrahim@gmail.com"}</p>
            <p><strong>Téléphone :</strong> {personnels.telephoneUtilisateur || "6 77 88 98 76"}</p>
      </div>

      {/* ───────────── INFOS TRAJET, BUS et PLACES ───────────── */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-900">Détails du trajet</h3>
        <p><strong>Entreprise :</strong> {trajet.idEntreprise}</p>
        <p><strong>Agence :</strong> {trajet.idAgence}</p>
        <p><strong>Départ :</strong> {trajet.villeDepart} → {trajet.villeArrivee}</p>
        <p><strong>Date :</strong> {trajet.dateDepart} à {trajet.heureDepart}</p><br />

        <h3 className="text-xl font-semibold mb-2 text-blue-900">Détails du Bus</h3>
        <p><strong>Bus :</strong> {trajet.bus.identifiantBus} | <strong>Modèle :</strong> : {trajet.bus.marqueBus} {trajet.bus.modeleBus}</p>  
        <p><strong>Immatriculation :</strong> {trajet.bus.immatriculation}</p>

        <h4 className="mt-4 font-semibold">Places sélectionnées :</h4>
        <ul className="list-disc list-inside">
          {trajet.placesSelectionnees?.map((place: string, index: number) => (
            <li key={index}>{place}</li>
          )) || <li>Aucune place sélectionnée</li>}
        </ul>

        <p className="mt-3 font-bold text-lg text-red-700">Prix total à payer : {prixTotal} FCFA</p>
      </div>

      {/* ───────────── ACTIONS ───────────── */}
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => setActiveContent("reservation")}
          disabled={processing}
        >
          Annuler
        </button>

        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handlePaiement}
          disabled={processing}
        >
          {processing ? "Traitement..." : "Payer maintenant"}
        </button>
      </div>

      {processing && (
        <p className="mt-4 text-center text-blue-600 animate-pulse font-semibold">
          Transaction en cours, veuillez patienter...
        </p>
      )}
    </div>
  );
};

export default PaiementCl;
