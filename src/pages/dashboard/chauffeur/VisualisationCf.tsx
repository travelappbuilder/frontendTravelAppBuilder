import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Générateur réaliste Cameroun
const randomCameroonPosition = () => ({
  latitude: 2 + Math.random() * 9,
  longitude: 9 + Math.random() * 6,
});

// Icônes personnalisées
const entrepriseIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});
const agenceIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684831.png",
  iconSize: [35, 35],
});

// Composant pour changer l'épaisseur des lignes selon le zoom
const ZoomResponsivePolyline = ({ positions }: any) => {
  const map = useMap();
  const [weight, setWeight] = useState(2);

  useEffect(() => {
    const updateWeight = () => {
      const zoom = map.getZoom();
      setWeight(zoom); // épaisseur augmente avec zoom
    };

    map.on("zoom", updateWeight);
    return () => map.off("zoom", updateWeight);
  }, [map]);

  return <Polyline positions={positions} color="red" weight={weight} />;
};

const VisualisationCf: React.FC = () => {
  const [entrepriseData, setEntrepriseData] = useState<any>(null);
  const [agences, setAgences] = useState<any[]>([]);

  useEffect(() => {
    const storedEntreprise = localStorage.getItem("entrepriseData");
    const storedAgences = localStorage.getItem("agencesData");

    let entreprise = storedEntreprise ? JSON.parse(storedEntreprise) : null;
    let agencesList = storedAgences ? JSON.parse(storedAgences) : [];

    // 🔥 ASSURE QUE L’ENTREPRISE A UNE POSITION
    if (entreprise && (!entreprise.latitude || !entreprise.longitude)) {
      const pos = randomCameroonPosition();
      entreprise = { ...entreprise, ...pos };
      localStorage.setItem("entrepriseData", JSON.stringify(entreprise));
    }

    // 🔥 ASSURE QUE CHAQUE AGENCE A UNE POSITION
    agencesList = agencesList.map((ag: any) => {
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

  if (!entrepriseData)
    return <p className="p-4">Chargement des données…</p>;

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">

      <h1 className="text-3xl font-bold mb-6">Visualisation</h1>

      <div className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg">

        <MapContainer
          center={[entrepriseData.latitude, entrepriseData.longitude]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marqueur entreprise */}
          <Marker
            position={[entrepriseData.latitude, entrepriseData.longitude]}
            icon={entrepriseIcon}
          >
            <Popup>
              <b>{entrepriseData.nomEntreprise}</b><br />
              Siège de l'entreprise
            </Popup>
          </Marker>

          {/* Marqueurs + flèches des agences */}
          {agences.map((ag, i) => (
            <React.Fragment key={i}>
              <Marker position={[ag.latitude, ag.longitude]} icon={agenceIcon}>
                <Popup>
                  <b>{ag.nomAgence}</b><br />
                  {ag.adresseAgence}
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
