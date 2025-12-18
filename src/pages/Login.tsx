import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { login } from "../api/authService";

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Email invalide").required("Email obligatoire"),
  password: yup.string().required("Mot de passe obligatoire"),
});

export default function Login() {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (data: LoginForm) => {
    setBackendError(null);

    try {
      // 🔹 Appel backend conforme au DTO LoginRequest
      await login({
        emailUtilisateur: data.email,
        motDePasse: data.password,
      });

      // 🔹 Stockage email pour la vérification
      localStorage.setItem(
        "emailVerification", data.email
      );
      console.log("Email stocké pour vérification :", data.email);

      // 🔹 Redirection vers vérification email
      navigate("/verify-email", { replace: true });

    } catch (error: any) {
      console.error("❌ Erreur login :", error);

      setBackendError(
        error?.response?.data?.message ||
        "Erreur lors de la connexion. Vérifiez vos identifiants."
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Connexion
        </h2>

        {backendError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-medium">
            {backendError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="exemple@mail.com"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-medium">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? "Masquer" : "Voir"}
              </button>
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center"
          >
            {isSubmitting ? <Loader /> : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Pas encore inscrit ?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
