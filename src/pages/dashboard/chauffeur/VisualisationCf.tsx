import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* =======================
   UTILITAIRES
======================= */

// Générateur réaliste Cameroun
const randomCameroonPosition = () => ({
  latitude: 2 + Math.random() * 9,
  longitude: 9 + Math.random() * 6,
});

/* =======================
   ICONES
======================= */

const entrepriseIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

const agenceIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684831.png",
  iconSize: [35, 35],
});

/* =======================
   POLYLINE RESPONSIVE AU ZOOM
======================= */

interface ZoomPolylineProps {
  positions: [number, number][];
}

const ZoomResponsivePolyline: React.FC<ZoomPolylineProps> = ({ positions }) => {
  const map = useMap();
  const [weight, setWeight] = useState<number>(2);

  useEffect(() => {
    const updateWeight = () => {
      setWeight(map.getZoom());
    };

    map.on("zoom", updateWeight);

    // ✅ cleanup doit retourner void
    return () => {
      map.off("zoom", updateWeight);
    };
  }, [map]);

  return <Polyline positions={positions} color="red" weight={weight} />;
};

/* =======================
   TYPES DONNEES
======================= */

interface Entreprise {
  nomEntreprise: string;
  latitude: number;
  longitude: number;
}

interface Agence {
  nomAgence: string;
  adresseAgence?: string;
  latitude: number;
  longitude: number;
}

/* =======================
   COMPOSANT PRINCIPAL
======================= */

const VisualisationCf: React.FC = () => {
  const [entrepriseData, setEntrepriseData] = useState<Entreprise | null>(null);
  const [agences, setAgences] = useState<Agence[]>([]);

  useEffect(() => {
    const storedEntreprise = localStorage.getItem("entrepriseData");
    const storedAgences = localStorage.getItem("agencesData");

    let entreprise: Entreprise | null = storedEntreprise
      ? JSON.parse(storedEntreprise)
      : null;

    let agencesList: Agence[] = storedAgences
      ? JSON.parse(storedAgences)
      : [];

    // 🔥 Assurer une position entreprise
    if (entreprise && (!entreprise.latitude || !entreprise.longitude)) {
      const pos = randomCameroonPosition();
      entreprise = { ...entreprise, ...pos };
      localStorage.setItem("entrepriseData", JSON.stringify(entreprise));
    }

    // 🔥 Assurer une position pour chaque agence
    agencesList = agencesList.map((ag) => {
      if (!ag.latitude || !ag.longitude) {
        const pos = randomCameroonPosition();
        return { ...ag, ...pos };
      }
      return ag;
    });

    localStorage.setItem("agencesData", JSON.stringify(agencesList));

    setEntrepriseData(entreprise);
    setAgences(agencesList);
  }, []);

  if (!entrepriseData) {
    return <p className="p-4">Chargement des données…</p>;
  }

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Visualisation</h1>

      <div className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[entrepriseData.latitude, entrepriseData.longitude]}
          zoom={7}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* 🏢 Entreprise */}
          <Marker
            position={[entrepriseData.latitude, entrepriseData.longitude]}
            icon={entrepriseIcon}
          >
            <Popup>
              <b>{entrepriseData.nomEntreprise}</b>
              <br />
              Siège de l’entreprise
            </Popup>
          </Marker>

          {/* 🏬 Agences + liaisons */}
          {agences.map((ag, index) => (
            <React.Fragment key={index}>
              <Marker
                position={[ag.latitude, ag.longitude]}
                icon={agenceIcon}
              >
                <Popup>
                  <b>{ag.nomAgence}</b>
                  <br />
                  {ag.adresseAgence || "Adresse non définie"}
                </Popup>
              </Marker>

              <ZoomResponsivePolyline
                positions={[
                  [entrepriseData.latitude, entrepriseData.longitude],
                  [ag.latitude, ag.longitude],
                ]}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default VisualisationCf;
