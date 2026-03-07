/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  Mail, 
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// ... (TikTokIcon remains the same)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const orderUrl = "https://qopla.com/restaurant/berlin-doner/qYxa7mbmVk/order";

const socialLinks = [
  { 
    name: 'Instagram', 
    icon: <Instagram size={20} />, 
    href: 'https://www.instagram.com/berlindonersverige/' 
  },
  { 
    name: 'TikTok', 
    icon: <TikTokIcon className="w-5 h-5" />, 
    href: 'https://www.tiktok.com/@berlin.doner.linkoping?lang=sv-SE' 
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Hem', to: '/' },
    { name: 'Meny', to: '/meny' },
    { name: 'Hitta oss', to: '/#locations' },
    { name: 'Öppettider', to: '/#hours' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen || location.pathname !== '/' ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a095c1b50b97b8fac9cf06.png" 
              alt="Berlin Döner Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.to.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.to} 
                  className="text-sm font-medium uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.to} 
                  className="text-sm font-medium uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 h-[44px] flex items-center justify-center rounded-full text-sm font-bold uppercase tracking-tighter transition-all transform hover:scale-105 active:scale-95"
            >
              Beställ
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-4 h-[38px] flex items-center justify-center rounded-full text-xs font-bold uppercase tracking-tighter shadow-lg shadow-red-600/20"
            >
              Beställ
            </a>
            <button 
              className="text-white p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              link.to.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter hover:text-red-500 transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter hover:text-red-500 transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white w-[200px] h-[50px] flex items-center justify-center rounded-full text-xl font-bold uppercase tracking-tighter"
            >
              Beställ
            </a>
            
            <div className="flex gap-6 mt-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-full hover:bg-red-600 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center mb-8">
            <img 
              src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a095c1b50b97b8fac9cf06.png" 
              alt="Berlin Döner Logo" 
              className="h-12 md:h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-gray-500 max-w-md leading-relaxed">
            Vi är stolta över att servera Linköping med den mest autentiska tyska dönern. 
            Kvalitet, passion och tradition i varje tugga.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 mb-6">Kontakt</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:info@berlindoner.se" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Mail size={16} /> info@berlindoner.se
              </a>
            </li>
            <li className="text-gray-400 flex items-start gap-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>Nygatan 23, <br /> 582 19 Linköping</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 mb-6">Följ Oss</h4>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-red-600 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Berlin Döner</p>
        <p>
          Powered by{' '}
          <a 
            href="https://synsnumedia.se/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            SynsNu
          </a>
        </p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-50"
            poster="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a0b77bb50b97573fd31958.jpg"
          >
            <source src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a0b91f9a0c1889e916cfaa.mov" type="video/mp4" />
            <source src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a0b91f9a0c1889e916cfaa.mov" type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-red-500 font-bold uppercase tracking-[0.3em] mb-4 text-xs sm:text-sm"
          >
            Äkta Tysk Döner i Linköping
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8"
          >
            SMAKEN AV <br />
            <span className="text-transparent border-text" style={{ WebkitTextStroke: '1px white' }}>BERLIN</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4"
          >
            <a 
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-4 sm:px-10 h-[44px] sm:h-[54px] rounded-full text-xs sm:text-lg font-black uppercase tracking-tighter flex items-center justify-center gap-1 sm:gap-2 transition-all active:scale-95"
            >
              Beställ <ChevronRight className="w-3 h-3 sm:w-5 sm:h-5" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Infinite Loop Section */}
      <section className="bg-red-600 py-6 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-scroll w-max">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8 flex-shrink-0">
              <img 
                src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a095c1b50b97b8fac9cf06.png" 
                alt="Berlin Döner" 
                className="h-8 md:h-12 w-auto brightness-0 invert opacity-90 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter italic flex-shrink-0">
                #DönerDreams
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-6 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 md:mb-8 uppercase">
              VI GÖR DÖNER <br />
              <span className="bg-black text-white px-2">SOM DEN SKA</span> <br />
              SMAKA.
            </h2>
            <div className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 space-y-4">
              <p>
                I hjärtat av Linköping serverar vi döner inspirerad av Berlins gator- där kvalitet alltid går först.
              </p>
              <p>
                Vårt kött rostas långsamt för att få den unika smaken och perfekt saftighet. Våra såser görs från grunden efter egna recept, och varje ingrediens väljs med omsorg för att säkerställa högsta kvalitet.
              </p>
              <p>
                Det handlar inte bara om snabbmat.<br />
                Det handlar om hantverk, tradition och respekt för smaken.
              </p>
              <p className="font-bold text-black">
                Berlin Döner är platsen där äkta döner möter Linköping – och skapar en smakupplevelse.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-xl">
                <p className="text-3xl md:text-4xl font-black tracking-tighter">100%</p>
                <p className="text-xs md:text-sm uppercase font-bold text-gray-500">Kvalitetskött</p>
              </div>
              <div className="bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-xl">
                <p className="text-3xl md:text-4xl font-black tracking-tighter">DAGLIGEN</p>
                <p className="text-xs md:text-sm uppercase font-bold text-gray-500">Hembakat Bröd</p>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/5] md:aspect-auto overflow-hidden rounded-2xl">
              <img 
                src="https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69a0b8d2e545dde79cf25ca6.jpg" 
                alt="Fresh Döner" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-left-8 bg-red-600 text-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-xl">
              <p className="text-lg md:text-2xl font-black tracking-tighter">#DönerDreams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations & Hours */}
      <section id="locations" className="py-20 md:py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Hitta Oss</h2>
            <div className="h-1 w-20 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Address Card */}
            <div className="group relative overflow-hidden bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl hover:border-red-600/50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-6 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin size={80} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 md:mb-6 text-red-500">Linköping</h3>
              <p className="text-xl md:text-2xl font-black mb-1 md:mb-2">Nygatan 23</p>
              <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">582 19 Linköping, Sverige</p>
              <a 
                href="https://maps.app.goo.gl/MfnujHguhUirv23B6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs md:text-sm tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                Hitta hit <ExternalLink size={14} />
              </a>
            </div>

            {/* Hours Card */}
            <div id="hours" className="group relative overflow-hidden bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl hover:border-red-600/50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-6 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock size={80} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 md:mb-6 text-red-500">Öppettider</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400 uppercase text-xs md:text-sm tracking-widest">Måndag - Söndag</span>
                  <span className="text-lg md:text-xl font-black">11:00 – 22:00</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 italic mt-4">
                  * Vi har öppet alla dagar i veckan för att servera dig Linköpings bästa döner.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Banner */}
          <div className="mt-8 md:mt-12 p-6 md:p-8 bg-red-600 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="p-3 bg-white/20 rounded-full hidden sm:block">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase font-bold opacity-80">Frågor eller funderingar?</p>
                <p className="text-lg md:text-xl font-black tracking-tight">info@berlindoner.se</p>
              </div>
            </div>
            <a 
              href="mailto:info@berlindoner.se"
              className="w-full md:w-auto bg-white text-red-600 px-8 py-3 rounded-full font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform text-center"
            >
              Kontakta Oss
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function MenuPage() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const menuCategories = [
    {
      title: "NYHETER!",
      items: [
        {
          name: "NYHET! Döner Svensk Klassiker",
          description: "Ingår dryck!",
          price: "115 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/menybild_svensk_klassiker.png"
        },
        {
          name: "PitaGyro",
          description: "Smakrik wrap med gyros! Hemmagjord tzatziki ingår",
          price: "Från 125 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/menybild_pitagyro.png"
        },
        {
          name: "El Mexico Döner",
          description: "Smältost, Jalapeños, Rödlök, Sallad, Rödkål, Tomat, Gurka",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/El_mexico1.jpg"
        },
        {
          name: "Lahmaucun Döner",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka, Citronsaft",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Lahmaucun1.jpg"
        },
        {
          name: "Berliner Döner",
          description: "Stekta Grönsaker Auberginre, Squash, Röd Grön Gul Paprika, Potatis, Morötter, Sallad...",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Berliner1.jpg"
        },
        {
          name: "Big Döner Mix Tallrik",
          description: "Ditt val av protein med sallad, rödkål, lök, tomat, gurka och valfri sås",
          price: "Från 165 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Big_doner_mix_tallrik.jpg"
        },
        {
          name: "Big Döner Mix Bröd",
          description: "Ditt val av protein med sallad, rödkål, lök, tomat, gurka och valfri sås",
          price: "Från 155 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/9.jpg"
        },
        {
          name: "Snacks Box & Pommes",
          description: "Ditt val av sås",
          price: "99 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/IMG_9276.jpg"
        }
      ]
    },
    {
      title: "Kalv",
      items: [
        {
          name: "Kalv Box",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Box_Doner.png"
        },
        {
          name: "Kalv Bröd",
          description: "Krispigt bröd från Berlin, sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Kalv_med_brod.png"
        },
        {
          name: "Kalv Rulle",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/rulle-kyckling.png"
        },
        {
          name: "Kalv Tallrik",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Kalvtallrik.png"
        },
        {
          name: "Kalv Sallad",
          description: "Sallad, rödkål, tomat, gurka, lök, majs, fetaost, peperoni, granatäpplesirap och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Kalvsallad.png"
        }
      ]
    },
    {
      title: "Karré",
      items: [
        {
          name: "Karré Box",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Box_doner_karre.png"
        },
        {
          name: "Karré Bröd",
          description: "Krispigt bröd från Berlin, sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Karre_med_brod.png"
        },
        {
          name: "Karré Rulle",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/rulle-karre.png"
        },
        {
          name: "Karré Tallrik",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Karre_tallrik.png"
        },
        {
          name: "Karré Sallad",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Karre_sallad.png"
        }
      ]
    },
    {
      title: "Kyckling",
      items: [
        {
          name: "Kyckling Box",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/21.jpg"
        },
        {
          name: "Kyckling Bröd",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/16.jpg"
        },
        {
          name: "Kyckling Rulle",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/rulle-kyckling.png"
        },
        {
          name: "Kyckling Tallrik",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/36.jpg"
        },
        {
          name: "Kyckling Sallad",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/10.jpg"
        }
      ]
    },
    {
      title: "Falafel",
      items: [
        {
          name: "Falafel Box",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Falafel_box.png"
        },
        {
          name: "Falafel Bröd",
          description: "Eget bröd från Berlin, egengjord falafel, sallad, rödkål, lök, tomat, gurka och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Falafel_med_brod.png"
        },
        {
          name: "Falafel Rulle",
          description: "Egengjord falafel, sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/rulle-falafel.png"
        },
        {
          name: "Falafel Tallrik",
          description: "Sallad, rödkål, tomat, gurka, lök, majs, fetaost, peperoni, granatäpplesirap och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Falafel_tallrik_pommes.png"
        },
        {
          name: "Falafel Sallad",
          description: "Sallad, rödkål, tomat, gurka, lök, majs, fetaost, peperoni, granatäpplesirap och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Falafel_Sallad.png"
        }
      ]
    },
    {
      title: "Halloumi",
      items: [
        {
          name: "Halloumi Box",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Halloumi_box.png"
        },
        {
          name: "Halloumi Bröd",
          description: "Krispigt bröd från Berlin, sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 135 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Halloumi_med_brod.png"
        },
        {
          name: "Halloumi Rulle",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Halloumi_Rulle.png"
        },
        {
          name: "Halloumi Tallrik",
          description: "Sallad, rödkål, tomat, gurka, lök och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Halloumin_tallrik_med_pommes.png"
        },
        {
          name: "Halloumi Sallad",
          description: "Sallad, rödkål, tomat, gurka, lök, majs, fetaost, peperoni, granatäpplesirap och valfri sås",
          price: "Från 139 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Halloumi_Sallad.png"
        }
      ]
    },
    {
      title: "Big Döner Mix",
      items: [
        {
          name: "Big Döner Mix Tallrik",
          description: "Ditt val av protein med sallad, rödkål, lök, tomat, gurka och valfri sås",
          price: "Från 165 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Big_doner_mix_tallrik.jpg"
        },
        {
          name: "Big Döner Mix Bröd",
          description: "Ditt val av protein med sallad, rödkål, lök, tomat, gurka och valfri sås",
          price: "Från 155 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/9.jpg"
        }
      ]
    },
    {
      title: "Kids",
      items: [
        {
          name: "Kids Döner - Pommes",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 85 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Kids_med_pommes.png"
        },
        {
          name: "Kids Döner - Ris",
          description: "Sallad, Rödkål, Lök, Tomat, Gurka",
          price: "Från 85 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Kids_med_ris.png"
        }
      ]
    },
    {
      title: "Tillbehör",
      items: [
        {
          name: "Kampanj Spicy BBQ Wings 6st",
          description: "",
          price: "49 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/3.jpg"
        },
        {
          name: "Pommes",
          description: "",
          price: "45 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/17.jpg"
        },
        {
          name: "Cheese & Pommes",
          description: "",
          price: "65 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Cheece_and_frites.png"
        },
        {
          name: "Bröd",
          description: "",
          price: "25 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Brod.jpg"
        },
        {
          name: "Nacho Cheese Triangles",
          description: "Välj mellan 4st eller 6st",
          price: "Från 45 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/5.jpg"
        },
        {
          name: "Onion Rings",
          description: "Välj mellan 4st eller 6st",
          price: "Från 40 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/4.jpg"
        },
        {
          name: "Chicken Fingers",
          description: "Välj mellan 4st eller 6st",
          price: "Från 65 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Chicken_Fingers.jpg"
        },
        {
          name: "Chicken Kicks Sweet",
          description: "Välj mellan 4st eller 6st",
          price: "Från 45 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Chicken_Slide_Tenders_(Osaker_pa_namn).jpg"
        },
        {
          name: "Mozzarella Sticks",
          description: "Välj mellan 4st eller 6st",
          price: "Från 45 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/2.jpg"
        },
        {
          name: "Spicy BBQ Wings",
          description: "Välj mellan 4st eller 6st",
          price: "Från 50 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/3.jpg"
        },
        {
          name: "Chili Cheese",
          description: "Välj mellan 4st eller 6st",
          price: "Från 40 kr",
          image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/6.jpg"
        }
      ]
    },
    {
      title: "Dipsåser",
      items: [
        { name: "Curry Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Curry.png" },
        { name: "Döner Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Sesam_och_doner_sas.png" },
        { name: "Vitlök Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Vitlok.png" },
        { name: "Chili Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Chillisas.png" },
        { name: "Sweet & Sour Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Sweatsour.png" },
        { name: "Sesam Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Sesam_och_doner_sas.png" },
        { name: "Örter Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Ortsas.png" },
        { name: "Tzatziki Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Tzatziki.png" },
        { name: "VEGAN Döner Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Sesam_och_doner_sas.png" },
        { name: "VEGAN Vitlök Dip", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Vitlok.png" }
      ]
    },
    {
      title: "Drycker",
      items: [
        { name: "Coca-Cola Original 33cl", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Coca-Cola_Original_33cl.png" },
        { name: "Coca-Cola Zero 33cl", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Coca-Cola_Zero_33cl.png" },
        { name: "Fanta Orange 33cl", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Fanta_Orange_33cl.png" },
        { name: "Fanta Exotic 33cl", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Fanta_Exotic_33cl.png" },
        { name: "Sprite zero 33cl", description: "", price: "25 kr", image: "https://qopla.s3-eu-west-1.amazonaws.com/foodIcons/Sprite_Zero_33cl.jpg" },
        { name: "Bonaqua Naturell 33cl", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Bonaqua_Naturell_33cl.png" },
        { name: "Bonaqua Citron/Lime 33cl", description: "", price: "25 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Bonaqua_Citron_Lime_33cl.png" },
        { name: "Monster Energy 50cl", description: "", price: "35 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Monster_Energy_50cl.png" },
        { name: "Monster Energy Ultra 50cl", description: "", price: "35 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Monster_Energy_Ultra_50cl.png" },
        { name: "Monster Energy Mango Loco 50cl", description: "", price: "35 kr", image: "https://s3-eu-west-1.amazonaws.com/qopla/65e2c8c612d1552cbc48948f/Gallery/medium/Monster_Energy_Mango_Loco_50cl.png" }
      ]
    }
  ];

  return (
    <section className="pt-32 pb-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-4">VÅR MENY</h1>
            <div className="h-2 w-24 bg-red-600"></div>
          </div>
          <p className="text-gray-400 max-w-md text-lg">
            Utforska Linköpings mest autentiska tyska döner. Varje rätt är tillagad med omsorg och passion.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {menuCategories.map((category) => {
            const isOpen = openCategories.includes(category.title);
            return (
              <div key={category.title} className="border-b border-white/10 pb-6 md:pb-8">
                <button 
                  onClick={() => toggleCategory(category.title)}
                  className="w-full text-left flex items-center justify-between group"
                >
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase flex items-center gap-4">
                    <span className="text-red-600">/</span> {category.title}
                  </h2>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:text-red-600 transition-colors" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
                        {category.items.map((item) => (
                          <div key={item.name} className="group bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 hover:border-red-600/50 transition-all duration-300 flex gap-4 items-start relative">
                            <div className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg ${item.name === "Snacks Box & Pommes" ? "bg-white/5" : "bg-white"}`}>
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-grow flex flex-col min-h-[80px] md:min-h-[96px]">
                              <h3 className="text-sm md:text-base font-bold tracking-tight mb-1 group-hover:text-red-500 transition-colors line-clamp-1">{item.name}</h3>
                              <p className="text-gray-500 text-[11px] md:text-xs leading-tight line-clamp-2 mb-2">{item.description}</p>
                              <div className="mt-auto flex justify-end">
                                <p className="text-xs md:text-sm font-black text-white">{item.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-24 text-center">
          <a 
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full text-xl font-black uppercase tracking-tighter transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
          >
            Beställ Online Nu
          </a>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const galleryImages = [
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac58b336702f4ca9449e51.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac587db003fac987160c4a.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac5905618c8d7ae355ed00.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac587d7bdf380297cadf77.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac58b3b003faf9761615e5.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac59047bdf3852c4caf6fe.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac5895618c8d6e2c55da76.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac587e36702f53584493f8.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac58b37bdf38e9a9cae97b.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac587d618c8d7a5c55d4b7.webp",
    "https://assets.cdn.filesafe.space/1FYpgqYgXr6SzFnCzKew/media/69ac5905618c8d69a255ed04.webp"
  ];

  // Duplicate the array for infinite scroll
  const displayImages = [...galleryImages, ...galleryImages];

  return (
    <section className="py-20 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Galleri</h2>
        <div className="h-1 w-20 bg-red-600"></div>
      </div>
      
      <div className="flex whitespace-nowrap animate-scroll w-max">
        {displayImages.map((src, i) => (
          <div key={i} className="px-2 flex-shrink-0">
            <div className="w-[280px] md:w-[400px] aspect-[4/5] overflow-hidden rounded-2xl group relative">
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meny" element={<MenuPage />} />
        </Routes>
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
