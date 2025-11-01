'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Transition, type Easing } from 'framer-motion';
import Footer from '../Components/footer';
import Header from '../Components/Header';
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
  image_url?: string;
  video_url?: string;
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
  video_url?: string;
  thumbnail_url?: string;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Heart,
  Building2,
  MessageCircle,
  Film,
};

/* --------------------------------------------------------------
   Spring & easing presets – typed correctly
   -------------------------------------------------------------- */
const spring: Transition = { type: 'spring', stiffness: 180, damping: 22 };
const easeOutExpo: Easing = [0.16, 1, 0.3, 1] as const;

export default function Portfolio() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPopup, setVideoPopup] = useState<string | null>(null);
  const projectsPerPage = 6;

  /* --------------------------------------------------------------
     Data fetch
     -------------------------------------------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, catRes, projRes] = await Promise.all([
          fetch('https://backendvideography.vercel.app/api/portfolio/hero-slides/'),
          fetch('https://backendvideography.vercel.app/api/portfolio/categories/'),
          fetch('https://backendvideography.vercel.app/api/portfolio/projects/'),
        ]);

        const [heroData, catData, projData] = await Promise.all([
          heroRes.json(),
          catRes.json(),
          projRes.json(),
        ]);

        setHeroSlides(heroData.results || heroData);
        setCategories(catData.results || catData);
        setProjects(projData.results || projData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* --------------------------------------------------------------
     Auto-advance hero
     -------------------------------------------------------------- */
  useEffect(() => {
    if (!heroSlides.length) return;
    const id = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroSlides.length),
      6000
    );
    return () => clearInterval(id);
  }, [heroSlides]);

  /* --------------------------------------------------------------
     Filtering & pagination
     -------------------------------------------------------------- */
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const start = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(start, start + projectsPerPage);

  const changeCategory = (id: number | 'all') => {
    setSelectedCategory(id);
    setCurrentPage(1);
  };
  const nextSlide = () =>
    setCurrentSlide((p) => (p + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);

  /* --------------------------------------------------------------
     Loading screen
     -------------------------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-sm">Loading portfolio…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-x-hidden">
      <Header />

      {/* ==================== HERO ==================== */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Slides */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            {heroSlides.map(
              (s, i) =>
                i === currentSlide && (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: easeOutExpo }}
                    className="absolute inset-0"
                  >
                    <img
                      src={s.image_url || s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-4 lg:px-8">
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="space-y-5 text-center md:text-left"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...spring, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-full"
              >
                <Film className="text-purple-400" size={16} />
                <span className="text-purple-300 text-sm font-medium">
                  Featured Project
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                {heroSlides[currentSlide]?.title ?? 'Amazing Project'}
              </motion.h1>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: easeOutExpo, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-3"
              >
                <span className="px-4 py-1.5 bg-purple-600/30 rounded-full text-sm">
                  {heroSlides[currentSlide]?.category ?? 'Category'}
                </span>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Eye size={16} />
                  <span>{heroSlides[currentSlide]?.views ?? '0'} views</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...spring, delay: 0.7 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() =>
                  setVideoPopup(
                    heroSlides[currentSlide]?.video_url ||
                      heroSlides[currentSlide]?.video
                  )
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/30"
              >
                <Play size={18} />
                Watch Full Video
              </motion.button>
            </motion.div>

            {/* Right – video preview (desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 120, rotateY: 20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.6 }}
              className="hidden md:block relative rounded-xl overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20 aspect-video"
            >
              <video
                src={
                  heroSlides[currentSlide]?.video_url ||
                  heroSlides[currentSlide]?.video
                }
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        {heroSlides.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </motion.button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-purple-500 w-8' : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section className="py-16 px-4 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
            viewport={{ once: true, margin: '-120px' }}
            className="text-center text-3xl md:text-4xl font-bold mb-4"
          >
            Explore Our{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Work
            </span>
          </motion.h2>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => changeCategory('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <Sparkles size={16} />
              All Projects
            </motion.button>

            {categories.map((c, i) => {
              const Icon = iconMap[c.icon] ?? Sparkles;
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: easeOutExpo,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => changeCategory(c.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition ${
                    selectedCategory === c.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {c.name}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentProjects.map((p, idx) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 80, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ ...spring, delay: idx * 0.07 }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    transition: { duration: 0.35 },
                  }}
                  className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-400 shadow-lg hover:shadow-purple-500/20"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-800">
                    <motion.img
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      src={p.thumbnail_url || p.thumbnail}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <button
                      onClick={() =>
                        setVideoPopup(p.video_url || p.video)
                      }
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl"
                      >
                        <Play className="ml-0.5 fill-white" size={20} />
                      </motion.div>
                    </button>
                  </div>

                  {/* Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="p-5"
                  >
                    <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                      {p.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Eye size={14} />
                      <span>{p.views}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOutExpo }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-3 mt-12"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from(
                  { length: Math.min(totalPages, 5) },
                  (_, i) => {
                    const page =
                      totalPages <= 5
                        ? i + 1
                        : currentPage <= 3
                        ? i + 1
                        : currentPage >= totalPages - 2
                        ? totalPages - 4 + i
                        : currentPage - 2 + i;
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                      >
                        {page}
                      </motion.button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 bg-gradient-to-br from-purple-900/20 to-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            Ready to Create Your Masterpiece?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: easeOutExpo }}
            viewport={{ once: true }}
            className="text-gray-300 mb-6 max-w-xl mx-auto"
          >
            Let's bring your vision to life with cinematic excellence.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => (window.location.href = '/contact')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg shadow-purple-500/30"
          >
            Start Your Project
          </motion.button>
        </div>
      </section>

      <Footer />

      {/* ==================== VIDEO MODAL ==================== */}
      <AnimatePresence>
        {videoPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={spring}
              onClick={() => setVideoPopup(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              className="max-w-5xl w-full"
            >
              <video
                src={videoPopup}
                controls
                autoPlay
                playsInline
                className="w-full rounded-lg shadow-2xl aspect-video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}