import React, { useEffect, useState } from "react";

interface Trajet {
  idTrajet: number | string;
  idEntreprise?: number | string;
  idAgence?: number | string;
  villeDepart: string;
  villeArrivee: string;
  chauffeurs: string[];
  bus: string[];
  scales: string[];
  distanceKm: number;
  prix: number;
  dateDepart: string;
  dateArrivee?: string | null;
  dateCreation: string;
  statut: "activé" | "désactivé";
  placeOccupee: number;
  placeLibre: number;
}

const GestionTrajetGn: React.FC = () => {
  const [entreprisesData, setEntreprisesData] = useState<any>(null);
  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrajet, setEditingTrajet] = useState<Trajet | null>(null);

  const initialForm: Trajet = {
    idTrajet: "",
    idEntreprise: "",
    villeDepart: "",
    villeArrivee: "",
    chauffeurs: [],
    bus: [],
    scales: [],
    distanceKm: 0,
    prix: 0,
    dateDepart: "",
    dateArrivee: null,
    dateCreation: "",
    statut: "désactivé",
    placeOccupee: 0,
    placeLibre: 0,
  };

  const [formData, setFormData] = useState<Trajet>(initialForm);

  // Charger données simulées ou locales
  useEffect(() => {
    const storedEntreprises = localStorage.getItem("entreprisesData");
    if (storedEntreprises) setEntreprisesData(JSON.parse(storedEntreprises));

    const storedTrajets = localStorage.getItem("trajetsData");
    if (storedTrajets) setTrajets(JSON.parse(storedTrajets));
    else {
      // Simulation de base
      const simulation: Trajet[] = [
        {
          idTrajet: 1,
          idEntreprise: 1,
          idAgence: 5,
          villeDepart: "Douala",
          villeArrivee: "Yaoundé",
          chauffeurs: ["Paul T.", "Jean M."],
          bus: ["Bus 28 Places", "Minibus 18 Places"],
          scales: ["Edea", "Nkongsamba"],
          distanceKm: 240,
          prix: 5000,
          dateDepart: "2025-01-10 06:30",
          dateArrivee: null,
          dateCreation: "2025-01-01",
          statut: "activé",
          placeOccupee: 12,
          placeLibre: 16,
        },
        {
          idTrajet: 2,
          idEntreprise: 1,
          idAgence: 3,
          villeDepart: "Yaoundé",
          villeArrivee: "Bafoussam",
          chauffeurs: ["Armand K."],
          bus: ["Coaster 30 Places"],
          scales: ["Makenene", "Bafang"],
          distanceKm: 320,
          prix: 6500,
          dateDepart: "2025-01-12 08:00",
          dateArrivee: null,
          dateCreation: "2025-01-02",
          statut: "désactivé",
          placeOccupee: 5,
          placeLibre: 25,
        },
      ];
      setTrajets(simulation);
      localStorage.setItem("trajetsData", JSON.stringify(simulation));
    }
  }, []);

  const saveTrajets = (updated: Trajet[]) => {
    setTrajets(updated);
    localStorage.setItem("trajetsData", JSON.stringify(updated));
  };

  const handleDelete = (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce trajet ?")) return;
    const updated = trajets.filter((t) => t.idTrajet !== id);
    saveTrajets(updated);
  };

  const handleToggleStatut = (id: number) => {
    const updated = trajets.map((t) =>
      t.idTrajet === id
        ? { ...t, statut: t.statut === "activé" ? "désactivé" : "activé" }
        : t
    );
    saveTrajets(updated);
  };

  const handleEdit = (trajet: Trajet) => {
    setEditingTrajet(trajet);
    setFormData(trajet);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingTrajet(null);
    setFormData(initialForm);
    setShowForm(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrajet = {
      ...formData,
      idTrajet: editingTrajet ? formData.idTrajet : Date.now(),
      dateCreation: editingTrajet ? formData.dateCreation : new Date().toISOString(),
      chauffeurs: formData.chauffeurs || [],
      bus: formData.bus || [],
      scales: formData.scales || [],
    };
    let updatedTrajets;
    if (editingTrajet) {
      updatedTrajets = trajets.map((t) =>
        t.idTrajet === editingTrajet.idTrajet ? newTrajet : t
      );
    } else {
      updatedTrajets = [...trajets, newTrajet];
    }
    saveTrajets(updatedTrajets);
    setShowForm(false);
  };

  return (
    <div className="relative p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">
          Gestion et Activation des Trajets
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nouveau trajet
        </button>
      </div>

      {/* Formulaire de création / modification */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {editingTrajet ? "Modifier le trajet" : "Créer un nouveau trajet"}
          </h2>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
           <input
              type="text"
              name="idEntreprise"
              placeholder="ID Entreprise"
              title="Identifiant de l'entreprise"
              value={formData.idEntreprise}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="idAgence"
              title="Identifiant de l'Agence"
              placeholder="ID Agence"
              value={formData.idAgence}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="villeDepart"
              title="Ville de départ"
              placeholder="Ville départ"
              value={formData.villeDepart}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="villeArrivee"
              title="Ville d'arrivée"
              placeholder="Ville arrivée"
              value={formData.villeArrivee}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="chauffeurs"
              title="Les Chauffeurs qui assureront ce trajet"
              placeholder="Chauffeurs (séparés par ,)"
              value={formData.chauffeurs.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, chauffeurs: e.target.value.split(",").map(s => s.trim()) })
              }
              className="p-2 border rounded col-span-1 md:col-span-2"
            />
            <input
              type="text"
              name="bus"
              title="Les Bus qui assureront ce trajet"
              placeholder="Bus associés (séparés par ,)"
              value={formData.bus.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, bus: e.target.value.split(",").map(s => s.trim()) })
              }
              className="p-2 border rounded col-span-1 md:col-span-2"
            />
            <input
              type="text"
              name="scales"
              title="Les Scales prévues pour ce trajet"
              placeholder="Scales (séparés par ,)"
              value={formData.scales.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, scales: e.target.value.split(",").map(s => s.trim()) })
              }
              className="p-2 border rounded col-span-1 md:col-span-2"
            />
            <input
              type="number"
              name="distanceKm"
              title="Distance en kilomètres"
              placeholder="Distance (km)"
              value={formData.distanceKm}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="prix"
              title="Prix du trajet en FCFA"
              placeholder="Prix (FCFA)"
              value={formData.prix}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="datetime-local"
              name="dateDepart"
              title="Date de départ"
              placeholder="Date départ"
              value={formData.dateDepart}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="datetime-local"
              name="dateArrivee"
              title="Date d'arrivée (Vide au moment de la creation du trajet)"
              placeholder="Date arrivée"
              value={formData.dateArrivee || ""}
              onChange={handleFormChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="placeOccupee"
              title="Nombre de places occupées"
              placeholder="Places occupées"
              value={formData.placeOccupee}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="placeLibre"
              title="Nombre de places libres"
              placeholder="Places libres"
              value={formData.placeLibre}
              onChange={handleFormChange}
              required
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingTrajet ? "Modifier" : "Créer"}
            </button>
          </form>
        </div>
      )}

      {/* Cartes des trajets */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {trajets.map((trajet) => (
          <div
            key={trajet.idTrajet}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between border-l-4 border-blue-500 hover:shadow-lg transition"
          >
            <div className="mb-3">
              <h2 className="text-xl font-bold mb-1 text-green-700">
                Entreprise : {trajet.idEntreprise || "Touristique"} [ {trajet.idAgence || "Touristique Vanne"} ] 
              </h2>
              <h2 className="text-xl font-bold mb-1 text-blue-700">
                {trajet.villeDepart} → {trajet.villeArrivee}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-purple-600">Chauffeurs:</span>{" "}
                {(trajet.chauffeurs || []).join(", ")}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-indigo-600">Bus:</span>{" "}
                {(trajet.bus || []).join(", ")}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-orange-600">Scales:</span>{" "}
                {(trajet.scales || []).join(", ")}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-green-700">Distance:</span>{" "}
                {trajet.distanceKm} km
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-red-600">Prix:</span> {trajet.prix} FCFA
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-blue-600">Départ:</span> {trajet.dateDepart}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-gray-800">Arrivée:</span> {trajet.dateArrivee || "-"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-gray-500">Création:</span> {trajet.dateCreation}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-green-600">Places occupées:</span> {trajet.placeOccupee} /{" "}
                <span className="font-semibold text-blue-600">libres:</span> {trajet.placeLibre}
              </p>
              <p
                className={`font-bold ${
                  trajet.statut === "activé" ? "text-green-600" : "text-red-600"
                }`}
              >
                Statut: {trajet.statut}
              </p>
            </div>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleEdit(trajet)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(trajet.idTrajet)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionTrajetGn;
