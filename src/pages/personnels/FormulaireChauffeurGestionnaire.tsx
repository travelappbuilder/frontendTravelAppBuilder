import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../../api/authService";

type Role = "ROLE_GESTIONNAIRE" | "ROLE_CHAUFFEUR";

const FormulairePersonnelsPage: React.FC = () => {
  const navigate = useNavigate();

  // 🔐 Utilisateur connecté (DG ou DA)
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    emailUtilisateur: "",
    telephoneUtilisateur: "",
    motDePasseUtilisateur: "",
    roleUtilisateur: "" as Role | "",
    photoProfilUtilisateur: null as File | null,
    photoCniUtilisateur: null as File | null,
    photoPermisConduireChauffeur: null as File | null,
    idAgence: "",
    idEntreprise: ""
  });

  /* ================= HANDLERS ================= */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field:
      | "photoProfilUtilisateur"
      | "photoCniUtilisateur"
      | "photoPermisConduireChauffeur"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.files?.[0] || null,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   

    try {
      /* ========== 1️⃣ STOCKAGE LOCAL ========= */
      const storedPersonnels = localStorage.getItem("personnelsData");
      const personnelsList = storedPersonnels
        ? JSON.parse(storedPersonnels)
        : [];

      const newPersonnel = {
        nomUtilisateur: formData.nomUtilisateur,
        prenomUtilisateur: formData.prenomUtilisateur,
        emailUtilisateur: formData.emailUtilisateur,
        telephoneUtilisateur: formData.telephoneUtilisateur,
        roleUtilisateur: formData.roleUtilisateur,
        statutCompteUtilisateur: "ACTIVE",
        idAgence: formData.idAgence,
        idEntreprise: formData.idEntreprise,
      };

      personnelsList.push(newPersonnel);
      localStorage.setItem("personnelsData", JSON.stringify(personnelsList));

      /* ========== 2️⃣ BACKEND (FormData) ========= */
      const fd = new FormData();
      fd.append("nomUtilisateur", formData.nomUtilisateur);
      fd.append("prenomUtilisateur", formData.prenomUtilisateur);
      fd.append("emailUtilisateur", formData.emailUtilisateur);
      fd.append("telephoneUtilisateur", formData.telephoneUtilisateur);
      fd.append("motDePasse", formData.motDePasseUtilisateur);
      fd.append("role", formData.roleUtilisateur);
      fd.append("idEntreprise", formData.idEntreprise);
      fd.append("idAgence", formData.idAgence);

      if (formData.photoProfilUtilisateur) {
        fd.append("photoProfilUtilisateur", formData.photoProfilUtilisateur);
      }

      if (
        formData.roleUtilisateur === "ROLE_GESTIONNAIRE" &&
        formData.photoCniUtilisateur
      ) {
        fd.append("photoCniUtilisateur", formData.photoCniUtilisateur);
      }

      if (
        formData.roleUtilisateur === "ROLE_CHAUFFEUR" &&
        formData.photoPermisConduireChauffeur
      ) {
        fd.append(
          "photoPermisConduireChauffeur",
          formData.photoPermisConduireChauffeur
        );
      }

      await registerUser(fd);

      alert("✅ Personnel créé – email de vérification envoyé");

      /* ========== 3️⃣ REDIRECTION ========= */
     
        navigate("/dashboard/da/personnels");

    } catch (error: any) {
      alert(error.response?.data?.message || "Erreur lors de la création");
    }
  };

  const roleDescription = () => {
    switch (formData.roleUtilisateur) {
      case "ROLE_GESTIONNAIRE":
        return "Le gestionnaire administre les opérations quotidiennes.";
      case "ROLE_CHAUFFEUR":
        return "Responsable de la conduite et de la sécurité des passagers.";
      default:
        return "";
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white rounded shadow"
        >
          ← Retour
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Créer un Personnel
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          name="nomUtilisateur"
          placeholder="Nom"
          value={formData.nomUtilisateur}
          onChange={handleInputChange}
          className="p-3 border rounded"
          required
        />

        <input
          name="prenomUtilisateur"
          placeholder="Prénom"
          value={formData.prenomUtilisateur}
          onChange={handleInputChange}
          className="p-3 border rounded"
        />

        <input
          type="email"
          name="emailUtilisateur"
          placeholder="Email"
          value={formData.emailUtilisateur}
          onChange={handleInputChange}
          className="p-3 border rounded"
          required
        />

        <input
          name="telephoneUtilisateur"
          placeholder="Téléphone"
          value={formData.telephoneUtilisateur}
          onChange={handleInputChange}
          className="p-3 border rounded"
        />

        <input
          type="password"
          name="motDePasseUtilisateur"
          placeholder="Mot de passe"
          value={formData.motDePasseUtilisateur}
          onChange={handleInputChange}
          className="p-3 border rounded"
          required
        />
        {/* idEntreprise */}
        <input
          name="idEntreprise"
          placeholder="ID Entreprise"
          value={formData.idEntreprise}
          onChange={handleInputChange}
          className="p-3 border rounded"
          required
        />
        {/* idAgence */}
        <input
          name="idAgence"
          placeholder="ID Agence"
          value={formData.idAgence}
          onChange={handleInputChange}
          className="p-3 border rounded"
          required
        />

        <select
          name="roleUtilisateur"
          value={formData.roleUtilisateur}
          onChange={handleInputChange}
          className="p-3 border rounded"
          required
        >
          <option value="">Sélectionnez un rôle</option>
          <option value="ROLE_GESTIONNAIRE">Gestionnaire</option>
          <option value="ROLE_CHAUFFEUR">Chauffeur</option>
        </select>

        {formData.roleUtilisateur && (
          <p className="italic text-gray-600 md:col-span-2">
            {roleDescription()}
          </p>
        )}

        <input
          type="file"
          onChange={(e) =>
            handleFileChange(e, "photoProfilUtilisateur")
          }
        />

        <input
          type="file"
          onChange={(e) => handleFileChange(e, "photoCniUtilisateur")}
        />

        {formData.roleUtilisateur === "ROLE_CHAUFFEUR" && (
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(e, "photoPermisConduireChauffeur")
            }
          />
        )}

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Créer le personnel
        </button>
      </form>
    </div>
  );
};

export default FormulairePersonnelsPage;
