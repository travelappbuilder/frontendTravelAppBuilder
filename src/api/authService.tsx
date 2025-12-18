// src/api/authService.tsx
import axiosClient from "./axiosClient";
import { AUTH_ROUTES, ENTREPRISE_ROUTES } from "./routes";

// ======================= Auth =======================

// 🔹 Register utilisateur (FormData support)
export const register = async (formData: FormData) => {
  return await axiosClient.post(AUTH_ROUTES.REGISTER, formData);
};

// 🔹 Vérification email
export const verifyEmail = async (data: any) => {
  return await axiosClient.post(AUTH_ROUTES.VERIFY_EMAIL, data);
};

// 🔹 Login
export const login = async (credentials: any) => {
  return await axiosClient.post(AUTH_ROUTES.LOGIN, credentials);
};

// ======================= Entreprise =======================

// 🔹 Créer une entreprise
export const createEntreprise = async (data: any) => {
  return await axiosClient.post(ENTREPRISE_ROUTES.CREER, data);
};

// 🔹 Récupérer toutes les entreprises du DG connecté
export const getEntreprisesDG = async () => {
  return await axiosClient.get(ENTREPRISE_ROUTES.PAR_DG);
};

// 🔹 Récupérer toutes les entreprises (Super Admin)
export const getAllEntreprises = async () => {
  return await axiosClient.get(ENTREPRISE_ROUTES.TOUS);
};

// 🔹 Récupérer une entreprise par ID
export const getEntrepriseById = async (id: number | string) => {
  return await axiosClient.get(ENTREPRISE_ROUTES.PAR_ID(id));
};

// 🔹 Modifier une entreprise
export const updateEntreprise = async (id: number | string, data: any) => {
  return await axiosClient.put(ENTREPRISE_ROUTES.MODIFIER(id), data);
};

// 🔹 Supprimer une entreprise
export const deleteEntreprise = async (id: number | string) => {
  return await axiosClient.delete(ENTREPRISE_ROUTES.SUPPRIMER(id));
};
