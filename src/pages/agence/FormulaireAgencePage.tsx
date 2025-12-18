import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormulaireAgencePage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomAgence: "",
    adresseAgence: "",
    logoAgence: null as File | null,
    telephoneAgence: "",
    emailAgence: "",
    politiqueTarifs: "",
    politiqueAnnulation: "",
    heureDepartStandard: "",
    latitude: "",
    longitude: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // Convertir une image en Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Charger les données existantes
    const storedAgencesData = localStorage.getItem("agencesData");

    let agencesList: any[] = [];
    try {
      const parsed = storedAgencesData ? JSON.parse(storedAgencesData) : [];
      if (Array.isArray(parsed)) {
        agencesList = parsed;
      }
    } catch (error) {
      console.warn("agencesData corrompu, réinitialisation");
      agencesList = [];
    }

    // Convertir le logo en base64 si présent
    let logoBase64 = null;
    if (formData.logoAgence) {
      logoBase64 = await fileToBase64(formData.logoAgence);
    }

    // Ajouter la nouvelle agence
    const newAgence = {
      ...formData,
      logoAgence: logoBase64,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    agencesList.push(newAgence);

    // Sauvegarder dans le localStorage
    localStorage.setItem("agencesData", JSON.stringify(agencesList));

    // Redirection vers le Dashboard DG
    navigate("/dashboard/dg");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Bouton Retour */}
      <div className="w-full max-w-4xl mb-6 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-100 transition"
        >
          Retour
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-8">Créer une Agence</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nom */}
        <div>
          <label className="block font-medium mb-2">Nom de l'agence</label>
          <input
            type="text"
            name="nomAgence"
            value={formData.nomAgence}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="block font-medium mb-2">Adresse de l'agence</label>
          <input
            type="text"
            name="adresseAgence"
            value={formData.adresseAgence}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block font-medium mb-2">Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ex: 9.70199"
            required
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block font-medium mb-2">Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ex: 4.05106"
            required
          />
        </div>

        {/* Logo */}
        <div>
          <label className="block font-medium mb-2">Logo de l'agence</label>
          <input
            type="file"
            name="logoAgence"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            accept="image/*"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block font-medium mb-2">Téléphone</label>
          <input
            type="text"
            name="telephoneAgence"
            value={formData.telephoneAgence}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            name="emailAgence"
            value={formData.emailAgence}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Politique tarifs */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-2">Politique des tarifs</label>
          <textarea
            name="politiqueTarifs"
            value={formData.politiqueTarifs}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Politique annulation */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-2">Politique d'annulation</label>
          <textarea
            name="politiqueAnnulation"
            value={formData.politiqueAnnulation}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Heure de départ */}
        <div>
          <label className="block font-medium mb-2">Heure de départ standard</label>
          <input
            type="time"
            name="heureDepartStandard"
            value={formData.heureDepartStandard}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bouton */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Créer l'agence
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormulaireAgencePage;
