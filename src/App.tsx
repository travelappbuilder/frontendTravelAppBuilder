import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"; // Import du MainLayout

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormulaireEntreprisePage from "./pages/entreprise/FormulaireEntreprisePage";
import FormulaireAgencePage from "./pages/agence/FormulaireAgencePage";
import FormulairePersonnelsPage from "./pages/personnels/FormulairePersonnelsPage";
import EmailVerification from "./pages/EmailVerification";

// DASHBOARDS PAR RÔLE
import DGDashboard from "./pages/dashboard/dg/DGDashboard";
import DirecteurDashboard from "./pages/dashboard/directeur/DirecteurDashboard";
import GestionnaireDashboard from "./pages/dashboard/gestionnaire/GestionnaireDashboard";
import ChauffeurDashboard from "./pages/dashboard/chauffeur/ChauffeurDashboard";
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import FormulaireChauffeurGestionnaire from "./pages/personnels/FormulaireChauffeurGestionnaire";

const App: React.FC = () => {
  return (
    <Routes>
      

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-entreprise" element={<FormulaireEntreprisePage />} />
      <Route path="/create-agence" element={<FormulaireAgencePage />} />
      <Route path="/create-personnel" element={<FormulairePersonnelsPage />} />
      <Route path="/create-personnel-da" element={<FormulaireChauffeurGestionnaire />} />

      {/* DASHBOARDS PAR RÔLE avec MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard/dg" element={<DGDashboard />} />
        <Route path="/dashboard/directeur" element={<DirecteurDashboard />} />
        <Route path="/dashboard/gestionnaire" element={<GestionnaireDashboard />} />
        <Route path="/dashboard/chauffeur" element={<ChauffeurDashboard />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        {/* PAGE PUBLIQUE */}
      <Route path="/" element={<Home />} />
      </Route>

      {/* VÉRIFICATION EMAIL */}
      <Route path="/verify-email" element={<EmailVerification />} />

      {/* REDIRECTION PAR DÉFAUT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
