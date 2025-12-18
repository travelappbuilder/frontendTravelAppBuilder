import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../components/ui/Loader";
import { register as registerUser } from "../api/authService";
import EmailVerification from "./EmailVerification";

// Validation YUP
const schema = yup.object({
  nomUtilisateur: yup.string().required("Nom obligatoire"),
  prenomUtilisateur: yup.string().required("Prénom obligatoire"),
  emailUtilisateur: yup.string().email("Email invalide").required("Email obligatoire"),
  motDePasseUtilisateur: yup
    .string()
    .min(8, "Minimum 8 caractères")
    .required("Mot de passe obligatoire"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("motDePasseUtilisateur")], "Les mots de passe ne correspondent pas")
    .required("Confirmation obligatoire"),
}).required();

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<string>("ROLE_CLIENT");
  const [photoProfil, setPhotoProfil] = useState<File | null>(null);
  const [photoCni, setPhotoCni] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("nomUtilisateur", data.nomUtilisateur);
      formData.append("prenomUtilisateur", data.prenomUtilisateur);
      formData.append("emailUtilisateur", data.emailUtilisateur);
      formData.append("telephoneUtilisateur", data.telephoneUtilisateur || "");
      formData.append("motDePasse", data.motDePasseUtilisateur);
      formData.append("role", role);
      formData.append("idEntreprise", "");
      formData.append("idAgence", "");

      if (photoProfil) formData.append("photoProfilUtilisateur", photoProfil);
      if (role === "ROLE_DG" && photoCni) formData.append("photoCniUtilisateur", photoCni);

      const response = await registerUser(formData);

      console.log("Réponse backend :", response.data);
      localStorage.setItem("emailVerification", data.emailUtilisateur);
      localStorage.setItem("roleUtilisateur", role);

      console.log("Email de Verification:", data.emailUtilisateur);

      navigate("/verify-email");
    } catch (error: any) {
      console.error("Erreur inscription :", error.response?.data || error);
      alert("Erreur lors de la création du compte.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md mb-6 flex justify-start">
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-100 transition">
          Retour
        </button>
      </div>

      <h1 className="text-white text-4xl font-extrabold mb-10 drop-shadow-lg tracking-wide text-center">
        TRAVEL APP BUILDER
      </h1>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Inscription</h2>

        {/* Description du rôle */}
        <div className="mb-4 text-gray-700 text-sm">
          {role === "ROLE_CLIENT" ? (
            <p>Client : Réservez vos voyages, consultez les agences et gérez vos réservations.</p>
          ) : (
            <p>Directeur Général : Créez et gérez vos entreprises et agences, et supervisez les activités.</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="font-medium">Rôle :</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="ROLE_CLIENT">Client</option>
              <option value="ROLE_DG">Directeur Général</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Nom</label>
            <input type="text" {...register("nomUtilisateur")} className="w-full mt-1 p-3 border rounded-lg" />
            <p className="text-red-600 text-sm">{errors.nomUtilisateur?.message}</p>
          </div>

          <div>
            <label className="font-medium">Prénom</label>
            <input type="text" {...register("prenomUtilisateur")} className="w-full mt-1 p-3 border rounded-lg" />
            <p className="text-red-600 text-sm">{errors.prenomUtilisateur?.message}</p>
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input type="email" {...register("emailUtilisateur")} className="w-full mt-1 p-3 border rounded-lg" />
            <p className="text-red-600 text-sm">{errors.emailUtilisateur?.message}</p>
          </div>

          <div>
            <label className="font-medium">Téléphone</label>
            <input type="text" {...register("telephoneUtilisateur")} className="w-full mt-1 p-3 border rounded-lg" />
          </div>

          <div>
            <label className="font-medium">Mot de passe</label>
            <input type={showPassword ? "text" : "password"} {...register("motDePasseUtilisateur")} className="w-full mt-1 p-3 border rounded-lg" />
            <p className="text-red-600 text-sm">{errors.motDePasseUtilisateur?.message}</p>
          </div>

          <div>
            <label className="font-medium">Confirmer le mot de passe</label>
            <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} className="w-full mt-1 p-3 border rounded-lg" />
            <p className="text-red-600 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          <div>
            <label className="font-medium">Photo de profil</label>
            <input type="file" accept="image/*" onChange={(e) => setPhotoProfil(e.target.files?.[0] || null)} className="w-full mt-1 p-3 border rounded-lg" />
          </div>

          {role === "ROLE_DG" && (
            <div>
              <label className="font-medium">Photo CNI (DG uniquement)</label>
              <input type="file" accept="image/*" onChange={(e) => setPhotoCni(e.target.files?.[0] || null)} className="w-full mt-1 p-3 border rounded-lg" />
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition flex justify-center">
            {isSubmitting ? <Loader /> : "Créer un compte"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Déjà un compte ?{" "}
          <Link className="text-blue-700 font-semibold hover:underline" to="/login">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
