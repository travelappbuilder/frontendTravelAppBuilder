import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { register as registerUser } from "../../../api/authService";

interface Personnel {
  idUtilisateur: string;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  emailUtilisateur: string;
  telephoneUtilisateur: string;
  roleUtilisateur?: string;
  statutCompteUtilisateur: string;
  idAgence?: string;
  idEntreprise: string;
  photoProfilUtilisateur?: string;
}

const GestionPersonnelsDg: React.FC = () => {
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [personnels, setPersonnels] = useState<Personnel[]>([]);
  const [showForm, setShowForm] = useState(false);

  /* 🔍 filtres */
  const [searchAgence, setSearchAgence] = useState("");
  const [searchDirecteur, setSearchDirecteur] = useState("");

  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    emailUtilisateur: "",
    telephoneUtilisateur: "",
    motDePasseUtilisateur: "",
    roleUtilisateur: "ROLE_DIRECTEUR",
    idEntreprise: "",
    idAgence: "",
    photoProfilUtilisateur: null as File | null,
    photoCniUtilisateur: null as File | null,
    photoPermisConduireChauffeur: null as File | null,
  });

  /* ================= INIT ================= */
  useEffect(() => {
    const ent = localStorage.getItem("entrepriseData");
    if (ent) {
      const parsed = JSON.parse(ent);
      setEntrepriseData(parsed);
      setFormData((prev) => ({
        ...prev,
        idEntreprise: parsed.idEntreprise,
      }));
    }

    const pers = localStorage.getItem("personnelsData");
    if (pers) setPersonnels(JSON.parse(pers));
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (
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

  /* ================= CREATE ================= */
  const handleCreatePersonnel = async () => {
    try {
      /* 1️⃣ stockage local immédiat */
      const nouveauPersonnel: Personnel = {
        idUtilisateur: `TMP-${Date.now()}`,
        nomUtilisateur: formData.nomUtilisateur,
        prenomUtilisateur: formData.prenomUtilisateur,
        emailUtilisateur: formData.emailUtilisateur,
        telephoneUtilisateur: formData.telephoneUtilisateur,
        roleUtilisateur: formData.roleUtilisateur,
        statutCompteUtilisateur: "ACTIVE",
        idEntreprise: formData.idEntreprise,
        idAgence: formData.idAgence,
      };

      const updated = [...personnels, nouveauPersonnel];
      setPersonnels(updated);
      localStorage.setItem("personnelsData", JSON.stringify(updated));
      setShowForm(false);

      /* 2️⃣ backend */
      const fd = new FormData();
      fd.append("nomUtilisateur", formData.nomUtilisateur);
      fd.append("prenomUtilisateur", formData.prenomUtilisateur);
      fd.append("emailUtilisateur", formData.emailUtilisateur);
      fd.append("telephoneUtilisateur", formData.telephoneUtilisateur);
      fd.append("motDePasse", formData.motDePasseUtilisateur);
      fd.append("role", formData.roleUtilisateur);
      fd.append("idEntreprise", formData.idEntreprise);
      fd.append("idAgence", formData.idAgence);

      if (formData.photoProfilUtilisateur)
        fd.append("photoProfilUtilisateur", formData.photoProfilUtilisateur);

      if (
        formData.roleUtilisateur === "ROLE_DIRECTEUR" &&
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

      alert("✅ Personnel créé – email envoyé");
    } catch (error: any) {
      alert(error.response?.data?.message || "Erreur création personnel");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = (index: number) => {
    if (!window.confirm("Supprimer ce personnel ?")) return;
    const updated = [...personnels];
    updated.splice(index, 1);
    setPersonnels(updated);
    localStorage.setItem("personnelsData", JSON.stringify(updated));
  };

  /* ================= FILTRE + GROUP ================= */
  const personnelsFiltres = personnels.filter((p) => {
    const agenceOk =
      p.idAgence?.toLowerCase().includes(searchAgence.toLowerCase()) ?? true;

    const directeurOk = `${p.nomUtilisateur} ${p.prenomUtilisateur} ${p.emailUtilisateur}`
      .toLowerCase()
      .includes(searchDirecteur.toLowerCase());

    return agenceOk && directeurOk;
  });

  const personnelsGroupes = personnelsFiltres.reduce((acc: any, p) => {
    const agence = p.idAgence || "Agence non définie";
    const role = p.roleUtilisateur || "ROLE_INCONNU";

    if (!acc[agence]) acc[agence] = {};
    if (!acc[agence][role]) acc[agence][role] = [];
    acc[agence][role].push(p);

    return acc;
  }, {});

  /* ================= RENDER ================= */
  return (
    <div className="p-6 bg-white rounded shadow min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des Personnels</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Créer un personnel
        </button>
      </div>

      {/* ================= FORM (BIEN PRÉSENT) ================= */}
      {showForm && (
        <div className="mb-8 p-4 border rounded bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="nomUtilisateur" value={formData.nomUtilisateur} onChange={handleChange} placeholder="Nom" className="p-2 border rounded" />
            <input name="prenomUtilisateur" value={formData.prenomUtilisateur} onChange={handleChange} placeholder="Prénom" className="p-2 border rounded" />
            <input name="emailUtilisateur" value={formData.emailUtilisateur} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />
            <input name="telephoneUtilisateur" value={formData.telephoneUtilisateur} onChange={handleChange} placeholder="Téléphone" className="p-2 border rounded" />
            <input type="password" name="motDePasseUtilisateur" value={formData.motDePasseUtilisateur} onChange={handleChange} placeholder="Mot de passe" className="p-2 border rounded" />

            <select name="roleUtilisateur" value={formData.roleUtilisateur} onChange={handleChange} className="p-2 border rounded">
              <option value="ROLE_DIRECTEUR">Directeur</option>
              <option value="ROLE_GESTIONNAIRE">Gestionnaire</option>
              <option value="ROLE_CHAUFFEUR">Chauffeur</option>
            </select>

            <input name="idAgence" value={formData.idAgence} onChange={handleChange} placeholder="ID Agence" className="p-2 border rounded" />

            <input title="photo profil du personnel" type="file" onChange={(e) => handleFileChange(e, "photoProfilUtilisateur")} />
            <input title="photo CNI du personnel" type="file" onChange={(e) => handleFileChange(e, "photoCniUtilisateur")} />

            {formData.roleUtilisateur === "ROLE_CHAUFFEUR" && (
              <input title="photo permis de conduire du chauffeur" type="file" onChange={(e) => handleFileChange(e, "photoPermisConduireChauffeur")} />
            )}

            <button
              onClick={handleCreatePersonnel}
              className="md:col-span-2 bg-green-600 text-white py-2 rounded"
            >
              Créer
            </button>
          </div>
        </div>
      )}

      {/* ================= FILTRES ================= */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Recherche par agence"
          value={searchAgence}
          onChange={(e) => setSearchAgence(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          placeholder="Recherche par nom"
          value={searchDirecteur}
          onChange={(e) => setSearchDirecteur(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* ================= LISTE ================= */}
      <div className="space-y-10">
        {Object.keys(personnelsGroupes).map((agenceId) => (
          <div key={agenceId} className="relative pl-6">
            <div className="absolute left-1 top-0 bottom-0 w-1 bg-blue-600"></div>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Agence : {agenceId}
            </h2>

            {Object.keys(personnelsGroupes[agenceId]).map((role) => (
              <div key={role} className="mb-6">
                <h3 className="text-lg font-semibold text-green-700 mb-3">
                  {(role ?? "").replace("ROLE_", "")}
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {personnelsGroupes[agenceId][role].map((p: Personnel) => (
                    <div key={p.idUtilisateur} className="p-4 border rounded shadow">
                      <p className="font-bold">
                        {p.nomUtilisateur} {p.prenomUtilisateur}
                      </p>
                      <p className="text-sm">{p.emailUtilisateur}</p>
                      <p className="text-sm">{p.telephoneUtilisateur}</p>

                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => handleDelete(personnels.indexOf(p))}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionPersonnelsDg;
