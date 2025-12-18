import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getEntreprisesDG,
  deleteEntreprise,
  updateEntreprise,
} from "../../../api/authService";

// ==============================
// Définition du type Entreprise
// ==============================
interface Entreprise {
  idEntreprise: number;
  nomEntreprise: string;
  emailEntreprise: string;
  telephone1Entreprise: string;
  telephone2Entreprise?: string;
  siegeSocial?: string;
  deviseEntreprise?: string;
  couleurEntreprise?: string;
  themeEntreprise?: string;
  statutEntreprise?: "activé" | "désactivé";
  logoEntreprise?: string;
  // etc...
}

// ==============================
// Composant
// ==============================
const GestionEntrepriseDg: React.FC = () => {
  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
  const [editData, setEditData] = useState<Partial<Entreprise>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ... ton code continue


  const [popup, setPopup] = useState<{
    type: "edit" | "delete";
    index: number;
  } | null>(null);

  

  const [logoEntreprise, setLogoEntreprise] = useState<File | null>(null);

  // =======================
  // Charger entreprises du DG
  // =======================
  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const res = await getEntreprisesDG();
        setEntreprises(res.data);
      } catch {
        setError("Impossible de charger vos entreprises.");
      } finally {
        setLoading(false);
      }
    };
    fetchEntreprises();
  }, []);

  // =======================
  // MODIFIER
  // =======================
  const handleEdit = (index: number) => {
    setEditData({ ...entreprises[index] });
    setLogoEntreprise(null);
    setPopup({ type: "edit", index });
  };

  const handleEditChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  setEditData({
    ...editData,
    [e.target.name]: e.target.value,
  });
};


  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoEntreprise(e.target.files[0]);
    }
  };

  const submitEdit = async () => {
  if (!popup) return;

  try {
    const formData = new FormData();

    // ✅ Convertir les données en JSON Blob pour Spring @RequestPart
    const entrepriseBlob = new Blob(
      [JSON.stringify({
        nomEntreprise: editData.nomEntreprise,
        emailEntreprise: editData.emailEntreprise,
        telephone1Entreprise: editData.telephone1Entreprise,
        telephone2Entreprise: editData.telephone2Entreprise,
        siegeSocial: editData.siegeSocial,
        themeEntreprise: editData.themeEntreprise,
        couleurEntreprise: editData.couleurEntreprise,
        methodePaiement: editData.methodePaiement || "CASH",
        deviseEntreprise: editData.deviseEntreprise,
        statutEntreprise: editData.statutEntreprise,
        idDirecteurGeneral: editData.idDirecteurGeneral, // si tu gères le DG
      })],
      { type: "application/json" }
    );

    formData.append("entrepriseData", entrepriseBlob);

    // ⚠️ Ajouter le logo seulement s’il existe
    if (logoEntreprise) {
      formData.append("logoEntreprise", logoEntreprise);
    }

    // Appel API
    const res = await updateEntreprise(editData.idEntreprise, formData);
    localStorage.setItem("entrepriseData", JSON.stringify(res.data));
    window.location.reload();
    // Mise à jour du state
    setEntreprises((prev) =>
      prev.map((ent, i) =>
        i === popup.index ? res.data : ent
      )
    );

    setPopup(null);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la modification de l'entreprise.");
  }
 };


  // =======================
  // SUPPRIMER
  // =======================
  const handleDelete = (index: number) => {
    setPopup({ type: "delete", index });
  };

  const confirmDelete = async () => {
    if (!popup) return;

    const entreprise = entreprises[popup.index];

    try {
      await deleteEntreprise(entreprise.idEntreprise);
      setEntreprises((prev) =>
        prev.filter((_, i) => i !== popup.index)
      );
    } catch {
      alert("Erreur lors de la suppression.");
    } finally {
      setPopup(null);
    }
  };

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">
        Gestion des Entreprises
      </h1>
      {/* =======================
          BOUTON CREER ENTREPRISE
          (uniquement si aucune entreprise)
      ======================= */}
      {entreprises.length === 0 && (
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Aucune entreprise trouvée
            </h2>
            <p className="text-gray-600 mb-4">
              Vous devez créer votre entreprise avant de pouvoir gérer des agences.
            </p>
            <button
              onClick={() => navigate("/create-entreprise")}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <FaPlus />
              Créer une entreprise
            </button>
          </div>
        </div>
      )}

      {/* =======================
          LISTE ENTREPRISES
      ======================= */}
      <div className="grid grid-cols-1 gap-8">
        {entreprises.map((entreprise, index) => (
          <div
            key={entreprise.idEntreprise}
            className="bg-white shadow-xl rounded-2xl p-8"
          >
            <div className="flex items-center gap-6 mb-6">
              <img
                src={entreprise.logoEntreprise || entreprise.image1Entreprise || "/logo-placeholder.png"}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold text-blue-800">
                  {entreprise.nomEntreprise}
                </h2>
                <p className="text-gray-600">
                  {entreprise.siegeSocial}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6 text-blue-700">
              <p><strong>Email :</strong> {entreprise.emailEntreprise}</p>
              <p><strong>Téléphone 1 :</strong> {entreprise.telephone1Entreprise}</p>
              <p><strong>Téléphone 2 :</strong> {entreprise.telephone2Entreprise}</p>
              <p><strong>Devise :</strong> {entreprise.deviseEntreprise}</p>
              <p><strong>Statut :</strong> {entreprise.statutEntreprise}</p>
              <p><strong>Siege Social :</strong> {entreprise.siegeSocial}</p>
            </div>
            
             {/* Sous-cartes avec infos DG */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-lg">Nombre d'agences</p>
                    <p className="text-2xl font-bold text-blue-700">{entreprise.nombreAgences || 5}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-lg">Nombre de Bus</p>
                    <p className="text-2xl font-bold text-green-700">{entreprise.nombreBus || 12}</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-lg">Nombre de Gestionnaires et Chauffeurs</p>
                    <p className="text-2xl font-bold text-purple-700">{entreprise.nombreChauffeurs || 20}</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-lg">Nombre Directeurs d'agence</p>
                    <p className="text-2xl font-bold text-yellow-700">{entreprise.nombreDirecteursAgence || 5}</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-lg">Revenu Mensuel</p>
                    <p className="text-2xl font-bold text-pink-700">{entreprise.revenuMensuel || 2500000} {entreprise.deviseEntreprise || "XAF"}</p>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-lg">Revenu Annuel</p>
                    <p className="text-2xl font-bold text-orange-700">{entreprise.revenuAnnuel || 30000000} {entreprise.deviseEntreprise || "XAF"}</p>
                  </div>
                </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg flex gap-2"
              >
                <FaEdit /> Modifier
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex gap-2"
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

     {/* ================= POPUP EDIT ================= */}
      {popup?.type === "edit" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 relative">

            {/* Header */}
            <div className="col-span-1 md:col-span-2 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-blue-700">
                Modifier l'entreprise
              </h2>
              <FaTimes
                className="cursor-pointer text-xl"
                onClick={() => setPopup(null)}
              />
            </div>

            {/* Nom entreprise */}
            <div>
              <label className="block font-medium mb-2">Nom de l'entreprise</label>
              <input
                type="text"
                name="nomEntreprise"
                value={editData.nomEntreprise || ""}
                onChange={handleEditChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Logo entreprise */}
            <div>
              <label className="block font-medium mb-2">Logo de l'entreprise</label>
              <input
                type="file"
                onChange={handleLogoChange}
                className="w-full p-3 border rounded-lg"
                accept="image/*"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="emailEntreprise"
                value={editData.emailEntreprise || ""}
                onChange={handleEditChange}
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
                value={editData.telephone1Entreprise || ""}
                onChange={handleEditChange}
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
                value={editData.telephone2Entreprise || ""}
                onChange={handleEditChange}
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
                value={editData.siegeSocial || ""}
                onChange={handleEditChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Devise */}
            <div>
              <label className="block font-medium mb-2">Devise</label>
              <select
                name="deviseEntreprise"
                value={editData.deviseEntreprise || "XAF"}
                onChange={handleEditChange}
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
                value={editData.couleurEntreprise || ""}
                onChange={handleEditChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choisir --</option>
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
                value={editData.themeEntreprise || ""}
                onChange={handleEditChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choisir --</option>
                <option value="THEME_1">Thème 1</option>
                <option value="THEME_2">Thème 2</option>
                <option value="THEME_3">Thème 3</option>
              </select>
            </div>


            {/* Actions */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
              <button
                onClick={() => setPopup(null)}
                className="px-6 py-3 bg-gray-300 rounded-lg font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={submitEdit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Enregistrer les modifications
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ================= POPUP DELETE ================= */}
      {popup?.type === "delete" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Supprimer l'entreprise
            </h2>
            <h2 className="text-xl text-red-600 font-bold mb-4">
              Attention !  Cette action est irreverssible et supprimera toutes vos agences associées.
            </h2>
            <p>
              Supprimer <strong>{entreprises[popup.index].nomEntreprise}</strong> ?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setPopup(null)} className="bg-gray-300 px-4 py-2 rounded">
                Annuler
              </button>
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEntrepriseDg;
