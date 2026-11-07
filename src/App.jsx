import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowDown, ChevronRight, Mail, Phone, MapPin, Check, Menu, X } from 'lucide-react';

export default function App() {
  const heroVideoRef = useRef(null);
  const [selectedPalette, setSelectedPalette] = useState('palette-1');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback or retry on user interaction if browser policy requires it
        });
      }
    }
  }, []);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    scope: 'Full Residential Architecture & Interior',
    budget: '$500k - $1M'
  });

  const materials = {
    'palette-1': {
      title: 'Roman Travertine',
      description: 'Porous calcareous limestone with warm beige and ivory veins sourced directly from Italian quarries.',
      hex: '#e6dfd5'
    },
    'palette-2': {
      title: 'Smoked French Oak',
      description: 'Deep fumed timber with herringbone weaving and natural oil finishes for rich tactile depth.',
      hex: '#4a3b32'
    },
    'palette-3': {
      title: 'Brushed Bronze & Brass',
      description: 'Living metallic accents crafted to patinate gracefully over time through natural oxidation.',
      hex: '#8c7a6b'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1a1a1a]">
      {/* Navigation Header - Merged with Hero Video & Mobile Responsive */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : mobileMenuOpen
            ? 'bg-black/40 backdrop-blur-md border-b border-white/10 py-3.5'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent border-b border-white/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2.5 sm:space-x-3 group">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] group-hover:scale-125 transition shrink-0"></span>
            <span className="font-serif text-sm sm:text-base md:text-xl tracking-[0.16em] sm:tracking-[0.25em] uppercase font-light text-white whitespace-nowrap">
               INTERIORS
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-gray-300 font-light border-l border-white/30 pl-2.5 hidden lg:inline">
              ATELIER
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-xs tracking-[0.22em] uppercase font-light text-gray-200">
            <a href="#vision" className="hover:text-white transition">Vision</a>
            <a href="#residences" className="hover:text-white transition">Interiors</a>
            <a href="#materiality" className="hover:text-white transition">Materiality</a>
            <a href="#film" className="hover:text-white transition">Film</a>
            <a href="#enquiry" className="hover:text-white transition">Enquiry</a>
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            <a
              href="#enquiry"
              className="px-3 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light text-white border border-white/40 hover:border-white hover:bg-white hover:text-black transition duration-300"
            >
              Schedule Meet
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white hover:text-[#d4af37] transition focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Transparent Glassmorphism */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/35 backdrop-blur-md border-t border-white/10 px-6 py-6 shadow-2xl transition-all duration-300">
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium">
                Menu
              </span>
              <nav className="flex flex-col space-y-1">
                {[
                  { name: 'Vision & Philosophy', href: '#vision' },
                  { name: 'Interiors & Residences', href: '#residences' },
                  { name: 'Materiality & Finishes', href: '#materiality' },
                  { name: 'Cinema & Studio Reel', href: '#film' },
                  { name: 'Private Consultation', href: '#enquiry' },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-xs uppercase tracking-[0.2em] text-gray-200 hover:text-white hover:pl-2 transition-all border-b border-white/10"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </nav>

              <div className="pt-3">
                <a
                  href="#enquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-3 text-xs uppercase tracking-[0.22em] font-light text-white border border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition duration-300"
                >
                  Schedule A Consultation
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Fullscreen Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-75 scale-[1.01]"
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
          >
            <source src="/13470979_1920_1080_24fps.mp4" type="video/mp4" />
            <source src="/videos/hero.mp4" type="video/mp4" />
            Your browser does not support this .
          </video>
          {/* Cinematic dark scrim overlay: pristine contrast, zero washed-out white gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/75 pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 pt-16">
          <span className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-medium block mb-4 drop-shadow">
            Haute Couture & Bespoke Silhouettes
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-8 tracking-tight drop-shadow-md">
            Form, Fabric & Elegance.
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow">
            An uncompromising celebration of artisanal draping, sculpted silhouettes, and masterfully woven luxury textiles tailored for timeless grace and fluid motion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#residences"
              className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-white border-b border-white pb-2 hover:text-[#d4af37] hover:border-[#d4af37] transition duration-300"
            >
              <span>Explore The Collection</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Vision / Philosophy Section */}
      <section id="vision" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8c7a6b] font-medium block mb-3">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8">
              Spaces Designed to Evoke Quiet Contemplation.
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 mb-6 font-light">
              Founded on the principles of spatial harmony and natural light integration,  Interiors creates bespoke residential spaces that celebrate raw materials and meticulous craftsmanship.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 font-light mb-8">
              Every project is an exercise in reduction, discarding non-essential ornamentation to allow pure geometry and texture to take center stage.
            </p>
            <div className="flex space-x-12 pt-4 border-t border-[#1a1a1a]/10">
              <div>
                <div className="font-serif text-3xl font-light">14+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Global Awards</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-light">80+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Residences Completed</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
              alt="Interior Architectural Detail" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Residences Portfolio Grid */}
      <section id="residences" className="py-24 bg-[#e6dfd5]/40 border-y border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8c7a6b] font-medium block mb-3">Portfolio</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">Featured Residences</h2>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-4 md:mt-0">Selected Projects 2024–2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'The Monolith Residence',
                location: 'Kyoto, Japan',
                year: '2025',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Villa Subterranean',
                location: 'Zurich, Switzerland',
                year: '2025',
                image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Travertine Courtyard',
                location: 'Melbourne, Australia',
                year: '2024',
                image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
              }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-gray-300">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl font-light group-hover:text-[#8c7a6b] transition">{item.title}</h3>
                  <span className="text-xs text-gray-500">{item.year}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Raw Materiality Section */}
      <section id="materiality" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8c7a6b] font-medium block mb-3">Tactile Palette</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Raw Materiality in Focus</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Select a primary surface palette to inspect spatial finishes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(materials).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedPalette(key)}
              className={`p-8 text-left border transition text-left ${
                selectedPalette === key 
                  ? 'border-[#1a1a1a] bg-white shadow-xl' 
                  : 'border-[#1a1a1a]/10 bg-transparent hover:border-[#1a1a1a]/40'
              }`}
            >
              <div 
                className="w-8 h-8 rounded-full mb-6 border border-[#1a1a1a]/20"
                style={{ backgroundColor: item.hex }}
              />
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Palette {key.replace('palette-', '0')}</span>
              <h3 className="font-serif text-2xl font-light mb-3">{item.title}</h3>
              <p className="text-xs text-gray-600 font-light leading-relaxed">{item.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Studio Reel Section */}
      <section id="film" className="py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8c7a6b] font-medium block mb-3">Cinema</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white">Studio Reel</h2>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-4 md:mt-0">1080p Architectural Motion</p>
          </div>

          <div className="relative aspect-video w-full bg-gray-900 overflow-hidden rounded-sm group cursor-pointer border border-white/10">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
            >
              <source src="/13470979_1920_1080_24fps.mp4" type="video/mp4" />
              <source src="/videos/reel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Private Consultation & Enquiry Form */}
      <section id="enquiry" className="py-28 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8c7a6b] font-medium block mb-3">Initiate Dialogue</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4"> Consultation</h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Commissioning luxury architectural interiors</p>
        </div>

        {formSubmitted ? (
          <div className="p-12 border border-[#1a1a1a] bg-white text-center">
            <div className="w-12 h-12 bg-[#8c7a6b] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-3xl font-light mb-3">Brief Received</h3>
            <p className="text-sm text-gray-600 font-light max-w-md mx-auto mb-8">
              Thank you, {formData.name}. Our studio leads will review your commission details for {formData.location || 'your project'} and reach out shortly.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="px-8 py-3 text-xs uppercase tracking-widest border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 md:p-14 border border-[#1a1a1a]/10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-b border-[#1a1a1a]/30 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition bg-transparent"
                  placeholder="e.g. Eleanor Vance"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-b border-[#1a1a1a]/30 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition bg-transparent"
                  placeholder="eleanor@domain.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Project Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border-b border-[#1a1a1a]/30 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition bg-transparent"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Est. Investment Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full border-b border-[#1a1a1a]/30 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition bg-transparent"
                >
                  <option value="$250k - $500k">$250,000 – $500,000</option>
                  <option value="$500k - $1M">$500,000 – $1,000,000</option>
                  <option value="$1M+">$1,000,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Project Scope</label>
              <select
                name="scope"
                value={formData.scope}
                onChange={handleInputChange}
                className="w-full border-b border-[#1a1a1a]/30 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition bg-transparent"
              >
                <option value="Full Residential Architecture & Interior">Full Residential Architecture & Interior</option>
                <option value="Interior Renovation & Styling">Interior Renovation & Styling</option>
                <option value="Custom Furniture & Spatial Curation">Custom Furniture & Spatial Curation</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#1a1a1a] text-white text-xs uppercase tracking-widest hover:bg-[#8c7a6b] transition duration-300"
            >
              Submit Architectural Brief
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16 px-6 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
            <span className="font-serif text-lg tracking-widest uppercase">Interiors</span>
          </div>

          <div className="flex space-x-8 text-gray-400 tracking-widest uppercase">
            <span>Kyoto</span>
            <span>Zurich</span>
            <span>Melbourne</span>
          </div>

          <p className="text-gray-500">© 2026 Interiors Studio. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}