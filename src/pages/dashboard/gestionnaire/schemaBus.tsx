import React, { useState } from "react";

export interface Bus {
  idBus: number;
  idAgence: string;
  identifiantBus: string;
  immatriculationBus: string;
  marqueBus: string;
  modeleBus?: string;
  capaciteBus: number;
  confortBus: "Standard" | "VIP";
  etatBus: "en_service" | "maintenance" | "hors_service";
  kilometrageBus: number;
  placesOccupees: number[]; // indices des sièges occupés
}

interface Props {
  bus: Bus;
}

const BusCard: React.FC<Props> = ({ bus }) => {
  const totalPlaces = bus.capaciteBus;
  const seats = Array.from({ length: totalPlaces }, (_, i) => i);
  
  // état des places sélectionnées par l'utilisateur
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const toggleSeat = (index: number) => {
    if (bus.placesOccupees.includes(index)) return; // siège occupé, non cliquable
    if (selectedSeats.includes(index)) {
      setSelectedSeats(selectedSeats.filter((i) => i !== index));
    } else {
      setSelectedSeats([...selectedSeats, index]);
    }
  };

  return (
    <div className="border rounded-lg p-3 shadow bg-gray-50 w-full max-w-md">
      {/* Informations bus */}
      <div className="mb-3">
        <h2 className="font-bold text-lg">{bus.identifiantBus}</h2>
        <p className="text-sm text-gray-700">
          {bus.marqueBus} {bus.modeleBus || ""} - {bus.confortBus}
        </p>
        <p className="text-sm text-gray-700">
          Immatriculation: {bus.immatriculationBus} | État: {bus.etatBus}
        </p>
      </div>

      {/* Compteur */}
      <div className="mb-2 text-sm text-gray-800 font-semibold">
        Occupées: {selectedSeats.length} | Libres:{" "}
        {totalPlaces - bus.placesOccupees.length - selectedSeats.length}
      </div>

      {/* Schéma du bus */}
      <div className="relative bg-gray-200 rounded-lg p-2 overflow-hidden">
        {/* Cabine conducteur */}
        <div className="bg-gray-400 h-8 rounded-t w-full flex items-center justify-center mb-2">
          <span className="text-xs font-bold">Cabine Conducteur</span>
        </div>

        {/* Portes (côté droit) */}
        <div className="absolute top-10 right-0 h-16 w-4 bg-yellow-400 rounded-l"></div>

        {/* 5 rangés de Sièges */}
        <div className="grid grid-cols-5 gap-1">
          {seats.map((seatIndex) => {
            let seatClass = "h-6 w-6 rounded border flex items-center justify-center text-xs cursor-pointer";
            let seatTitle = `Siège ${seatIndex + 1}`;

            if (bus.placesOccupees.includes(seatIndex)) {
              seatClass += " bg-green-500 text-white cursor-not-allowed";
              seatTitle += " (occupé)";
            } else if (selectedSeats.includes(seatIndex)) {
              seatClass += " bg-blue-500 text-white";
              seatTitle += " (sélectionné)";
            } else {
              seatClass += " bg-white text-gray-600 hover:bg-gray-300";
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
          })}
        </div>

        {/* Couloir central (optionnel) */}
        <div className="absolute top-10 right-1/3 w-1 h-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default BusCard;
