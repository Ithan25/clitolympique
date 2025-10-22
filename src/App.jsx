import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { emailConfig } from "./config/emailConfig";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import logoClitolympique from "./assets/logo.png";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
import photoAmaury from "./assets/photos/Amaury.png";
import photoEliott from "./assets/photos/Eliott.png";
import photoGaetan from "./assets/photos/Gaetan.png";
import photoKillian from "./assets/photos/Killian.png";
import photoMael from "./assets/photos/Mael.png";
import photoMao from "./assets/photos/Mao.png";
import photoMathys from "./assets/photos/Mathys.png";
import photoMaxence from "./assets/photos/Maxence.png";
import photoIthan from "./assets/photos/Ithan.png";
import photoOwen from "./assets/photos/Owen.png";
import photoBastian from "./assets/photos/Bastian.png";
import photoGroupe from "./assets/photos/groupe.jpg";
import photoEquipe from "./assets/photos/equipe.png";
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

const PlayerCard = ({
  name,
  position,
  number,
  isCoach = false,
  photo = null,
}) => (
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
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-zinc-700 to-pink-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg relative overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt={`Photo de ${name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center ${
              photo ? "hidden" : ""
            }`}
          >
            {isCoach ? name.charAt(0) : number || name.charAt(0)}
          </div>
          {!isCoach && number && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-fuchsia-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
              {number}
            </div>
          )}
        </div>
        <CardTitle
          className={`text-lg ${
            isCoach ? "text-pink-700 font-semibold" : "text-slate-800"
          }`}
        >
          {isCoach ? name : `${name} ${number ? `#${number}` : ""}`}
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la configuration EmailJS
    if (
      emailConfig.serviceID === "YOUR_SERVICE_ID" ||
      emailConfig.templateID === "YOUR_TEMPLATE_ID" ||
      emailConfig.publicKey === "YOUR_PUBLIC_KEY"
    ) {
      alert(
        "⚠️ Configuration EmailJS requise ! Consultez src/config/emailConfig.js pour les instructions."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoi de l'email via EmailJS
      const result = await emailjs.send(
        emailConfig.serviceID,
        emailConfig.templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Clitolympique",
          reply_to: formData.email,
        },
        emailConfig.publicKey
      );

      console.log("Email envoyé avec succès!", result.text);
      alert("✅ Merci pour votre message ! Nous vous recontacterons bientôt.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert(
        "❌ Erreur lors de l'envoi du message. Veuillez réessayer plus tard."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Photos des joueurs
  const playerPhotos = {
    Gaetan: photoGaetan,
    Amaury: photoAmaury,
    Mathys: photoMathys,
    Eliott: photoEliott,
    Mao: photoMao,
    Maël: photoMael,
    Maxence: photoMaxence,
    Killian: photoKillian,
    Ithan: photoIthan,
    Owen: photoOwen,
    Bastian: photoBastian,
  };

  const players = [
    {
      name: "Gaetan",
      position: "Gardien",
      number: 1,
      photo: playerPhotos["Gaetan"],
    },
    {
      name: "Amaury",
      position: "Défenseur",
      number: 2,
      photo: playerPhotos["Amaury"],
    },
    {
      name: "Mathys",
      position: "Défenseur",
      number: 3,
      photo: playerPhotos["Mathys"],
    },
    {
      name: "Owen",
      position: "Défenseur",
      number: 5,
      photo: playerPhotos["Owen"],
    },
    {
      name: "Eliott",
      position: "Milieu",
      number: 7,
      photo: playerPhotos["Eliott"],
    },
    { name: "Mao", position: "Milieu", number: 8, photo: playerPhotos["Mao"] },
    {
      name: "Maël",
      position: "Attaquant",
      number: 9,
      photo: playerPhotos["Maël"],
    },
    {
      name: "Maxence",
      position: "Attaquant",
      number: 10,
      photo: playerPhotos["Maxence"],
    },
    {
      name: "Killian",
      position: "Gardien",
      number: 11,
      photo: playerPhotos["Killian"],
    },
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
                <Trophy className="text-pink-700 w-12 h-12 hidden" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Clitolympique
                </h1>
                <p className="text-xs text-pink-800 font-medium">
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
                  className="relative px-4 py-2 text-slate-600 hover:text-pink-700 transition-all duration-300 font-medium rounded-lg group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                  <div className="absolute inset-0 bg-pink-100 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-pink-700 group-hover:w-full transition-all duration-300"></div>
                </motion.button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 text-slate-600 hover:text-pink-700 rounded-lg"
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
                             radial-gradient(circle at 40% 80%, rgba(81, 50, 68, 0.3) 0%, transparent 50%)`,
              }}
            ></div>

            {/* Formes géométriques flottantes animées */}
            {/* Formes principales existantes */}
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
              style={{ background: "rgba(207, 95, 144, 0.5)" }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-40 right-16 w-24 h-24 opacity-15"
              style={{
                background: "rgba(167, 72, 96, 0.6)",
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              }}
              animate={{
                rotate: [0, 180, 360],
                y: [0, 20, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute bottom-32 left-1/3 w-20 h-20 opacity-25"
              style={{
                background: "rgba(81, 50, 68, 0.7)",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
              animate={{
                x: [0, 50, 0],
                rotate: [0, 120, 240, 360],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Nouvelles formes géométriques pour plus de détails */}
            {/* Hexagone flottant */}
            <motion.div
              className="absolute top-1/4 left-1/2 w-16 h-16 opacity-20"
              style={{
                background:
                  "linear-gradient(45deg, rgba(207, 95, 144, 0.4), rgba(167, 72, 96, 0.4))",
                clipPath:
                  "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Losange avec dégradé */}
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-28 h-28 opacity-18"
              style={{
                background:
                  "conic-gradient(from 45deg, rgba(81, 50, 68, 0.3), rgba(207, 95, 144, 0.3), rgba(167, 72, 96, 0.3))",
                transform: "rotate(45deg)",
              }}
              animate={{
                rotate: [45, 405],
                x: [0, -20, 0],
                y: [0, 15, 0],
                opacity: [0.18, 0.32, 0.18],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rectangle avec coins arrondis */}
            <motion.div
              className="absolute top-3/4 left-20 w-36 h-8 opacity-15"
              style={{
                background: "rgba(207, 95, 144, 0.4)",
                borderRadius: "50px",
              }}
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 0.9, 1],
                opacity: [0.15, 0.28, 0.15],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Cercle avec effet de pulse */}
            <motion.div
              className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full opacity-22"
              style={{
                background:
                  "radial-gradient(circle, rgba(167, 72, 96, 0.5) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.22, 0.05, 0.22],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Formes en arrière-plan avec blur */}
            <motion.div
              className="absolute top-10 right-1/4 w-40 h-40 rounded-full opacity-8 blur-sm"
              style={{ background: "rgba(81, 50, 68, 0.3)" }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-10 left-1/4 w-32 h-32 opacity-12 blur-sm"
              style={{
                background: "rgba(207, 95, 144, 0.25)",
                borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
              }}
              animate={{
                rotate: [0, 180, 360],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Lignes géométriques subtiles */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-px opacity-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(207, 95, 144, 0.4) 30%, rgba(167, 72, 96, 0.4) 70%, transparent 100%)",
              }}
              animate={{
                opacity: [0.1, 0.25, 0.1],
                scaleX: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-0 left-1/2 w-px h-full opacity-8"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(81, 50, 68, 0.3) 30%, rgba(207, 95, 144, 0.3) 70%, transparent 100%)",
              }}
              animate={{
                opacity: [0.08, 0.2, 0.08],
                scaleY: [1, 1.02, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Particules brillantes enrichies */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-60"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-40"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 bg-white rounded-full opacity-50"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 2,
              }}
            />

            {/* Nouvelles particules */}
            <motion.div
              className="absolute top-1/5 left-3/5 w-1 h-1 bg-white rounded-full opacity-45"
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.65, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
            <motion.div
              className="absolute bottom-1/5 right-1/5 w-2.5 h-2.5 bg-white rounded-full opacity-35"
              animate={{
                scale: [0, 0.8, 0],
                opacity: [0, 0.55, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 0.8,
              }}
            />
            <motion.div
              className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-white rounded-full opacity-55"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.75, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                delay: 2.5,
              }}
            />
            <motion.div
              className="absolute top-1/6 right-2/5 w-1 h-1 bg-white rounded-full opacity-40"
              animate={{
                scale: [0, 1.1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                delay: 3,
              }}
            />

            {/* NIVEAU DE DÉTAILS SUPPLÉMENTAIRES - EFFETS AVANCÉS */}

            {/* Spirale de particules */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`spiral-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  left: `${50 + 15 * Math.cos((i * Math.PI) / 4)}%`,
                  top: `${50 + 15 * Math.sin((i * Math.PI) / 4)}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Cascade de formes en diagonale */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`cascade-${i}`}
                className="absolute w-3 h-3 opacity-15"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + i * 8}%`,
                  background: `rgba(${207 - i * 10}, ${95 + i * 5}, 144, 0.4)`,
                  borderRadius: i % 2 === 0 ? "50%" : "20%",
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Formes géométriques complexes supplémentaires */}

            {/* Étoile à 8 branches */}
            <motion.div
              className="absolute top-1/6 left-2/3 w-20 h-20 opacity-12"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(81, 50, 68, 0.3), rgba(207, 95, 144, 0.3), rgba(167, 72, 96, 0.3), rgba(81, 50, 68, 0.3))",
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.9, 1.1, 0.9],
                opacity: [0.12, 0.25, 0.12],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Pentagone avec effet de morphing */}
            <motion.div
              className="absolute bottom-1/6 left-1/6 w-16 h-16 opacity-18"
              style={{
                background:
                  "linear-gradient(72deg, rgba(207, 95, 144, 0.4), rgba(81, 50, 68, 0.4))",
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
              animate={{
                rotate: [0, 72, 144, 216, 288, 360],
                scale: [1, 0.8, 1.2, 0.9, 1],
                opacity: [0.18, 0.32, 0.18],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Croix avec rotation complexe */}
            <motion.div
              className="absolute top-2/3 right-1/6 w-12 h-12 opacity-20"
              style={{
                background: "rgba(167, 72, 96, 0.5)",
                clipPath:
                  "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)",
              }}
              animate={{
                rotate: [0, 90, 180, 270, 360],
                x: [0, 10, -10, 0],
                y: [0, -10, 10, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Vagues flottantes abstraites */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-24 opacity-8"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(207, 95, 144, 0.2) 25%, rgba(167, 72, 96, 0.2) 50%, rgba(81, 50, 68, 0.2) 75%, transparent 100%)",
                clipPath:
                  "polygon(0% 50%, 10% 20%, 20% 60%, 30% 30%, 40% 70%, 50% 40%, 60% 80%, 70% 35%, 80% 65%, 90% 25%, 100% 55%, 100% 100%, 0% 100%)",
              }}
              animate={{
                x: [-100, 100],
                opacity: [0.08, 0.2, 0.08],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Particules en orbite */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-45"
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: `${40 + i * 10}px 0px`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5],
                  opacity: [0.45, 0.8, 0.45],
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Effets de superposition complexes */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                background: `
                  radial-gradient(ellipse at 25% 25%, rgba(207, 95, 144, 0.3) 0%, transparent 30%),
                  radial-gradient(ellipse at 75% 75%, rgba(167, 72, 96, 0.3) 0%, transparent 30%),
                  radial-gradient(ellipse at 25% 75%, rgba(81, 50, 68, 0.3) 0%, transparent 30%),
                  radial-gradient(ellipse at 75% 25%, rgba(207, 95, 144, 0.3) 0%, transparent 30%)
                `,
              }}
              animate={{
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Micro-particules scintillantes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`micro-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Lignes de connexion dynamiques */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-px opacity-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(207, 95, 144, 0.5) 50%, transparent 100%)",
                transformOrigin: "left center",
              }}
              animate={{
                rotate: [0, 45, -45, 0],
                scaleX: [0.5, 1, 0.8, 0.5],
                opacity: [0.12, 0.3, 0.12],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-1/4 right-1/4 w-24 h-px opacity-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(167, 72, 96, 0.5) 50%, transparent 100%)",
                transformOrigin: "right center",
              }}
              animate={{
                rotate: [0, -30, 30, 0],
                scaleX: [0.3, 1, 0.6, 0.3],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
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
              <div className="w-full max-w-96 h-80 sm:h-96 mx-auto mb-8 mt-32 flex items-center justify-center px-4 sm:px-0">
                <img
                  src={logoClitolympique}
                  alt="Clitolympique Logo"
                  className="w-64 h-64 sm:w-72 sm:h-72 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <Trophy className="text-pink-700 hidden" size={80} />
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
                <span className="text-xs text-slate-500 group-hover:text-pink-700 transition-colors duration-300 font-medium">
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
                  Le <strong className="text-pink-700">Clitolympique</strong>{" "}
                  est une équipe passionnée de football sixt, un format rapide,
                  technique et collectif.
                </p>
                <p className="text-lg leading-relaxed">
                  Nous sommes actuellement en pleine préparation pour le{" "}
                  <strong className="text-pink-700">Tournoi du SMPFC</strong>{" "}
                  (Savenay Malville Prinquiau Football Club), prévu pour{" "}
                  <strong className="text-pink-700">mai 2026</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  Le club est soutenu par{" "}
                  <strong className="text-pink-700">
                    Mon Coach Informatique (MCI)
                  </strong>{" "}
                  –{" "}
                  <a
                    href="https://moncoachinformatique.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-700 hover:text-slate-800 underline"
                  >
                    moncoachinformatique.fr
                  </a>
                  , présidé par{" "}
                  <strong className="text-pink-700">
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
              <div className="h-100 bg-slate-100 rounded-lg shadow-xl overflow-hidden">
                <img
                  src={photoEquipe}
                  alt="Équipe Clitolympique"
                  className="w-full h-full object-cover"
                />
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
            <h3 className="text-2xl font-bold text-center text-pink-700 mb-6">
              Encadrement
            </h3>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="w-64">
                <PlayerCard
                  name="Ithan Boismard-Gillot"
                  position="Président"
                  isCoach={true}
                  photo={playerPhotos["Ithan"]}
                />
              </div>
              <div className="w-64">
                <PlayerCard
                  name="Bastian"
                  position="Entraîneur"
                  isCoach={true}
                  photo={playerPhotos["Bastian"]}
                />
              </div>
            </div>
          </div>

          {/* Joueurs */}
          <div>
            <h3 className="text-2xl font-bold text-center text-slate-700 mb-8">
              Joueurs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {players.map((player, index) => (
                <PlayerCard
                  key={index}
                  name={player.name}
                  position={player.position}
                  number={player.number}
                  photo={player.photo}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION MAILLOTS */}
      <section id="maillots" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle className="text-slate-900">Notre Maillot</SectionTitle>

          <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
            {/* Description à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 mb-8 lg:pr-12"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Notre Maillot Officiel
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Découvrez notre maillot officiel pour cette saison 2025-2026,
                  représentant l'esprit et la passion de{" "}
                  <strong className="text-pink-700">ClitOlympique</strong>. Un
                  design original qui allie tradition footballistique et
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
                  <div className="text-2xl font-bold text-pink-700">
                    2025-2026
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-600">
                    Design Original à
                  </div>
                  <div className="text-2xl font-bold text-pink-700 mb-1">
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
              <div className="h-100 bg-slate-100 rounded-lg shadow-xl overflow-hidden">
                <img
                  src={photoGroupe}
                  alt="Photo de groupe de l'équipe Clitolympique"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="w-full h-full bg-slate-100 rounded-lg shadow-xl flex items-center justify-center hidden">
                  <Target size={80} className="text-pink-700" />
                </div>
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
                  <strong className="text-pink-700">
                    Savenay Malville Prinquiau Football Club (SMPFC)
                  </strong>
                  , en <strong className="text-pink-700">mai 2026</strong>.
                </p>
                <p className="text-lg leading-relaxed text-slate-700">
                  Entraînements, stratégie et esprit d'équipe sont au cœur de
                  notre préparation.
                </p>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-xl border border-fuchsia-200/20">
                  <div className="text-center">
                    <Calendar
                      className="mx-auto mb-2 text-pink-200"
                      size={32}
                    />
                    <p className="text-sm opacity-90">Jours restants</p>
                    <p className="text-4xl font-bold text-pink-200">
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
                  <CardTitle className="text-pink-700 flex items-center gap-2">
                    <Mail size={20} />
                    Informations de contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-pink-700" size={18} />
                    <span>contact@clitolympique.fr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-pink-700" size={18} />
                    <span>Région Loire-Atlantique</span>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-slate-600 mb-3">
                      Suivez-nous sur les réseaux :
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/clitolympique_officiel/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-300 text-pink-700 hover:bg-slate-100"
                        >
                          <Instagram size={16} className="mr-2" />
                          Instagram
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <a
                      href="https://moncoachinformatique.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-700 hover:text-slate-800 underline font-medium"
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
                  <CardTitle className="text-pink-700">
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
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-700 to-pink-900 hover:from-fuchsia-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        "📧 Envoyer le message"
                      )}
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
          <p className="text-lg">© 2025 Clitolympique</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
