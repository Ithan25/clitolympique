import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import logoClitolympique from "./assets/logo.png";
import maillot1 from "./assets/maillots/1.png";
import maillot2 from "./assets/maillots/2.png";
import maillot3 from "./assets/maillots/3.png";
import maillot4 from "./assets/maillots/4.png";
import maillot5 from "./assets/maillots/5.png";
import maillot6 from "./assets/maillots/6.png";
import maillot7 from "./assets/maillots/7.png";
import maillot8 from "./assets/maillots/8.png";
import maillot9 from "./assets/maillots/9.png";
import maillot10 from "./assets/maillots/10.png";
import maillot11 from "./assets/maillots/11.png";
import maillot12 from "./assets/maillots/12.png";
import maillot13 from "./assets/maillots/13.png";
import maillot14 from "./assets/maillots/14.png";
import maillot15 from "./assets/maillots/15.png";
import maillot16 from "./assets/maillots/16.png";
import {
  Trophy,
  Users,
  Calendar,
  Mail,
  Facebook,
  Instagram,
  MapPin,
  Target,
  Heart,
  Star,
} from "lucide-react";

// Composants utilitaires
const SectionTitle = ({ children, className = "" }) => (
  <motion.h2
    className={`text-3xl md:text-4xl font-bold text-center mb-8 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.h2>
);

const PlayerCard = ({ name, position, number, isCoach = false }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="bg-white border-slate-200 hover:shadow-xl hover:shadow-fuchsia-100/50 transition-all duration-300">
      <CardHeader className="text-center pb-2">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-2xl font-bold shadow-lg relative">
          {isCoach ? name.charAt(0) : number || name.charAt(0)}
          {!isCoach && number && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-fuchsia-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
              {number}
            </div>
          )}
        </div>
        <CardTitle
          className={`text-lg ${
            isCoach ? "text-fuchsia-600 font-semibold" : "text-slate-800"
          }`}
        >
          {name}
        </CardTitle>
        {position && (
          <p className="text-sm text-slate-600 font-medium">
            {isCoach && position === "Président"
              ? "👔 Président"
              : isCoach
              ? "🏃‍♂️ Entraîneur"
              : `⚽ ${position}`}
          </p>
        )}
      </CardHeader>
    </Card>
  </motion.div>
);

// Composant 3D pour les maillots
const Rotating3DMaillot = () => {
  const maillots = [
    maillot1,
    maillot2,
    maillot3,
    maillot4,
    maillot5,
    maillot6,
    maillot7,
    maillot8,
    maillot9,
    maillot10,
    maillot11,
    maillot12,
    maillot13,
    maillot14,
    maillot15,
    maillot16,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % maillots.length);
    }, 500);

    return () => clearInterval(interval);
  }, [maillots.length]);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      <img
        src={maillots[currentImageIndex]}
        alt={`Maillot ${currentImageIndex + 1}`}
        className="w-64 h-64 object-contain drop-shadow-2xl"
      />
    </div>
  );
};

function App() {
  const [daysUntilTournament, setDaysUntilTournament] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Calcul des jours restants jusqu'au tournoi (mai 2026)
  useEffect(() => {
    const tournamentDate = new Date("2026-05-01");
    const today = new Date();
    const diffTime = tournamentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilTournament(diffDays);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous recontacterons bientôt.");
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const players = [
    { name: "Gaetan", position: "Gardien", number: 1 },
    { name: "Amaury", position: "Attaquant", number: 2 },
    { name: "Mathys", position: "?", number: 3 },
    { name: "Owen", position: "?", number: 5 },
    { name: "Eliott", position: "?", number: 7 },
    { name: "Mao", position: "?", number: 8 },
    { name: "Maël", position: "?", number: 9 },
    { name: "Maxence", position: "?", number: 10 },
    { name: "Killian", position: "?", number: 11 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden font-['Montserrat']">
      {/* Background decorative elements - Always behind everything */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-fuchsia-200/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/15 rounded-full blur-lg"></div>
        <div className="absolute top-60 left-1/4 w-16 h-16 bg-fuchsia-300/8 rounded-full blur-md"></div>
        <div className="absolute bottom-40 right-1/4 w-40 h-40 bg-slate-200/20 rounded-full blur-2xl"></div>
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 mx-auto max-w-6xl">
          <div className="px-6 py-4 flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Logo Clitolympique */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={logoClitolympique}
                  alt="Clitolympique Logo"
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    // Fallback si l'image ne charge pas
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <Trophy className="text-fuchsia-600 w-12 h-12 hidden" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Clitolympique
                </h1>
                <p className="text-xs text-fuchsia-500 font-medium">
                  Football Club
                </p>
              </div>
            </motion.div>

            <nav className="hidden md:flex space-x-2">
              {[
                { id: "accueil", label: "Accueil" },
                { id: "club", label: "Club" },
                { id: "equipe", label: "Équipe" },
                { id: "maillots", label: "Maillots" },
                { id: "tournoi", label: "Tournoi" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-slate-600 hover:text-fuchsia-600 transition-all duration-300 font-medium rounded-lg group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                  <div className="absolute inset-0 bg-fuchsia-50 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-fuchsia-500 group-hover:w-full transition-all duration-300"></div>
                </motion.button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 text-slate-600 hover:text-fuchsia-600 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* SECTION HÉROS */}
      <section
        id="accueil"
        className="min-h-screen flex items-center justify-center relative z-10 overflow-hidden"
      >
        {/* Background moderne avec dégradé et formes géométriques */}
        <div className="absolute inset-0">
          {/* Dégradé de base diagonal */}
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, #513244 0%, #A74860 40%, #CF5F90 100%)`,
            }}
          ></div>

          {/* Couches d'overlay avec opacité */}
          <div className="absolute inset-0">
            {/* Mesh gradient overlay */}
            <div 
              className="w-full h-full opacity-40"
              style={{
                background: `radial-gradient(circle at 20% 20%, rgba(207, 95, 144, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 60%, rgba(167, 72, 96, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 40% 80%, rgba(81, 50, 68, 0.3) 0%, transparent 50%)`
              }}
            ></div>
            
            {/* Formes géométriques flottantes animées */}
            <motion.div 
              className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
              style={{ background: 'rgba(207, 95, 144, 0.5)' }}
              animate={{ 
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            <motion.div 
              className="absolute top-40 right-16 w-24 h-24 opacity-15"
              style={{ 
                background: 'rgba(167, 72, 96, 0.6)', 
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
              }}
              animate={{ 
                rotate: [0, 180, 360],
                y: [0, 20, 0],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            <motion.div 
              className="absolute bottom-32 left-1/3 w-20 h-20 opacity-25"
              style={{ 
                background: 'rgba(81, 50, 68, 0.7)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
              animate={{ 
                x: [0, 50, 0],
                rotate: [0, 120, 240, 360],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />

            {/* Particules brillantes */}
            <motion.div 
              className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-60"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: 0
              }}
            />
            <motion.div 
              className="absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-40"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: 1
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 bg-white rounded-full opacity-50"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity, 
                delay: 2
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="w-96 h-96 mx-auto mb-8 mt-32 flex items-center justify-center">
                <img
                  src={logoClitolympique}
                  alt="Clitolympique Logo"
                  className="w-72 h-72 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <Trophy className="text-fuchsia-600 hidden" size={80} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center mt-12"
            >
              <motion.button
                onClick={() => scrollToSection("club")}
                className="group flex flex-col items-center cursor-pointer space-y-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-fuchsia-300 to-transparent"></div>
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-fuchsia-500 rounded-full"
                    animate={{ y: [0, 48, 0], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-fuchsia-400 rounded-full"
                    animate={{ y: [0, 48, 0], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-fuchsia-300 rounded-full"
                    animate={{ y: [0, 48, 0], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  />
                </div>
                <span className="text-xs text-slate-500 group-hover:text-fuchsia-600 transition-colors duration-300 font-medium">
                  Scroll
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION À PROPOS DU CLUB */}
      <section id="club" className="py-20 bg-slate-50 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle className="text-slate-900">Notre Club</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  Le <strong className="text-fuchsia-600">Clitolympique</strong>{" "}
                  est une équipe passionnée de football sixt, un format rapide,
                  technique et collectif.
                </p>
                <p className="text-lg leading-relaxed">
                  Nous sommes actuellement en pleine préparation pour le{" "}
                  <strong className="text-fuchsia-600">Tournoi du SMPFC</strong>{" "}
                  (Savenay Malville Prinquiau Football Club), prévu pour{" "}
                  <strong className="text-fuchsia-600">mai 2026</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  Le club est soutenu par{" "}
                  <strong className="text-fuchsia-600">
                    Mon Coach Informatique (MCI)
                  </strong>{" "}
                  –{" "}
                  <a
                    href="https://moncoachinformatique.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fuchsia-600 hover:text-slate-800 underline"
                  >
                    moncoachinformatique.fr
                  </a>
                  , présidé par{" "}
                  <strong className="text-fuchsia-600">
                    Ithan Boismard–Gillot
                  </strong>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-80 bg-slate-100 rounded-lg shadow-xl flex items-center justify-center">
                <Users size={80} className="text-fuchsia-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION ÉQUIPE */}
      <section id="equipe" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle className="text-slate-900">Notre Équipe</SectionTitle>

          {/* Staff */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-fuchsia-600 mb-6">
              Encadrement
            </h3>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="w-64">
                <PlayerCard
                  name="Ithan Boismard-Gillot"
                  position="Président"
                  isCoach={true}
                />
              </div>
              <div className="w-64">
                <PlayerCard
                  name="Bastian"
                  position="Entraîneur"
                  isCoach={true}
                />
              </div>
            </div>
          </div>

          {/* Joueurs */}
          <div>
            <h3 className="text-2xl font-bold text-center text-slate-700 mb-8">
              Joueurs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map((player, index) => (
                <PlayerCard
                  key={index}
                  name={player.name}
                  position={player.position}
                  number={player.number}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION MAILLOTS */}
      <section id="maillots" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle className="text-slate-900">Nos Maillots</SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Description à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Notre Maillot Officiel
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Découvrez notre maillot officiel pour cette saison 2025-2026,
                  représentant l'esprit et la passion de{" "}
                  <strong className="text-fuchsia-600">ClitOlympique</strong>.
                  Un design original qui allie tradition footballistique et
                  modernité.
                </p>
                <p className="text-slate-600">
                  Ce maillot raconte notre histoire, symbolise nos valeurs, et
                  porte en lui l'ADN de notre club. Conçu spécialement pour nous
                  accompagner dans nos victoires et nos défis de cette nouvelle
                  saison.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-600 mb-1">Saison</div>
                  <div className="text-2xl font-bold text-fuchsia-600">
                    2025-2026
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-600">
                    Design Original à
                  </div>
                  <div className="text-2xl font-bold text-fuchsia-600 mb-1">
                    100%
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Animation 3D à droite */}
            <motion.div
              initial={{ opacity: 100, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl shadow-xl">
                <Rotating3DMaillot />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION TOURNOI */}
      <section id="tournoi" className="py-20 bg-slate-50 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle className="text-slate-900">
            Prochain Objectif : Tournoi SMPFC 2026
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="h-80 bg-slate-100 rounded-lg shadow-xl flex items-center justify-center">
                <Target size={80} className="text-fuchsia-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-slate-700">
                  Notre objectif : être prêts pour le tournoi du{" "}
                  <strong className="text-fuchsia-600">
                    Savenay Malville Prinquiau Football Club (SMPFC)
                  </strong>
                  , en <strong className="text-fuchsia-600">mai 2026</strong>.
                </p>
                <p className="text-lg leading-relaxed text-slate-700">
                  Entraînements, stratégie et esprit d'équipe sont au cœur de
                  notre préparation.
                </p>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-xl border border-fuchsia-200/20">
                  <div className="text-center">
                    <Calendar
                      className="mx-auto mb-2 text-fuchsia-300"
                      size={32}
                    />
                    <p className="text-sm opacity-90">Jours restants</p>
                    <p className="text-4xl font-bold text-fuchsia-300">
                      {daysUntilTournament}
                    </p>
                    <p className="text-sm opacity-90">jusqu'au tournoi SMPFC</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle className="text-slate-900">Nous contacter</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                  <CardTitle className="text-fuchsia-600 flex items-center gap-2">
                    <Mail size={20} />
                    Informations de contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-fuchsia-600" size={18} />
                    <span>contact@clitolympique.fr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-fuchsia-600" size={18} />
                    <span>Région Loire-Atlantique</span>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-slate-600 mb-3">
                      Suivez-nous sur les réseaux :
                    </p>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-300 text-fuchsia-600 hover:bg-slate-100"
                      >
                        <Facebook size={16} className="mr-2" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-300 text-fuchsia-600 hover:bg-slate-100"
                      >
                        <Instagram size={16} className="mr-2" />
                        Instagram
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <a
                      href="https://moncoachinformatique.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-600 hover:text-slate-800 underline font-medium"
                    >
                      🌐 moncoachinformatique.fr
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Formulaire de contact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                  <CardTitle className="text-fuchsia-600">
                    Envoyez-nous un message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-slate-200 focus:border-fuchsia-400"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-slate-200 focus:border-fuchsia-400"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Votre message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="border-slate-200 focus:border-fuchsia-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-4 mb-4"
          >
            <Trophy className="text-fuchsia-600" size={24} />
            <Star className="text-slate-600" size={20} />
            <Heart className="text-fuchsia-600" size={20} />
            <Star className="text-slate-600" size={20} />
            <Trophy className="text-fuchsia-600" size={24} />
          </motion.div>
          <p className="text-lg">© 2025 Clitolympique</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
