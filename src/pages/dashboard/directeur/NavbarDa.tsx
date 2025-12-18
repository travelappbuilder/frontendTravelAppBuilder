import React, { useEffect, useState } from "react";

const NavbarDa: React.FC = () => {
  const [daData, setDaData] = useState<any>(null);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [agenceData, setAgenceData] = useState<any>(null);

  useEffect(() => {
    // ✅ Lecture des données après vérification email
    const storedDa = localStorage.getItem("personnelData");
    const storedEntreprise = localStorage.getItem("entrepriseData");
    const storedAgence = localStorage.getItem("agenceData");

    if (storedDa) {
      try {
        const parsed = JSON.parse(storedDa);

        // 🔐 Sécurité : uniquement DA
        if (parsed.roleUtilisateur !== "ROLE_DIRECTEUR") return;

        setDaData(parsed);
      } catch (e) {
        console.error("Erreur parsing personnelData:", e);
        setDaData(null);
      }
    }

    if (storedEntreprise) setEntrepriseData(JSON.parse(storedEntreprise));
    if (storedAgence) setAgenceData(JSON.parse(storedAgence));
  }, []);

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0">
      {/* Entreprise */}
      <div className="flex items-center space-x-4">
        {entrepriseData && (
          <>
            <img
              src={entrepriseData.logoEntreprise || "/logo.png"}
              className="w-10 h-10 rounded-full"
              alt="Logo entreprise"
            />
            <div>
              <h1 className="text-lg font-bold">{entrepriseData.nomEntreprise}</h1>
              <p className="text-sm text-gray-500">
                {agenceData?.nomAgence || "Agence inconnue"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Lien Home */}
      <div>
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>
      </div>

      {/* DA connecté + notification */}
      <div className="flex items-center space-x-3">
        {/* Notification */}
        <button className="text-blue-900 text-xl">🔔</button>

        {daData && (
          <div className="flex items-center gap-2">
            <p className="text-blue-700 font-medium">
              DA-{daData.nomUtilisateur}-Connecté
            </p>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={daData.photoProfilUtilisateur || "/profile.png"}
                className="w-full h-full object-cover"
                alt="Profil DA"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarDa;
