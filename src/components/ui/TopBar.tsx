import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-700 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo + Nom */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpeg"
            alt="Logo TRAVEL APP BUILDER"
            className="h-12 w-12 object-cover rounded-md shadow"
          />

          <h1 className="text-2xl font-bold text-white tracking-wide hidden md:block">
            TRAVEL APP BUILDER
          </h1>
        </div>

        {/* Bouton Hamburger (visible sur mobile/tablette) */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6 bg-white px-6 py-2 rounded-lg shadow-md">
          <a
            href="#top"
            className="text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            Accueil
          </a>
          <Link
            to="/login"
            className="text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            S'inscrire
          </Link>
          <Link
            to="/apropos"
            className="text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            À propos
          </Link>
        </nav>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white w-full shadow-md rounded-b-lg px-6 py-4 space-y-4 animate-slideDown">
          <a
            href="#top"
            className="block text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            Accueil
          </a>
          <Link
            to="/login"
            className="block text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="block text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            S'inscrire
          </Link>
          <Link
            to="/apropos"
            className="block text-lg font-semibold text-black hover:text-gray-700 transition"
          >
            À propos
          </Link>
        </div>
      )}
    </header>
  );
}
