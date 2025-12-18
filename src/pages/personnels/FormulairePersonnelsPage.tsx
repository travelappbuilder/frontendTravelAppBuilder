import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Role = "ROLE_DIRECTEUR" | "ROLE_GESTIONNAIRE" | "ROLE_CHAUFFEUR";

const FormulairePersonnelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    emailUtilisateur: "",
    telephoneUtilisateur: "",
    motDePasseUtilisateur: "",
    roleUtilisateur: "" as Role | "",
    statutCompteUtilisateur: "ACTIF",
    idAgence: "",
    idEntreprise: "",
    photoProfilUtilisateur: null as File | null,
    photoCniUtilisateur: null as File | null,
    photoPermisConduireChauffeur: null as File | null,
  });

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

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Récupérer la liste existante depuis le localStorage
  const storedPersonnels = localStorage.getItem("personnelsData");
  const personnelsList = storedPersonnels ? JSON.parse(storedPersonnels) : [];

  // Ajouter le nouveau personnel
  const newPersonnel = {
    ...formData, // tes champs du formulaire
    statutCompteUtilisateur: "ACTIF", // par défaut
  };

  personnelsList.push(newPersonnel);

  // Sauvegarder dans le localStorage
  localStorage.setItem("personnelsData", JSON.stringify(personnelsList));

  console.log("Personnel créé :", newPersonnel);

  // Redirection vers la liste des personnels
  navigate("/dashboard/dg");
};


  const roleDescription = () => {
    switch (formData.roleUtilisateur) {
      case "ROLE_DIRECTEUR":
        return "Le directeur supervise l'ensemble de l'agence et prend des décisions stratégiques.";
      case "ROLE_GESTIONNAIRE":
        return "Le gestionnaire administre les opérations quotidiennes et gère les réservations.";
      case "ROLE_CHAUFFEUR":
        return "Le chauffeur est responsable de la conduite des véhicules et de la sécurité des passagers.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl mb-6 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-100 transition"
        >
          Retour
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-8">Créer un Personnel</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nom */}
        <div>
          <label className="block font-medium mb-2">Nom</label>
          <input
            type="text"
            name="nomUtilisateur"
            value={formData.nomUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Prénom */}
        <div>
          <label className="block font-medium mb-2">Prénom</label>
          <input
            type="text"
            name="prenomUtilisateur"
            value={formData.prenomUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            name="emailUtilisateur"
            value={formData.emailUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block font-medium mb-2">Téléphone</label>
          <input
            type="text"
            name="telephoneUtilisateur"
            value={formData.telephoneUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            name="motDePasseUtilisateur"
            value={formData.motDePasseUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rôle */}
        <div>
          <label className="block font-medium mb-2">Rôle</label>
          <select
            name="roleUtilisateur"
            value={formData.roleUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionnez un rôle</option>
            <option value="ROLE_DIRECTEUR">Directeur</option>
            <option value="ROLE_GESTIONNAIRE">Gestionnaire</option>
            <option value="ROLE_CHAUFFEUR">Chauffeur</option>
          </select>
          {formData.roleUtilisateur && (
            <p className="mt-2 text-gray-600 italic">{roleDescription()}</p>
          )}
        </div>

        {/* Agence */}
        <div>
          <label className="block font-medium mb-2">Agence (ID)</label>
          <input
            type="text"
            name="idAgence"
            value={formData.idAgence}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Entreprise */}
        <div>
          <label className="block font-medium mb-2">Entreprise (ID)</label>
          <input
            type="text"
            name="idEntreprise"
            value={formData.idEntreprise}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Photo de profil */}
        <div>
          <label className="block font-medium mb-2">Photo de profil</label>
          <input
            type="file"
            name="photoProfilUtilisateur"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            accept="image/*"
          />
        </div>

        {/* Photo CNI */}
        <div>
          <label className="block font-medium mb-2">Photo CNI</label>
          <input
            type="file"
            name="photoCniUtilisateur"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
            accept="image/*"
          />
        </div>

        {/* Photo permis chauffeur */}
        {formData.roleUtilisateur === "ROLE_CHAUFFEUR" && (
          <div>
            <label className="block font-medium mb-2">Permis de conduire</label>
            <input
              type="file"
              name="photoPermisConduireChauffeur"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg"
              accept="image/*"
            />
          </div>
        )}

        {/* Bouton de soumission */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Créer le personnel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormulairePersonnelsPage;
