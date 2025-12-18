import React, { useEffect, useState } from "react";

interface Personnel {
  nomUtilisateur: string;
  prenomUtilisateur: string;
  emailUtilisateur: string;
  telephoneUtilisateur: string;
  motDePasseUtilisateur: string;
  roleUtilisateur: string;
  photoProfilUtilisateur?: string;
}

const ParametreDa: React.FC = () => {
  const [personnelData, setPersonnelData] = useState<Personnel | null>(null);

  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    emailUtilisateur: "",
    telephoneUtilisateur: "",
    motDePasseUtilisateur: "",
    photoProfilUtilisateur: null as File | null,
  });

  useEffect(() => {
    const storedPersonnels = localStorage.getItem("personnelsData");
    if (!storedPersonnels) return;

    const personnelsList: Personnel[] = JSON.parse(storedPersonnels);

    const directeur = personnelsList.find(
      (p) => p.roleUtilisateur === "ROLE_DIRECTEUR"
    );

    if (directeur) {
      setPersonnelData(directeur);
      setFormData({
        nomUtilisateur: directeur.nomUtilisateur || "",
        prenomUtilisateur: directeur.prenomUtilisateur || "",
        emailUtilisateur: directeur.emailUtilisateur || "",
        telephoneUtilisateur: directeur.telephoneUtilisateur || "",
        motDePasseUtilisateur: directeur.motDePasseUtilisateur || "",
        photoProfilUtilisateur: null,
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photoProfilUtilisateur: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedPersonnels = localStorage.getItem("personnelsData");
    if (!storedPersonnels) return;

    const personnelsList: Personnel[] = JSON.parse(storedPersonnels);

    const updatedList = personnelsList.map((p) => {
      if (p.roleUtilisateur === "ROLE_DIRECTEUR") {
        return {
          ...p,
          nomUtilisateur: formData.nomUtilisateur,
          prenomUtilisateur: formData.prenomUtilisateur,
          emailUtilisateur: formData.emailUtilisateur,
          telephoneUtilisateur: formData.telephoneUtilisateur,
          motDePasseUtilisateur: formData.motDePasseUtilisateur,
          photoProfilUtilisateur: formData.photoProfilUtilisateur
            ? URL.createObjectURL(formData.photoProfilUtilisateur)
            : p.photoProfilUtilisateur,
        };
      }
      return p;
    });

    localStorage.setItem("personnelsData", JSON.stringify(updatedList));
    alert("Paramètres du Directeur mis à jour avec succès !");
  };

  return (
    <div className="relative p-6 bg-white shadow rounded-lg min-h-screen">
      {/* Filigrane */}
      {personnelData && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
          <svg width="600" height="620">
            <defs>
              <path id="curve" d="M 50 400 A 250 250 0 0 1 450 400" />
            </defs>
            <text
              fill="rgba(207,226,202,0.3)"
              fontSize="65"
              fontWeight="bold"
              textAnchor="middle"
            >
              <textPath href="#curve" startOffset="50%">
                {personnelData.nomUtilisateur}
              </textPath>
            </text>
          </svg>
        </div>
      )}

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Paramètres du Directeur d’Agence
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-semibold mb-2">Nom</label>
          <input
            type="text"
            name="nomUtilisateur"
            value={formData.nomUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Prénom</label>
          <input
            type="text"
            name="prenomUtilisateur"
            value={formData.prenomUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            name="emailUtilisateur"
            value={formData.emailUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Téléphone</label>
          <input
            type="text"
            name="telephoneUtilisateur"
            value={formData.telephoneUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Mot de passe</label>
          <input
            type="password"
            name="motDePasseUtilisateur"
            value={formData.motDePasseUtilisateur}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Photo de profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParametreDa;
