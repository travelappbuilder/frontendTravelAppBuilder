import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ParametreDg: React.FC = () => {
  const [dgData, setDgData] = useState<any>(null);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);

  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    emailUtilisateur: "",
    telephoneUtilisateur: "",
    motDePasseUtilisateur: "",
    photoProfilUtilisateur: null as string | File | null,
  });

  // 🔹 Récupération DG / PDG connecté
  useEffect(() => {
    // Entreprise
    const storedEntrepriseData = localStorage.getItem("entrepriseData");
    if (storedEntrepriseData) {
      setEntrepriseData(JSON.parse(storedEntrepriseData));
    }

    // Utilisateur connecté (DG ou PDG)
    const storedPersonnel = localStorage.getItem("personnelData");
    if (storedPersonnel) {
      const parsed = JSON.parse(storedPersonnel);

      if (
        parsed.roleUtilisateur === "ROLE_DG" ||
        parsed.roleUtilisateur === "ROLE_PDG"
      ) {
        setDgData(parsed);
        setFormData({
          nomUtilisateur: parsed.nomUtilisateur || "",
          prenomUtilisateur: parsed.prenomUtilisateur || "",
          emailUtilisateur: parsed.emailUtilisateur || "",
          telephoneUtilisateur: parsed.telephoneUtilisateur || "",
          motDePasseUtilisateur: "",
          photoProfilUtilisateur: parsed.photoProfilUtilisateur || null,
        });
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, photoProfilUtilisateur: files[0] });
    }
  };

  const handleUpdate = () => {
    if (!dgData) return;

    if (window.confirm("Voulez-vous vraiment mettre à jour vos informations ?")) {
      const updatedData = {
        ...dgData,
        nomUtilisateur: formData.nomUtilisateur,
        prenomUtilisateur: formData.prenomUtilisateur,
        emailUtilisateur: formData.emailUtilisateur,
        telephoneUtilisateur: formData.telephoneUtilisateur,
        motDePasseUtilisateur:
          formData.motDePasseUtilisateur || dgData.motDePasseUtilisateur,
        photoProfilUtilisateur: formData.photoProfilUtilisateur
          ? URL.createObjectURL(formData.photoProfilUtilisateur)
          : dgData.photoProfilUtilisateur,
      };

      localStorage.setItem("personnelData", JSON.stringify(updatedData));
      setDgData(updatedData);

      alert("Vos informations ont été mises à jour !");
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible."
      )
    ) {
      localStorage.removeItem("personnelData");
      alert("Votre compte a été supprimé !");
      window.location.href = "/";
    }
  };

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
      {/* Filigrane entreprise */}
      {entrepriseData && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
          <svg width="600" height="620">
            <defs>
              <path id="curve" d="M 50 400 A 250 250 0 0 1 450 400" />
            </defs>
            <text
              fill="rgba(207, 226, 202, 0.3)"
              fontSize="65"
              fontWeight="bold"
              textAnchor="middle"
            >
              <textPath href="#curve" startOffset="50%">
                {entrepriseData.nomEntreprise}
              </textPath>
            </text>
          </svg>
        </div>
      )}

      <div className="relative">
        <h2 className="text-2xl font-bold mb-6">
          Paramètres du compte DG / PDG
        </h2>

        {dgData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Nom</label>
              <input
                type="text"
                name="nomUtilisateur"
                value={formData.nomUtilisateur}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Prénom</label>
              <input
                type="text"
                name="prenomUtilisateur"
                value={formData.prenomUtilisateur}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="emailUtilisateur"
                value={formData.emailUtilisateur}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Téléphone</label>
              <input
                type="text"
                name="telephoneUtilisateur"
                value={formData.telephoneUtilisateur}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                name="motDePasseUtilisateur"
                value={formData.motDePasseUtilisateur}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Photo de profil</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg"
              >
                <FaEdit /> Modifier
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">
            Aucune donnée DG / PDG trouvée.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParametreDg;
