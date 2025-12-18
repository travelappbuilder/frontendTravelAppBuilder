import React, { useEffect, useState } from "react";

const Filigrane: React.FC = () => {
  const [entrepriseData, setEntrepriseData] = useState<any>(null);

  // Récupérer les données de l'entreprise depuis le localStorage
  useEffect(() => {
    const storedEntrepriseData = localStorage.getItem("entrepriseData");
    if (storedEntrepriseData) {
      setEntrepriseData(JSON.parse(storedEntrepriseData));
    }
  }, []);

  if (!entrepriseData) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <h1
        className="text-gray-200 text-[15rem] font-bold opacity-10"
        style={{
          transform: "rotate(-30deg)",
          whiteSpace: "nowrap",
        }}
      >
        {entrepriseData.nomEntreprise}
      </h1>
    </div>
  );
};

export default Filigrane;
