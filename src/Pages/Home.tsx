import  { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { Play, Award, Film } from 'lucide-react';

const Home = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Cinematic Excellence',
    'Visual Storytelling',
    'Timeless Memories',
    'Creative Vision',
    'Artistic Narratives'
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentPhrase.length) {
          setTypewriterText(currentPhrase.substring(0, typewriterText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(currentPhrase.substring(0, typewriterText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, currentPhraseIndex]);

  return (
    <>
      <Header />
      
      {/* Hero Section with Background Video */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Award Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
              <Award className="text-purple-400" size={20} />
              <span className="text-purple-300 text-sm font-medium">Award-Winning Videographer</span>
            </div>

            {/* Main Heading with Typewriter */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-white block mb-2">Capturing</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 block min-h-[1.2em]">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Transforming your precious moments into breathtaking visual stories through professional cinematography and creative excellence
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-purple-500/50">
                <Play size={24} className="group-hover:scale-110 transition-transform" />
                Watch Portfolio Reel
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-400 text-sm md:text-base">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">15+</div>
                <div className="text-gray-400 text-sm md:text-base">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm md:text-base">Awards Won</div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <p className="text-white/70 text-xs mt-2">Scroll Down</p>
            </div>
          </div>
        </div>

        {/* Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>

      {/* Additional Sections (Optional) */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Story, Beautifully Told
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every frame matters. We blend artistry with cutting-edge technology to create videos that resonate and inspire.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                <Film className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Wedding Films</h3>
              <p className="text-gray-400">Capturing the magic of your special day with cinematic elegance and emotional depth.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                <Play className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Commercial Videos</h3>
              <p className="text-gray-400">Elevate your brand with compelling video content that drives engagement and results.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                <Award className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Documentary</h3>
              <p className="text-gray-400">Tell powerful stories that inspire, educate, and leave a lasting impact on viewers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;