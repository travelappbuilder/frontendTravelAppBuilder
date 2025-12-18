import React, { useState } from "react";

export interface Bus {
  idBus: number;
  idAgence: string;
  identifiantBus: string;
  immatriculationBus: string;
  marqueBus: string;
  modeleBus?: string;
  capaciteBus: number | 80;
  confortBus: "Standard" | "VIP";
  etatBus: "en_service" | "maintenance" | "hors_service";
  kilometrageBus: number;
  placesOccupees?: number[];
}

interface Props {
  bus: Bus;
}

const BusCard: React.FC<Props> = ({ bus }) => {
  const totalPlaces = bus.capaciteBus || 80;
  const seats = Array.from({ length: totalPlaces }, (_, i) => i);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const occupiedSeats = bus.placesOccupees || [];

  const toggleSeat = (index: number) => {
    if (occupiedSeats.includes(index)) return;
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderSeat = (seatIndex: number) => {
    let seatClass =
      "h-10 w-10 rounded border flex items-center justify-center text-sm cursor-pointer select-none";
    let seatTitle = `Siège ${seatIndex + 1}`;

    if (occupiedSeats.includes(seatIndex)) {
      seatClass += " bg-green-500 text-white cursor-not-allowed";
      seatTitle += " (occupé)";
    } else if (selectedSeats.includes(seatIndex)) {
      seatClass += " bg-blue-500 text-white";
      seatTitle += " (sélectionné)";
    } else {
      seatClass += " bg-white text-gray-700 hover:bg-gray-300";
      seatTitle += " (libre)";
    }

    return (
      <div
        key={seatIndex}
        className={seatClass}
        title={seatTitle}
        onClick={() => toggleSeat(seatIndex)}
      >
        {seatIndex + 1}
      </div>
    );
  };

  // Rangées de 5 sièges
  const rows = [];
  for (let i = 0; i < seats.length; i += 5) {
    rows.push(seats.slice(i, i + 5));
  }

  return (
    <div className="border rounded-lg p-4 shadow bg-gray-50 w-full">
      {/* Infos du bus */}
      <div className="mb-4">
        <p className="text-yellow-700">
          Modèle : {bus.marqueBus} {bus.modeleBus || "MBDS17"}
        </p>
        <p className="text-purple-700">
          Immatriculation : {bus.immatriculationBus || "AB-123-CD"}
        </p>
        <p className="text-blue-700">
          Kilométrage : {bus.kilometrageBus || 1200} km/h | Capacité : {bus.capaciteBus || 80} places
        </p>
        <p className="text-yellow-700">
          Places occupées : {occupiedSeats.length} | Places libres :{" "}
          {totalPlaces - occupiedSeats.length}
        </p>

        <br />
        <p className="text-red-700 font-bold mt-1">
          Chaises sélectionnées : {selectedSeats.join(", ")}
        </p>
      </div>

      <div className="mb-4 text-sm font-semibold text-gray-800">
        Sélectionnées : {selectedSeats.length} | Libres restantes :{" "}
        {totalPlaces - occupiedSeats.length - selectedSeats.length}
      </div>

      {/* Schéma du bus */}
      <div className="relative bg-gray-200 rounded-lg p-3">
        {/* Cabine conducteur */}
        <div className="bg-gray-400 h-12 rounded-t w-full flex items-center justify-center mb-3">
          <span className="text-sm font-bold">Cabine Conducteur</span>
        </div>

        {/* Portes */}
        <div className="absolute top-14 right-0 h-28 w-6 bg-yellow-400 rounded-l"></div>

        {/* Sièges */}
        <div className="flex flex-col gap-2">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {/* 3 sièges gauche */}
              <div className="flex gap-9 w-50">
                {row[0] != null && renderSeat(row[0])}
                {row[1] != null && renderSeat(row[1])}
                {row[2] != null && renderSeat(row[2])}
              </div>

              <div className="w-5 bg-gray-500"></div>

              {/* 2 sièges droite */}
              <div className="flex gap-9 w-50">
                {row[3] != null && renderSeat(row[3])}
                {row[4] != null && renderSeat(row[4])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusCard;
