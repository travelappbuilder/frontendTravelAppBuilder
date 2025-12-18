import React, { useEffect, useState } from "react";

const NavbarCf: React.FC = () => {
  const [cfData, setCfData] = useState<any>(null);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [agenceData, setAgenceData] = useState<any>(null);
  const [notifCount, setNotifCount] = useState<number>(0);

  useEffect(() => {
    // ✅ Récupération des données après vérification d’email
    const storedCf = localStorage.getItem("personnelData");
    const storedEntreprise = localStorage.getItem("entrepriseData");
    const storedAgence = localStorage.getItem("agenceData");
    const storedNotif = localStorage.getItem("notificationsData");

    if (storedCf) {
      try {
        const parsed = JSON.parse(storedCf);
        if (parsed.roleUtilisateur === "ROLE_CHAUFFEUR") setCfData(parsed);
      } catch (e) {
        console.error("Erreur parsing personnelData:", e);
        setCfData(null);
      }
    }

    if (storedEntreprise) setEntrepriseData(JSON.parse(storedEntreprise));
    if (storedAgence) setAgenceData(JSON.parse(storedAgence));

    if (storedNotif) {
      const notifs = JSON.parse(storedNotif);
      const unread = notifs.filter((n: any) => !n.lu).length;
      setNotifCount(unread);
    }
  }, []);

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      {/* Entreprise */}
      <div className="flex items-center space-x-4">
        {entrepriseData && (
          <>
            <img
              src={entrepriseData.logoEntreprise || "/logo.png"}
              className="w-10 h-10 rounded-full"
              alt="Logo Entreprise"
            />
            <div>
              <h1 className="text-lg font-bold">{entrepriseData.nomEntreprise}</h1>
              <p className="text-sm text-gray-500">{agenceData?.nomAgence || "Agence inconnue"}</p>
            </div>
          </>
        )}
      </div>

      {/* Home */}
      <div>
        <a href="/" className="text-blue-600 hover:underline">Home</a>
      </div>

      {/* Droite : Notification + Profil */}
      <div className="flex items-center space-x-6">
        {/* 🔔 Notification */}
        <div className="relative cursor-pointer">
          <span className="text-2xl">🔔</span>
          {notifCount > 0 && (
            <span className="
              absolute -top-1 -right-2
              bg-red-600 text-white text-xs
              w-5 h-5 flex items-center justify-center
              rounded-full shadow
            ">
              {notifCount}
            </span>
          )}
        </div>

        {/* Utilisateur connecté */}
        {cfData && (
          <div className="flex items-center space-x-3">
            <p className="text-blue-700 font-medium">
              Cf-{cfData.nomUtilisateur}-Connecté
            </p>
            <img
              src={cfData.photoProfilUtilisateur || "/user.png"}
              className="w-10 h-10 rounded-full"
              alt="Profil Chauffeur"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarCf;
