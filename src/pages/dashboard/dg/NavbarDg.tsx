import React, { useEffect, useState } from "react";

const NavbarDg: React.FC = () => {
  const [dgData, setDgData] = useState<any>(null); // Données du DG après vérification
  const [entrepriseData, setEntrepriseData] = useState<any>(null); // Données de l'entreprise

  useEffect(() => {
    // ✅ Lecture des données après vérification email
    const storedDgData = localStorage.getItem("personnelData");
    const storedEntrepriseData = localStorage.getItem("entrepriseData");

    if (storedDgData) {
      try {
        const parsed = JSON.parse(storedDgData);

        // 🔐 Sécurité : uniquement DG
        if (parsed.roleUtilisateur !== "ROLE_DG") return;

        setDgData(parsed);
      } catch (e) {
        console.error("Erreur parsing personnelData:", e);
        setDgData(null);
      }
    }

    if (storedEntrepriseData) {
      setEntrepriseData(JSON.parse(storedEntrepriseData));
    }
  }, []);

  return (
    <header className="bg-white shadow p-4 flex items-center sticky top-0 justify-between">
      <div className="flex items-center space-x-4">
        {entrepriseData && (
          <>
            <img
              src={entrepriseData.logoEntreprise || "/path/to/default-logo.png"}
              alt="Logo Entreprise"
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold">{entrepriseData.nomEntreprise}</h1>
              <p className="text-sm text-gray-500">{entrepriseData.siegeSocial}</p>
            </div>
          </>
        )}
      </div>

      <div>
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification */}
        <button className="text-blue-900 text-xl">🔔</button>

        {/* Profil DG */}
        {dgData && (
          <div className="flex items-center gap-2">
            <p className="text-blue-700 font-medium">
              DG-{dgData.nomUtilisateur}-Connecté
            </p>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={dgData.photoProfilUtilisateur || "/path/to/default-profile.png"}
                alt="Photo Profil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarDg;
