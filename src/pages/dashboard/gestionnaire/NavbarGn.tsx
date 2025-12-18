import React, { useEffect, useState } from "react";

interface NavbarProps {
  setActiveContent?: (value: string) => void;
  notifCount?: number;
  updateNotifCount?: (count: number) => void;
}

const NavbarGn: React.FC<NavbarProps> = ({ setActiveContent, notifCount, updateNotifCount }) => {
  const [gnData, setGnData] = useState<any>(null);
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [agenceData, setAgenceData] = useState<any>(null);
  const [localNotifCount, setLocalNotifCount] = useState<number>(notifCount || 0);

  useEffect(() => {
    // ✅ Données après vérification email
    const storedGn = localStorage.getItem("personnelData");
    const storedEntreprise = localStorage.getItem("entrepriseData");
    const storedAgence = localStorage.getItem("agenceData");
    const storedNotif = localStorage.getItem("notificationsData");

    if (storedGn) {
      try {
        const parsed = JSON.parse(storedGn);
        // 🔐 Sécurité : uniquement gestionnaire
        if (parsed.roleUtilisateur === "ROLE_GESTIONNAIRE") setGnData(parsed);
      } catch (e) {
        console.error("Erreur parsing personnelData:", e);
        setGnData(null);
      }
    }

    if (storedEntreprise) setEntrepriseData(JSON.parse(storedEntreprise));
    if (storedAgence) setAgenceData(JSON.parse(storedAgence));

    if (storedNotif) {
      const notifs = JSON.parse(storedNotif);
      const unread = notifs.filter((n: any) => !n.lu).length;
      setLocalNotifCount(unread);
      if (updateNotifCount) updateNotifCount(unread);
    }
  }, []);

  const handleNotifUpdate = (count: number) => {
    setLocalNotifCount(count);
    if (updateNotifCount) updateNotifCount(count);
  };

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      {/* ENTREPRISE */}
      <div className="flex items-center space-x-4">
        {entrepriseData && (
          <>
            <img
              src={entrepriseData.logoEntreprise || "/logo.png"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold">{entrepriseData.nomEntreprise}</h1>
              <p className="text-sm text-gray-500">{agenceData?.nomAgence || "Agence inconnue"}</p>
            </div>
          </>
        )}
      </div>

      {/* HOME */}
      <div>
        <a href="/" className="text-blue-600 hover:underline">Home</a>
      </div>

      {/* DROITE : NOTIF + UTILISATEUR */}
      <div className="flex items-center space-x-6">
        {/* 🔔 NOTIFICATION ICON */}
        <div
          className="relative cursor-pointer"
          onClick={() => setActiveContent && setActiveContent("notifications")}
        >
          <span className="text-2xl">🔔</span>
          {localNotifCount > 0 && (
            <span className="
              absolute -top-1 -right-2
              bg-red-600 text-white text-xs
              w-5 h-5 flex items-center justify-center
              rounded-full shadow
            ">
              {localNotifCount}
            </span>
          )}
        </div>

        {/* UTILISATEUR CONNECTÉ */}
        {gnData && (
          <div className="flex items-center space-x-3">
            <p className="text-blue-700 font-medium">
              Gn-{gnData.nomUtilisateur}-Connecté
            </p>
            <img
              src={gnData.photoProfilUtilisateur || "/user.png"}
              className="w-10 h-10 rounded-full border"
              alt="Profil Gestionnaire"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarGn;
