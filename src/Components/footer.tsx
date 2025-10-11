import { Instagram, Youtube, Twitter, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-hsl(220 10% 15% / 1) text-white py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        {/* Brand Section */}
        <div className="animate-fadeInUp">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
            Alex Rodriguez
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 lg:mb-6 transition-colors duration-300 hover:text-gray-300">
            Professional videographer creating cinematic stories that inspire and engage audiences worldwide.
          </p>
          <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-pulse"></div>
          <div className="mt-3 sm:mt-4 lg:mt-6 space-y-1.5 sm:space-y-2">
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 hover:translate-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="group-hover:text-purple-300 transition-colors duration-300 break-all">alex@alexrodriguez.video</span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 hover:translate-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="group-hover:text-purple-300 transition-colors duration-300">+1 (555) 123-4567</span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 hover:translate-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="group-hover:text-purple-300 transition-colors duration-300">Los Angeles, CA</span>
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 lg:mt-6">
            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50">
              <Instagram size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 hover:rotate-12" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50">
              <Youtube size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 hover:rotate-12" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50">
              <Twitter size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 hover:rotate-12" />
            </a>
            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50">
              <Linkedin size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 hover:rotate-12" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 text-white transition-colors duration-300 hover:text-purple-400">Quick Links</h3>
          <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3">
            {['Home', 'About', 'Portfolio', 'Contact'].map((link, index) => (
              <li key={link} style={{ animationDelay: `${0.1 + index * 0.05}s` }} className="animate-fadeInLeft">
                <a
                  href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 text-xs sm:text-sm inline-block hover:translate-x-2 relative group"
                >
                  <span className="relative z-10">{link}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 text-white transition-colors duration-300 hover:text-purple-400">Services</h3>
          <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3">
            {['Wedding Videography', 'Corporate Videos', 'Real Estate Tours', 'Commercial Production', 'Event Coverage', 'Brand Storytelling'].map((service, index) => (
              <li key={service} style={{ animationDelay: `${0.2 + index * 0.05}s` }} className="animate-fadeInLeft">
                <a
                  href="/services"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 text-xs sm:text-sm inline-block hover:translate-x-2 relative group"
                >
                  <span className="relative z-10">{service}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Stay Updated */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 text-white transition-colors duration-300 hover:text-purple-400">Stay Updated</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed transition-colors duration-300 hover:text-gray-300">
            Subscribe to receive updates on new projects, behind-the-scenes content, and videography tips.
          </p>
          <div className="space-y-2 sm:space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-800 text-gray-300 text-xs sm:text-sm py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:bg-gray-750 focus:bg-gray-750 transform focus:scale-105"
            />
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 group text-xs sm:text-sm">
              <Send size={14} className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-16 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <p className="transition-colors duration-300 hover:text-purple-400 text-center md:text-left">© 2024 Alex Rodriguez. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
          <a href="/privacy-policy" className="hover:text-purple-400 transition-all duration-300 relative group whitespace-nowrap">
            <span className="relative z-10">Privacy Policy</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/terms-of-service" className="hover:text-purple-400 transition-all duration-300 relative group whitespace-nowrap">
            <span className="relative z-10">Terms of Service</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-purple-400 transition-all duration-300 relative group whitespace-nowrap">
            <span className="relative z-10">Back to Top</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;