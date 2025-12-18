import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/authService";

const EmailVerification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<string>("ROLE_CLIENT");
  const [userEmail, setUserEmail] = useState<string>("");
  const [timer, setTimer] = useState(300); // 5 min = 300 sec

  const navigate = useNavigate();

  // 🔹 Charger les données utilisateur depuis localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem("emailVerification");
    const userRole = localStorage.getItem("roleUtilisateur");
    if (userEmail) setUserEmail(userEmail);
    if (userRole) setRole(userRole);
  }, []);

    
  // 🔹 Timer décompte + redirection automatique après 5 minutes
  useEffect(() => {
    if (timer <= 0) {
      setError("Le code a expiré. Veuillez recommencer l'inscription.");
      
      // Redirection automatique vers /register
      setTimeout(() => {
        navigate("/register");
      }, 3000); // petite pause 3 sec pour afficher le message

      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, navigate]);

  // Format minute/sec
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  // 🔹 Validation du code
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);



    if (!userEmail) {
      setError("Utilisateur introuvable. Veuillez recommencer l'inscription.");
      return;
    }

    try {
      // ✅ Envoi du JSON attendu par le backend
      const response = await verifyEmail({
        emailUtilisateur: userEmail,
        code: verificationCode,
      });
     console.log("Réponse vérification email :", response.data);
     localStorage.setItem("personnelData", JSON.stringify(response.data));

      if (response.data) {
        setSuccess(true);
        localStorage.setItem("jwtToken", response.data.jwtToken);
        console.log("Token JWT stocké :", response.data.jwtToken);
        const role = response.data.roleUtilisateur;

        // 🔹 Redirection selon le rôle
        setTimeout(() => {
          switch (role) {
            case "ROLE_DG":
              navigate("/dashboard/dg");
              break;
            case "ROLE_DIRECTEUR":
              navigate("/dashboard/directeur");
              break;
            case "ROLE_CHAUFFEUR":
              navigate("/dashboard/chauffeur");
              break;
            case "ROLE_GESTIONNAIRE":
              navigate("/dashboard/gestionnaire");
              break;
            default:
              navigate("/dashboard/client");
              break;
          }
        }, 2000);
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Code invalide ou expiré. Veuillez réessayer.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center px-6">
      <h1 className="text-white text-4xl font-extrabold mb-10 drop-shadow-lg tracking-wide text-center">
        Vérification d'Email
      </h1>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <p className="text-gray-700 text-center mb-6">
          Un code de <strong>8 chiffres</strong> a été envoyé à votre email.
          <br />
          <strong>Expiration dans : {formatTime(timer)}</strong>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-medium">
            Code validé avec succès ! Redirection en cours...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Code de vérification</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={8}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le code ici"
              required
            />
          </div>

          <button
            type="submit"
            disabled={timer <= 0}
            className={`w-full text-white font-semibold p-3 rounded-lg transition flex justify-center ${
              timer <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {timer <= 0 ? "Code expiré" : "Valider"}
          </button>

          {/* Bouton retour */}
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="mt-4 text-blue-600 hover:underline"
            >
              Retour à l'inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
