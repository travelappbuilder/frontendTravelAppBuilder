import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icône agence standard
const agenceIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684831.png",
  iconSize: [35, 35],
});

// Icône spéciale pour l’agence du directeur
const directeurIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

// Position par défaut (centre Cameroun)
const DEFAULT_CENTER: [number, number] = [4.0, 9.0];

// Calcul du centre de la carte
const computeCenter = (agences: any[]) => {
  if (!agences.length) return DEFAULT_CENTER;

  const lat = agences.reduce((s, a) => s + a.latitude, 0) / agences.length;
  const lng = agences.reduce((s, a) => s + a.longitude, 0) / agences.length;

  return [lat, lng];
};

const VisualisationCl: React.FC = () => {
  const [agences, setAgences] = useState<any[]>([]);
  const [personnel, setPersonnel] = useState<any>(null);
  const [agenceDA, setAgenceDA] = useState<any>(null);

  // Chargement des données depuis le localStorage
  useEffect(() => {
    const storedAgences = localStorage.getItem("agencesData");
    const storedPersonnel = localStorage.getItem("personnelData");

    if (storedAgences) {
      try {
        const parsed = JSON.parse(storedAgences);
        setAgences(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Erreur parsing agencesData", e);
        setAgences([]);
      }
    }

    if (storedPersonnel) {
      try {
        setPersonnel(JSON.parse(storedPersonnel));
      } catch (e) {
        console.error("Erreur parsing personnelData", e);
        setPersonnel(null);
      }
    }
  }, []);

  // Trouver l’agence du Directeur d’Agence
  useEffect(() => {
    if (personnel && personnel.roleUtilisateur === "ROLE_DIRECTEUR") {
      const da = agences.find((a) => a.nomAgence === personnel.agenceUtilisateur);
      setAgenceDA(da);
    }
  }, [personnel, agences]);

  const center = computeCenter(agences);

  return (
    <div
      className="
        relative 
        p-6 
        bg-white 
        shadow-lg 
        rounded-lg 
        min-h-screen 
        pt-24         /* Décale la carte sous la navbar */
        z-0           /* Laisse la navbar au-dessus */
      "
    >
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Visualisation des agences
      </h1>

      <div className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg z-0">
        <MapContainer
          center={center as [number, number]}
          zoom={7}
          scrollWheelZoom
          style={{
            height: "100%",
            width: "100%",
            zIndex: 0, // IMPORTANT : pour passer sous la navbar
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marqueurs des agences */}
          {agences.map((ag, idx) => (
            <Marker
              key={idx}
              position={[ag.latitude, ag.longitude]}
              icon={
                agenceDA && ag.nomAgence === agenceDA.nomAgence
                  ? directeurIcon
                  : agenceIcon
              }
            >
              <Popup>
                <strong>{ag.nomAgence}</strong>
                <br />
                {ag.adresseAgence}
              </Popup>
            </Marker>
          ))}

          {/* Si aucune agence */}
          {agences.length === 0 && (
            <Marker position={DEFAULT_CENTER} icon={agenceIcon}>
              <Popup>Aucune agence enregistrée.</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default VisualisationCl;
