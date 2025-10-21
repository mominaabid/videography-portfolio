import { useState, useEffect } from 'react';
import {
  Play,
  Heart,
  Building2,
  MessageCircle,
  Sparkles,
  Film,
  Eye,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  image: string;
  video: string;
  category: string;
  views: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

interface Project {
  id: number;
  title: string;
  category: number;
  thumbnail: string;
  video: string;
  description: string;
  views: string;
  likes: string;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Heart,
  Building2,
  MessageCircle,
  Film,
};

const Portfolio = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPopup, setVideoPopup] = useState<string | null>(null);
  const projectsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, catRes, projRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/portfolio/hero-slides/'),
          fetch('http://127.0.0.1:8000/portfolio/categories/'),
          fetch('http://127.0.0.1:8000/portfolio/projects/'),
        ]);

        const heroData = await heroRes.json();
        const catData = await catRes.json();
        const projData = await projRes.json();

        setHeroSlides(heroData.results || heroData);
        setCategories(catData.results || catData);
        setProjects(projData.results || projData);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleCategoryChange = (categoryId: number | 'all') => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Hero Section - Optimized heights */}
      <section className="relative h-[85vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
        {/* Background Slides */}
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
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="text-center md:text-left space-y-3 sm:space-y-4 md:space-y-5">
                <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <Film className="text-purple-400" size={16} />
                  <span className="text-purple-300 text-xs sm:text-sm font-medium">
                    Featured Project
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2 sm:px-0">
                  {heroSlides[currentSlide]?.title || 'Amazing Project'}
                </h1>
                
                <div className="flex items-center justify-center md:justify-start flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-purple-600/30 rounded-full text-xs sm:text-sm">
                    {heroSlides[currentSlide]?.category || 'Category'}
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300 text-xs sm:text-sm">
                    <Eye size={16} />
                    <span>{heroSlides[currentSlide]?.views || '0'} views</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={() => setVideoPopup(heroSlides[currentSlide]?.video)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-500/30"
                  >
                    <Play size={18} />
                    <span>Watch Full Video</span>
                  </button>
                </div>
              </div>

              {/* Right Video Preview - Desktop Only */}
              <div className="hidden md:block relative">
                <div className="overflow-hidden rounded-xl border-2 sm:border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20 aspect-video">
                  <video
                    src={heroSlides[currentSlide]?.video}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {heroSlides.length > 1 && (
          <>
            {/* Arrow Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-purple-500 w-6 sm:w-8'
                      : 'bg-white/40 hover:bg-white/60 w-1.5 sm:w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Projects Section - Reduced padding */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              Explore Our{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Work
              </span>
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          {/* Category Filters - Horizontally scrollable on mobile */}
          <div className="mb-6 sm:mb-8">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Sparkles size={14} className="sm:w-4 sm:h-4" />
                  <span>All Projects</span>
                </button>
                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon] || Sparkles;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <Icon size={14} className="sm:w-4 sm:h-4" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Projects Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {currentProjects.map((p) => (
              <div
                key={p.id}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Thumbnail with Play Button */}
                <div className="relative aspect-video overflow-hidden bg-gray-800">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button
                    onClick={() => setVideoPopup(p.video)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Play ${p.title}`}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={18} className="sm:w-5 sm:h-5 fill-white ml-0.5" />
                    </div>
                  </button>
                </div>
                
                {/* Project Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Eye size={14} />
                    <span>{p.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 sm:px-4 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm transition"
              >
                Previous
              </button>
              
              <div className="flex gap-1 sm:gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 sm:px-4 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Reduced padding */}
      <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-br from-purple-900/20 to-gray-900 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-4">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="text-gray-300 mb-5 sm:mb-7 text-sm sm:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Let's bring your vision to life with cinematic excellence.
          </p>
          <button
            onClick={() => (window.location.href = '/contact')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 active:scale-95 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-lg shadow-purple-500/30"
          >
            Start Your Project
          </button>
        </div>
      </section>

      {/* Video Modal - Fully responsive */}
      {videoPopup && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
          <button
            onClick={() => setVideoPopup(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            aria-label="Close video"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
          <div className="max-w-5xl w-full">
            <video
              src={videoPopup}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg shadow-2xl aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;