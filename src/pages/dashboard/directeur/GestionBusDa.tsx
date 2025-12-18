import React, { useEffect, useState } from "react";
import BusCard, { Bus } from "./schemaBus";

const GestionBusDa: React.FC = () => {
  const [busList, setBusList] = useState<Bus[]>([]);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [formData, setFormData] = useState<Partial<Bus>>({});
  const [showForm, setShowForm] = useState(false);

  // Charger les bus depuis localStorage
  useEffect(() => {
    const storedBus = localStorage.getItem("busData");
    if (storedBus) {
      try {
        const parsed = JSON.parse(storedBus);
        setBusList(Array.isArray(parsed) ? parsed : []);
      } catch {
        setBusList([]);
      }
    }
  }, []);

  // Sauvegarder les bus
  const saveBus = (updated: Bus[]) => {
    setBusList(updated);
    localStorage.setItem("busData", JSON.stringify(updated));
  };

  // Supprimer un bus
  const supprimerBus = (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce bus ?")) return;
    saveBus(busList.filter((b) => b.idBus !== id));
  };

  // Préparer le formulaire pour création
  const creerBus = () => {
    setEditingBus(null);
    setFormData({});
    setShowForm(true);
  };

  // Préparer le formulaire pour modification
  const modifierBus = (bus: Bus) => {
    setEditingBus(bus);
    setFormData(bus);
    setShowForm(true);
  };

  // Gestion du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBus: Bus = {
      idBus: editingBus ? editingBus.idBus : Date.now(),
      idAgence: formData.idAgence || "Agence1",
      identifiantBus: formData.identifiantBus || "BusXX",
      immatriculationBus: formData.immatriculationBus || "XXX-000-XX",
      marqueBus: formData.marqueBus || "Toyota",
      modeleBus: formData.modeleBus,
      capaciteBus: Number(formData.capaciteBus) || 72,
      confortBus: (formData.confortBus as "Standard" | "VIP") || "Standard",
      etatBus: (formData.etatBus as "en_service" | "maintenance" | "hors_service") || "en_service",
      kilometrageBus: Number(formData.kilometrageBus) || 0,
      placesOccupees: formData.placesOccupees || [],
    };

    if (editingBus) {
      const updated = busList.map((b) => (b.idBus === editingBus.idBus ? newBus : b));
      saveBus(updated);
    } else {
      saveBus([...busList, newBus]);
    }

    setEditingBus(null);
    setFormData({});
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Gestion des Bus</h1>

      <button
        onClick={creerBus}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Ajouter un bus
      </button>

      {/* Formulaire */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow rounded-lg p-4 mb-6 max-w-2xl"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingBus ? "Modifier le bus" : "Créer un nouveau bus"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="identifiantBus"
              placeholder="Identifiant Bus"
              value={formData.identifiantBus || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="immatriculationBus"
              placeholder="Immatriculation"
              value={formData.immatriculationBus || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="marqueBus"
              placeholder="Marque"
              value={formData.marqueBus || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="modeleBus"
              placeholder="Modèle"
              value={formData.modeleBus || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="capaciteBus"
              placeholder="Capacité"
              value={formData.capaciteBus || 72}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <select
              name="confortBus"
              value={formData.confortBus || "Standard"}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
            </select>
            <select
              name="etatBus"
              value={formData.etatBus || "en_service"}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="en_service">En service</option>
              <option value="maintenance">Maintenance</option>
              <option value="hors_service">Hors service</option>
            </select>
            <input
              type="number"
              name="kilometrageBus"
              placeholder="Kilométrage"
              value={formData.kilometrageBus || 0}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editingBus ? "Mettre à jour" : "Créer Bus"}
          </button>
        </form>
      )}

      {/* Affichage des bus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(busList) && busList.map((bus) => (
          <div key={bus.idBus} className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
            <BusCard bus={bus} />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => modifierBus(bus)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
              >
                Modifier
              </button>
              <button
                onClick={() => supprimerBus(bus.idBus)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

export default GestionBusDa;
