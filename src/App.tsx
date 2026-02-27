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
  ChevronRight
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
    { name: 'Hitta oss', to: '/#locations' },
    { name: 'Öppettider', to: '/#hours' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
