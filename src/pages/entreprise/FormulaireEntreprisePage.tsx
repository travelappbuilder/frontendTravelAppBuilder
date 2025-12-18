import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { createEntreprise } from "../../api/authService";

const FormulaireEntreprisePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    logoEntreprise: null as File | null,
    image1Entreprise: null as File | null,
    image2Entreprise: null as File | null,
    papierRCCMEntreprise: null as File | null,
    papierNUIEntreprise: null as File | null,
    papierCCEntreprise: null as File | null,
    emailEntreprise: "",
    telephone1Entreprise: "",
    telephone2Entreprise: "",
    siegeSocial: "",
    statutEntreprise: "FERMER",
    deviseEntreprise: "XAF",
    modePaiement: "CASH",
    couleurEntreprise: "COULEUR_1",
    themeEntreprise: "THEME_1",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();

    // Ajouter les fichiers
    if (formData.logoEntreprise) data.append("logoEntreprise", formData.logoEntreprise);
    if (formData.image1Entreprise) data.append("image1Entreprise", formData.image1Entreprise);
    if (formData.image2Entreprise) data.append("image2Entreprise", formData.image2Entreprise);
    if (formData.papierRCCMEntreprise) data.append("papierRCCMEntreprise", formData.papierRCCMEntreprise);
    if (formData.papierNUIEntreprise) data.append("papierNUIEntreprise", formData.papierNUIEntreprise);
    if (formData.papierCCEntreprise) data.append("papierCCEntreprise", formData.papierCCEntreprise);

    // Créer objet JSON pour toutes les données texte
    const entrepriseData = {
      nomEntreprise: formData.nomEntreprise,
      emailEntreprise: formData.emailEntreprise,
      telephone1Entreprise: formData.telephone1Entreprise,
      telephone2Entreprise: formData.telephone2Entreprise,
      siegeSocial: formData.siegeSocial,
      statutEntreprise: formData.statutEntreprise,
      deviseEntreprise: formData.deviseEntreprise,
      modePaiement: formData.modePaiement || "CASH",
      couleurEntreprise: formData.couleurEntreprise,
      themeEntreprise: formData.themeEntreprise,
    };

    // Ajouter le JSON sous forme de champ "entrepriseData"
    data.append("entrepriseData", JSON.stringify(entrepriseData));

    const response = await createEntreprise(data);
    const entrepriseResponse = response.data;

    localStorage.setItem("entrepriseData", JSON.stringify(entrepriseResponse));
    alert("Entreprise créée avec succès !");
    navigate("/dashboard/dg");
  } catch (error: any) {
    console.error(error);
    alert("Erreur lors de la création de l'entreprise : " + (error.response?.data?.message || error.message));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Bouton Retour */}
      <div className="w-full max-w-4xl mb-6 flex justify-start">
        <button
          onClick={() => navigate("/dashboard/dg")}
          className="flex items-center px-4 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="mr-2" /> Retour
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-8">Créer une Entreprise</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nom de l'entreprise */}
        <div>
          <label className="block font-medium mb-2">Nom de l'entreprise</label>
          <input
            type="text"
            name="nomEntreprise"
            value={formData.nomEntreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Logo de l'entreprise */}
        <div>
          <label className="block font-medium mb-2">Logo de l'entreprise</label>
          <input
            type="file"
            name="logoEntreprise"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            accept="image/*"
            required
          />
        </div>

        {/* Image 1 */}
        <div>
          <label className="block font-medium mb-2">Image 1</label>
          <input
            type="file"
            name="image1Entreprise"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            accept="image/*"
            required
          />
        </div>

        {/* Image 2 */}
        <div>
          <label className="block font-medium mb-2">Image 2</label>
          <input
            type="file"
            name="image2Entreprise"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            accept="image/*"
          />
        </div>

        {/* Papier RCCM */}
        <div>
          <label className="block font-medium mb-2">Papier RCCM</label>
          <input
            type="file"
            name="papierRCCMEntreprise"
            title="papier de Registre du Commerce et de Credit Mobilier"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Papier NUI */}
        <div>
          <label className="block font-medium mb-2">Papier NUI</label>
          <input
            type="file"
            name="papierNUIEntreprise"
            title="papier de Numéro d'Identification Unique de l'entreprise"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Papier CC */}
        <div>
          <label className="block font-medium mb-2">Papier CC</label>
          <input
            type="file"
            name="papierCCEntreprise"
            title="papier de Certification de Création de l’entreprise"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            name="emailEntreprise"
            value={formData.emailEntreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Téléphone principal */}
        <div>
          <label className="block font-medium mb-2">Téléphone principal</label>
          <input
            type="text"
            name="telephone1Entreprise"
            value={formData.telephone1Entreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+237xxxxxxxxx"
            required
          />
        </div>

        {/* Téléphone secondaire */}
        <div>
          <label className="block font-medium mb-2">Téléphone secondaire</label>
          <input
            type="text"
            name="telephone2Entreprise"
            value={formData.telephone2Entreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+237xxxxxxxxx"
          />
        </div>

        {/* Siège social */}
        <div>
          <label className="block font-medium mb-2">Siège social</label>
          <input
            type="text"
            name="siegeSocial"
            value={formData.siegeSocial}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Devise */}
        <div>
          <label className="block font-medium mb-2">Devise</label>
          <select
            name="deviseEntreprise"
            value={formData.deviseEntreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="XAF">XAF</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Couleur */}
        <div>
          <label className="block font-medium mb-2">Couleur</label>
          <select
            name="couleurEntreprise"
            value={formData.couleurEntreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="COULEUR_1">Couleur 1</option>
            <option value="COULEUR_2">Couleur 2</option>
            <option value="COULEUR_3">Couleur 3</option>
          </select>
        </div>

        {/* Thème */}
        <div>
          <label className="block font-medium mb-2">Thème</label>
          <select
            name="themeEntreprise"
            value={formData.themeEntreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="THEME_1">Thème 1</option>
            <option value="THEME_2">Thème 2</option>
            <option value="THEME_3">Thème 3</option>
          </select>
        </div>

        {/* Bouton de soumission */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Création en cours..." : "Créer l'entreprise"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormulaireEntreprisePage;
