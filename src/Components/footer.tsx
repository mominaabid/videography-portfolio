

const Footer = () => {
  return (
    <footer className="bg-hsl(220 10% 15% / 1) text-white py-8 sm:py-10 lg:py-12 px-3 sm:px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-8 lg:gap-8">
        {/* Brand Section */}
        <div className="animate-fadeInUp">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
            Muhammad Daud
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 lg:mb-6 transition-colors duration-300 hover:text-gray-300">
            Crafting visual poetry through the lens. Every frame tells a story, every moment becomes timeless. Transforming your vision into cinematic masterpieces that resonate with emotion and artistry.
          </p>
          <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-pulse"></div>
        </div>

        {/* Contact Info */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 text-white transition-colors duration-300 hover:text-purple-400">Contact</h3>
          <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 hover:translate-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="group-hover:text-purple-300 transition-colors duration-300 break-all">muhammad.daud.editor@gmail.com</span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 hover:translate-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="group-hover:text-purple-300 transition-colors duration-300">+923028974047</span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-all duration-300 hover:translate-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="group-hover:text-purple-300 transition-colors duration-300">Islamabad, Pakistan</span>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 text-white transition-colors duration-300 hover:text-purple-400">Quick Links</h3>
          <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3">
            {['Home', 'About', 'Portfolio'].map((link, index) => (
              <li key={link} style={{ animationDelay: `${0.2 + index * 0.05}s` }} className="animate-fadeInLeft">
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
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 text-white transition-colors duration-300 hover:text-purple-400">Services</h3>
          <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3">
            {['Real Estate', 'Wedding', 'Talking Head', 'Others'].map((service, index) => (
              <li key={service} style={{ animationDelay: `${0.3 + index * 0.05}s` }} className="animate-fadeInLeft">
                <a
                  href="/portfolio"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 text-xs sm:text-sm inline-block hover:translate-x-2 relative group"
                >
                  <span className="relative z-10">{service}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6 lg:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <p className="transition-colors duration-300 hover:text-purple-400 text-center md:text-left">© 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;