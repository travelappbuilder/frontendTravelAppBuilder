import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="top" className="relative min-h-screen">

      {/* IMAGE DE FOND */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/bus.png')` }}
      ></div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* 🔵 TOPBAR RESPONSIVE */}
        <header className="fixed top-0 left-0 w-full z-20 bg-blue-700 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

            {/* Logo + Titre */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Travel App Logo"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-white text-xl md:text-2xl font-bold">
                TRAVEL APP BUILDER
              </h1>
            </div>

            {/* Hamburger (visible mobile) */}
            <button
              className="text-white text-3xl md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {/* Menu Desktop */}
            <nav className="hidden md:flex gap-6 bg-white px-6 py-2 rounded-lg shadow-md">
              <a href="#top" className="text-black font-semibold hover:text-gray-700 transition">
                Accueil
              </a>
              <Link to="/login" className="text-black font-semibold hover:text-gray-700 transition">
                Connexion
              </Link>
              <Link to="/register" className="text-black font-semibold hover:text-gray-700 transition">
                Inscription
              </Link>
              <a href="#apropos" className="text-black font-semibold hover:text-gray-700 transition">
                À propos
              </a>
            </nav>
          </div>

          {/* Menu Mobile */}
          {menuOpen && (
            <div className="md:hidden bg-white w-full shadow-md px-6 py-4 space-y-4 animate-slideDown">
              <a
                href="#top"
                onClick={() => setMenuOpen(false)}
                className="block text-black font-semibold text-lg"
              >
                Accueil
              </a>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-black font-semibold text-lg"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-black font-semibold text-lg"
              >
                Inscription
              </Link>
              <a
                href="#apropos"
                onClick={() => setMenuOpen(false)}
                className="block text-black font-semibold text-lg"
              >
                À propos
              </a>
            </div>
          )}
        </header>

        {/* MARGE POUR LE CONTENU */}
        <div className="pt-28">

          {/* SECTION HERO */}
          <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-5xl font-bold text-blue-700 mb-6 bg-white/90 p-3 rounded">
              Bienvenue chez TRAVEL APP BUILDER
            </h2>

            <p className="max-w-2xl text-lg mb-10 bg-white/90 text-black p-4 rounded">
              Votre solution digitale pour la gestion et la réservation de voyages.
            </p>

            <div className="flex gap-6">
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
              >
                Inscription
              </Link>
            </div>
          </section>

          {/* SECTION À PROPOS */}
          <section id="apropos" className="bg-blue-600 text-white py-20 px-10">
            <div className="max-w-5xl mx-auto bg-white/10 p-6 rounded-lg">
              <h3 className="text-4xl font-semibold mb-6">À propos de l’agence</h3>
              <p className="text-lg leading-relaxed">
                TRAVEL APP BUILDER est une solution digitale complète pour la gestion
                et la réservation de voyages. Notre objectif est de simplifier
                l'expérience utilisateur tout en offrant un service professionnel.
              </p>
            </div>
          </section>

          {/* SECTION SERVICES */}
          <section className="py-20 px-10 bg-gray-100/90">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-semibold text-blue-700 mb-10">
                Nos Services
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 shadow-md rounded-xl">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">Réservation en ligne</h4>
                  <p className="text-gray-600">Réservez vos voyages rapidement via notre plateforme en ligne.</p>
                </div>

                <div className="bg-white p-6 shadow-md rounded-xl">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">Bus modernes</h4>
                  <p className="text-gray-600">Profitez d'une flotte récente, confortable et sécurisée.</p>
                </div>

                <div className="bg-white p-6 shadow-md rounded-xl">
                  <h4 className="text-xl font-bold text-blue-600 mb-3">Support 24/7</h4>
                  <p className="text-gray-600">Nous sommes disponibles à tout moment pour vous aider.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-blue-700 text-white py-10 text-center">
            <p>© 2025 TRAVEL APP BUILDER — Tous droits réservés</p>
          </footer>

        </div>
      </div>
    </div>
  );
}
