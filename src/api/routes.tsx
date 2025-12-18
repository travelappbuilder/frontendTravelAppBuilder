// src/api/routes.ts

export const BACKEND_URL = import.meta.env.VITE_API_URL;

/* =========================
   🔐 AUTH
   ========================= */
export const AUTH_ROUTES = {
  REGISTER: "/auth/utilisateur/register",
  VERIFY_EMAIL: "/auth/verification-email",
  LOGIN: "/auth/utilisateur/login",
};

/* =========================
   🏢 ENTREPRISE
   ========================= */
export const ENTREPRISE_ROUTES = {
  CREER: "/entreprises/creer",
  TOUS: "/entreprises/tous",
  PAR_DG: "/entreprises/dg",
  PAR_ID: (id: number | string) => `/entreprises/${id}`,
  MODIFIER: (id: number | string) => `/entreprises/modifier/${id}`,
  SUPPRIMER: (id: number | string) => `/entreprises/supprimer/${id}`,
};

/* =========================
   🏬 AGENCE
   ========================= */
export const AGENCE_ROUTES = {
  CREER: "/agences/creer",
  PAR_ENTREPRISE: (entrepriseId: number | string) =>
    `/agences/entreprise/${entrepriseId}`,
  MODIFIER: (id: number | string) =>
    `/agences/modifier/${id}`,
  SUPPRIMER: (id: number | string) =>
    `/agences/supprimer/${id}`,
};
