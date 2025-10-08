import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/footer'; 
import { 
  Play, 
  Heart, 
  Building2, 
  MessageCircle, 
  Sparkles,
  Film,
  
  Eye,
  X,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Import the CSS file
import '../styles/Portfolio.css';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPopup, setVideoPopup] = useState<string | null>(null);
  const projectsPerPage = 6;

  const heroSlides = [
    {
      id: 1,
      image: '/src/assets/wedpic.jpg',
      video: '/wedding.mp4',
      title: 'Luxury Wedding in Santorini',
      category: 'Wedding',
      views: '25K'
    },
    {
      id: 2,
      image: '/src/assets/villapic.jpg',
      video: '/villa.mp4',
      title: 'Modern Villa Showcase',
      category: 'Real Estate',
      views: '18K'
    },
    {
      id: 3,
      image: '/src/assets/filmpic.jpg',
      video: '/film.mp4',
      title: 'Corporate Brand Film',
      category: 'Commercial',
      views: '32K'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects', icon: Sparkles, count: 48 },
    { id: 'wedding', name: 'Weddings', icon: Heart, count: 25 },
    { id: 'realestate', name: 'Real Estate', icon: Building2, count: 12 },
    { id: 'talkinghead', name: 'Talking Head', icon: MessageCircle, count: 8 },
    { id: 'commercial', name: 'Commercial', icon: Film, count: 3 }
  ];

  const projects = [
    {
      id: 1,
      title: "Emily & James Wedding",
      category: 'wedding',
      thumbnail: '/src/assets/wedpic.jpg',
      video: '/wedding.mp4',
      description: "A breathtaking destination wedding in Santorini",
      views: '12.5K',
      likes: '2.1K'
    },
    {
      id: 2,
      title: "Luxury Villa Tour",
      category: 'realestate',
      thumbnail: '/src/assets/villapic.jpg',
      video: '/villa.mp4',
      description: "Modern architectural masterpiece in Beverly Hills",
      views: '8.2K',
      likes: '1.5K'
    },
    {
      id: 3,
      title: "CEO Interview - Tech Startup",
      category: 'talkinghead',
      thumbnail: '/src/assets/techpic.jpg',
      video: '/intro.mp4',
      description: "Professional corporate interview series",
      views: '5.8K',
      likes: '892'
    },
    {
      id: 4,
      title: "Brand Launch Campaign",
      category: 'commercial',
      thumbnail: '/src/assets/filmpic.jpg',
      video: '/film.mp4',
      description: "High-energy product launch video",
      views: '15.3K',
      likes: '3.2K'
    },
    {
      id: 5,
      title: "Sarah & Michael Engagement",
      category: 'wedding',
      thumbnail: '/src/assets/wedpic2.jpg',
      video: '/weddinf.mp4',
      description: "Romantic engagement story in Paris",
      views: '9.7K',
      likes: '1.8K'
    },
    {
      id: 6,
      title: "Downtown Penthouse",
      category: 'realestate',
      thumbnail: '/src/assets/pentpic.jpg',
      video: '/penthouse.mp4',
      description: "Stunning city views and modern design",
      views: '6.4K',
      likes: '1.1K'
    },
    {
      id: 7,
      title: "Expert Series - Finance",
      category: 'talkinghead',
      thumbnail: '/src/assets/villapic.jpg',
      video: '/film.mp4',
      description: "Educational content for online courses",
      views: '4.2K',
      likes: '687'
    },
    {
      id: 8,
      title: "Restaurant Grand Opening",
      category: 'commercial',
      thumbnail: '/src/assets/pentpic.jpg',
      video: '/penthouse.mp4',
      description: "Culinary experience showcase",
      views: '7.9K',
      likes: '1.4K'
    },
    {
      id: 9,
      title: "Vineyard Wedding Film",
      category: 'wedding',
      thumbnail: '/src/assets/wedpic.jpg',
      video: '/wedding.mp4',
      description: "Rustic elegance in Napa Valley",
      views: '11.3K',
      likes: '2.4K'
    },
    {
      id: 10,
      title: "Beachfront Property",
      category: 'realestate',
      thumbnail: '/src/assets/villapic.jpg',
      video: '/villa.mp4',
      description: "Oceanfront luxury living experience",
      views: '9.1K',
      likes: '1.7K'
    },
    {
      id: 11,
      title: "Tech CEO Profile",
      category: 'talkinghead',
      thumbnail: '/src/assets/videographerman.jpg',
      video: '/intro.mp4',
      description: "Leadership insights and vision",
      views: '6.5K',
      likes: '982'
    },
    {
      id: 12,
      title: "Fashion Brand Campaign",
      category: 'commercial',
      thumbnail: '/src/assets/filmpic.jpg',
      video: '/film.mp4',
      description: "Spring collection showcase",
      views: '13.8K',
      likes: '2.9K'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header />

      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
            </div>
          ))}
        </div>

        {/* Video Player Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
                <Film className="text-purple-400" size={20} />
                <span className="text-purple-300 text-sm font-medium">Featured Project</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                <span className="px-4 py-2 bg-purple-600/30 rounded-full text-sm">
                  {heroSlides[currentSlide].category}
                </span>
                <div className="flex items-center gap-2 text-gray-300">
                  <Eye size={18} />
                  <span>{heroSlides[currentSlide].views} views</span>
                </div>
              </div>
              <button
                onClick={() => setVideoPopup(heroSlides[currentSlide].video)}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 mx-auto md:mx-0"
              >
                <Play size={24} className="group-hover:scale-110 transition-transform" />
                Watch Full Video
              </button>
            </div>

            {/* Right: Video Preview */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20">
                <video
                  src={heroSlides[currentSlide].video}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setVideoPopup(heroSlides[currentSlide].video)}
                    className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
                  >
                    <Play size={32} fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      {/* Category Filter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in-section opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Work</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16 fade-in-section opacity-0">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`group px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:border-purple-500/30 border border-gray-700'
                  }`}
                >
                  <IconComponent size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>{category.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-700'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className="fade-in-section opacity-0 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-500 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:scale-105 transform">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setVideoPopup(project.video)}
                        className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
                      >
                        <Play size={24} fill="white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Eye size={16} />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Heart size={16} />
                          <span>{project.likes}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setVideoPopup(project.video)}
                        className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-sm font-semibold group"
                      >
                        Watch
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 fade-in-section opacity-0">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A0D2A] to-gray-900">
        <div className="max-w-4xl mx-auto text-center fade-in-section opacity-0">
          <h2 className="text-5xl font-bold mb-6">Ready to Create Your Masterpiece?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Let's bring your vision to life with cinematic excellence. Contact us today to start your project.
          </p>
          <button
            onClick={handleContactClick}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-purple-500/50 mx-auto"
          >
            Start Your Project
            <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />

      {/* Video Popup Modal */}
      {videoPopup && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeInUp">
          <button
            onClick={() => setVideoPopup(null)}
            className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <div className="max-w-5xl w-full">
            <video
              src={videoPopup}
              controls
              autoPlay
              className="w-full rounded-2xl shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;