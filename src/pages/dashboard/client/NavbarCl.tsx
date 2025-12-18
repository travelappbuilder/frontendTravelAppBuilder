import React, { useEffect, useState } from "react";

interface Client {
  nomUtilisateur?: string;
  prenomUtilisateur?: string;
  photoProfilUtilisateur?: string;
  roleUtilisateur?: string;
}

const NavbarCl: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    // ✅ Lecture des données après vérification email
    const storedClient = localStorage.getItem("personnelData");

    if (!storedClient) return;

    try {
      const parsed = JSON.parse(storedClient);

      // 🔐 Sécurité : uniquement client
      if (parsed.roleUtilisateur !== "ROLE_CLIENT") return;

      setClient(parsed);
    } catch (e) {
      console.error("Erreur parsing personnelData:", e);
      setClient(null);
    }
  }, []);

  // Initiales fallback
  const getInitials = () => {
    if (!client) return "CL";
    const first = client.prenomUtilisateur?.charAt(0).toUpperCase() || "";
    const last = client.nomUtilisateur?.charAt(0).toUpperCase() || "";
    return first + last || "CL";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-6 h-16">
      <h1 className="text-xl font-bold text-blue-900">Espace {client?.prenomUtilisateur || "Client"}</h1>

      <div>
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Recherche un trajet..."
          className="border px-3 py-1 rounded-lg w-64"
        />

        <button className="text-blue-900 text-xl">🔔</button>

        {/* Profil */}
        <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold cursor-pointer overflow-hidden">
          {client?.photoProfilUtilisateur ? (
            <img
              src={client.photoProfilUtilisateur}
              alt="Profil"
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials()
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarCl;
