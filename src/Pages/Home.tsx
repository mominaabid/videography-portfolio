import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/footer';
import Testimonials from '../Components/Testimonials';
import {
  Play, Award, Calendar, Users, MapPin, ArrowUpRight, HelpCircle,
  PenTool, Palette, Music, MessageCircle, Edit3, Cpu, Camera, Laptop, Workflow, Wifi,
  Sparkles, Heart, Building2, Film, Eye, X
} from 'lucide-react';

// Define interfaces for API data
interface Hero {
  id?: number;
  title: string;
  typewriter_phrases: string | string[];
  subtitle: string;
  video: string;
  video_url?: string;
  primary_button_text: string;
  secondary_button_text: string;
  is_active: boolean;
}

interface Stat {
  id?: number;
  name: string;
  value: string;
  suffix: string;
  icon: string;
  order: number;
  is_active: boolean;
}

interface Intro {
  id?: number;
  title: string;
  subtitle: string;
  image: string;
  image_url?: string;
  achievements: string | string[] | null;
  primary_button_text: string;
  secondary_button_text: string;
  is_active: boolean;
}

interface Skill {
  id?: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

interface Service {
  id?: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

interface Process {
  id?: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

interface Tool {
  id?: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

interface FAQ {
  id?: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
}

interface CTA {
  id?: number;
  title: string;
  description: string;
  button_text: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface TabContent {
  id: number;
  tab_name: string;
  title: string;
  content: string;
  image?: string;
  image_url?: string;
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

interface Counts {
  yearsExp: number;
  happyClients: number;
  awardsWon: number;
  citiesCov: number;
}

const BASE_URL = 'https://backendvideography.vercel.app';

// Helper function to extract data from paginated response
const extractData = <T,>(response: any): T[] => {
  console.log('Raw response:', response);
  if (response && response.results && Array.isArray(response.results)) {
    return response.results;
  }
  if (Array.isArray(response)) {
    return response;
  }
  return [];
};

// Helper function to parse stat value to number for animation
const parseStatValue = (value: string): number => {
  const match = value.match(/^(\d+)([MK]?)$/);
  if (!match) {
    console.warn(`Invalid stat value format: ${value}`);
    return 0;
  }
  const num = parseInt(match[1]);
  const suffix = match[2];
  if (suffix === 'M') return num * 1_000_000;
  if (suffix === 'K') return num * 1_000;
  return num;
};

const Home = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [intro, setIntro] = useState<Intro | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [cta, setCta] = useState<CTA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [counts, setCounts] = useState<Counts>({
    yearsExp: 0,
    happyClients: 0,
    awardsWon: 0,
    citiesCov: 0,
  });
  const statsRef = useRef<HTMLDivElement>(null);
  const [phrases, setPhrases] = useState<string[]>(['Cinematic Excellence']);
  const [tabContent, setTabContent] = useState<TabContent[]>([]);
  const [activeTab, setActiveTab] = useState<string>("story");
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPopup, setVideoPopup] = useState<string | null>(null);
  const projectsPerPage = 6;

  // Fetch all API data including portfolio data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          heroRes,
          statsRes,
          introRes,
          skillsRes,
          servicesRes,
          processesRes,
          toolsRes,
          faqsRes,
          ctaRes,
          tabsRes,
          categoriesRes,
          projectsRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/home/hero/`).catch(err => {
            console.error('Hero API Error:', err.response?.data || err.message);
            return { data: null };
          }),
          axios.get(`${BASE_URL}/home/stats/`).catch(err => {
            console.error('Stats API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/home/intro/`).catch(err => {
            console.error('Intro API Error:', err.response?.data || err.message);
            return { data: null };
          }),
          axios.get(`${BASE_URL}/home/skills/`).catch(err => {
            console.error('Skills API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/home/services/`).catch(err => {
            console.error('Services API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/home/processes/`).catch(err => {
            console.error('Processes API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/home/tools/`).catch(err => {
            console.error('Tools API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/home/faqs/`).catch(err => {
            console.error('FAQs API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/home/cta/`).catch(err => {
            console.error('CTA API Error:', err.response?.data || err.message);
            return { data: null };
          }),
          axios.get(`${BASE_URL}/about/tab-content/`).catch(err => {
            console.error('Tabs API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/api/portfolio/categories/`).catch(err => {
            console.error('Categories API Error:', err.response?.data || err.message);
            return { data: [] };
          }),
          axios.get(`${BASE_URL}/api/portfolio/projects/`).catch(err => {
            console.error('Projects API Error:', err.response?.data || err.message);
            return { data: [] };
          })
        ]);

        // Extract hero data
        const heroData = extractData<Hero>(heroRes.data);
        const heroItem = heroData.length > 0 ? heroData[0] : null;
        if (heroItem && heroItem.typewriter_phrases) {
          const phrasesData = Array.isArray(heroItem.typewriter_phrases)
            ? heroItem.typewriter_phrases
            : typeof heroItem.typewriter_phrases === 'string'
            ? heroItem.typewriter_phrases.split(',').map(p => p.trim())
            : ['Cinematic Excellence'];
          setPhrases(phrasesData);
        }

        // Extract stats data
        const statsData = extractData<Stat>(statsRes.data);
        const activeStats = statsData.filter(stat => stat.is_active);
        setStats(activeStats);

        // Extract intro data
        const introData = extractData<Intro>(introRes.data);
        setIntro(introData.length > 0 ? introData[0] : null);

        // Extract skills, services, processes, tools, faqs, cta
        setSkills(extractData<Skill>(skillsRes.data).filter(skill => skill.is_active));
        setServices(extractData<Service>(servicesRes.data).filter(service => service.is_active));
        setProcesses(extractData<Process>(processesRes.data).filter(process => process.is_active));
        setTools(extractData<Tool>(toolsRes.data).filter(tool => tool.is_active));
        setFaqs(extractData<FAQ>(faqsRes.data).filter(faq => faq.is_active));
        const ctaData = extractData<CTA>(ctaRes.data);
        setCta(ctaData.length > 0 ? ctaData[0] : null);

        // Extract tab content
        const tabsData = extractData<TabContent>(tabsRes.data);
        setTabContent(tabsData);

        // Extract portfolio data
        const categoriesData = extractData<Category>(categoriesRes.data);
        setCategories(categoriesData);
        const projectsData = extractData<Project>(projectsRes.data);
        setProjects(projectsData);

        setLoading(false);
      } catch (err: any) {
        console.error('Fetch Data Error:', err);
        setError(`Failed to load data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phrases.length === 0) return;

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
  }, [typewriterText, isDeleting, currentPhraseIndex, phrases]);

  // Stats animation
  useEffect(() => {
    if (stats.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targetCounts: Counts = {
            yearsExp: parseStatValue(stats.find(s => s.name.toLowerCase().includes('years'))?.value || '8'),
            happyClients: parseStatValue(stats.find(s => s.name.toLowerCase().includes('clients'))?.value || '200'),
            awardsWon: parseStatValue(stats.find(s => s.name.toLowerCase().includes('awards'))?.value || '15'),
            citiesCov: parseStatValue(stats.find(s => s.name.toLowerCase().includes('cities'))?.value || '25'),
          };
          const duration = 1000;
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCounts({
              yearsExp: Math.min(Math.floor(targetCounts.yearsExp * progress), targetCounts.yearsExp),
              happyClients: Math.min(Math.floor(targetCounts.happyClients * progress), targetCounts.happyClients),
              awardsWon: Math.min(Math.floor(targetCounts.awardsWon * progress), targetCounts.awardsWon),
              citiesCov: Math.min(Math.floor(targetCounts.citiesCov * progress), targetCounts.citiesCov),
            });
            if (progress >= 1) {
              clearInterval(interval);
            }
          }, 50);
          if (statsRef.current) {
            observer.unobserve(statsRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [stats]);

  // IntersectionObserver for slide-in animations
  useEffect(() => {
    const sections = document.querySelectorAll('.intro-section, .faq-section, .skills-section, .tools-section, .cta-section');
    sections.forEach((section) => {
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.slide-in-left').forEach((el) => {
              el.classList.add('animate-slideInLeft');
            });
            entry.target.querySelectorAll('.slide-in-right').forEach((el) => {
              el.classList.add('animate-slideInRight');
            });
            observer.unobserve(section);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    });
  }, [intro, faqs, skills, tools, cta]);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Icon mapping for dynamic icons
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Calendar,
    Users,
    Award,
    MapPin,
    PenTool,
    Palette,
    Music,
    MessageCircle,
    Edit3,
    Cpu,
    Play,
    Camera,
    Laptop,
    Workflow,
    Wifi,
    Sparkles,
    Heart,
    Building2,
    Film,
  };

  const getTab = (tabName: string) => tabContent.find((t) => t.tab_name === tabName);

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

  if (loading) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Data</h2>
        <p className="text-gray-400">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Intro Section with Tabs Content and Buttons on Right Above Paragraphs */}
      {intro && (
        <section className="intro-section py-0 sm:py-12 px-0 bg-gray-900 overflow-visible">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl pb-6 sm:pb-8 mx-auto w-full bg-gray-900 rounded-3xl shadow-2xl transition-all duration-500 ease-in-out"
          >
            <div className="flex flex-col md:flex-row gap-0">
              {/* Left Side - Static Content */}
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-1/2 pl-1 sm:pl-8 md:pl-32 pr-0 md:pr-0 pt-4 sm:pt-6 md:pt-4 pb-4 flex flex-col items-center"
              >
                <div className="relative mx-auto">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    src={intro.image_url || intro.image}
                    alt="Videographer"
                    className="w-full max-w-[90%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover border-2 sm:border-4 border-gray-700 rounded-xl sm:rounded-2xl shadow-[0_0_20px_rgba(147,112,219,0.8)] mx-auto"
                  />
                </div>
                {stats.length > 0 ? (
                  <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-6 pt-6 sm:pt-8">
                    {stats.map((stat, index) => {
                      const Icon = iconMap[stat.icon] || Calendar;
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 30, scale: 0.8 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-br from-gray-800 to-gray-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl max-w-xs min-h-24 sm:min-h-32 text-center flex flex-col items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                        >
                          <Icon className="text-purple-500" size={18} />
                          <p className="text-lg sm:text-xl md:text-2xl font-bold px-2">
                            {stat.value}{stat.suffix}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400 px-2">{stat.name}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 pt-6">
                    No stats available. Check backend data or API connection.
                  </div>
                )}
              </motion.div>

              {/* Right Side - Buttons in a Single Line Above Paragraphs */}
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 md:py-4 flex flex-col items-center"
              >
                {/* Tab Buttons in a Single Line with Spacing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-6 sm:mb-8 flex flex-row gap-3 sm:gap-4"
                >
                  {["story", "philosophy", "approach"].map((tab, index) => (
                    <motion.button
                      key={tab}
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.08, ease: "easeInOut" }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Tab Content */}
                <div className="max-w-[550px] text-center">
                  <AnimatePresence mode="wait">
                    {getTab(activeTab) && (
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        className="space-y-4"
                      >
                        <motion.h1
                          initial={{ opacity: 0, y: -30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.6 }}
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pt-0 sm:pt-4 mb-3 sm:mb-4 text-white leading-tight"
                        >
                          {getTab(activeTab)?.title || "No Title"}
                        </motion.h1>
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="w-12 sm:w-15 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-full mb-4 sm:mb-6 mx-auto"
                        ></motion.div>
                        {getTab(activeTab)?.content
                          ?.split("\n")
                          .filter((p) => p.trim())
                          .map((para, index) => (
                            <motion.p 
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                              viewport={{ once: true }}
                              className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4"
                            >
                              {para}
                            </motion.p>
                          )) || <p className="text-gray-400">No content available</p>}
                        {intro.achievements && (
                          <>
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 1.0 }}
                              viewport={{ once: true }}
                              className="flex items-center justify-center mb-4 sm:mb-6"
                            >
                              <ArrowUpRight className="text-purple-500 mr-2" size={16} />
                              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-purple-400">Recent Achievements</h2>
                            </motion.div>
                            <ul className="space-y-1.5 sm:space-y-2 inline-block text-left">
                              {(() => {
                                const achievements = intro.achievements;
                                const achievementList = Array.isArray(achievements)
                                  ? achievements
                                  : typeof achievements === 'string'
                                  ? achievements.split(',')
                                  : ['No achievements available'];
                                return achievementList.map((achievement, index) => (
                                  <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center text-gray-300 text-xs sm:text-sm md:text-base"
                                  >
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-2 sm:mr-3"></div>
                                    {achievement.trim()}
                                  </motion.li>
                                ));
                              })()}
                            </ul>
                          </>
                        )}
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.3 }}
                          viewport={{ once: true }}
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 mt-4 sm:mt-8"
                        >
                          <button className="group bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 w-fit mx-auto sm:mx-0">
                            <Play size={16} className="group-hover:scale-110 transition-transform" />
                            {intro.primary_button_text}
                          </button>
                          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 border border-white/30 hover:border-white/50 w-fit mx-auto sm:mx-0">
                            {intro.secondary_button_text}
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Projects and Collection Section */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <motion.h2 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white"
              style={{ 
                color: 'white',
                opacity: 1,
                visibility: 'visible'
              }}
            >
              Explore Our{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Work
              </span>
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: false, margin: "-100px" }}
              className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"
            ></motion.div>
          </div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-4">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange('all')}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Sparkles size={14} className="sm:w-4 sm:h-4" />
                <span>All Projects</span>
              </motion.button>

              {categories.map((cat, index) => {
                const Icon = iconMap[cat.icon] || Sparkles;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4" />
                    <span>{cat.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {currentProjects.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Thumbnail with Play Button */}
                <div className="relative aspect-video overflow-hidden bg-gray-800">
                  <motion.img
                    initial={{ scale: 1.15, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    src={p.thumbnail_url || p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button
                    onClick={() => setVideoPopup(p.video_url || p.video)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Play ${p.title}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 90, transition: { duration: 0.4, ease: "easeOut" } }}
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Play size={18} className="sm:w-5 sm:h-5 fill-white ml-0.5" />
                    </motion.div>
                  </button>
                </div>
                
                {/* Project Info */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="p-4 sm:p-5"
                >
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
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex justify-center items-center gap-2 mt-8 sm:mt-10"
            >
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
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {videoPopup && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
        >
          <motion.button
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setVideoPopup(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            aria-label="Close video"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Process / Tools Section */}
      {(processes.length > 0 || tools.length > 0) && (
        <section className="relative py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Process &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                  Tools
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
              >
                From concept to final cut, we combine creativity with the latest
                technology to craft unforgettable visual stories.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {processes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {processes.map((step, index) => {
                    const Icon = iconMap[step.icon] || PenTool;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400">
                          <Icon size={28} />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white">
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
              {tools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-8"
                >
                  {tools.map((tool, index) => {
                    const Icon = iconMap[tool.icon] || Laptop;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition"
                      >
                        <Icon size={32} className="text-purple-400 mb-3" />
                        <h4 className="text-base sm:text-lg font-semibold text-white">{tool.title}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{tool.description}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </section>
      )}

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="faq-section pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-[#1A0D2A]">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white text-center leading-tight"
            >
              Frequently Asked<br />{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12"
            >
              Get clarity on how I can bring your vision to life with professional videography services.
            </motion.p>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-950 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:border-purple-500 transition-all duration-300 ease-in-out cursor-pointer max-w-[50rem] mx-auto w-full"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white flex items-center gap-2 sm:gap-3">
                    <HelpCircle className="text-purple-400 flex-shrink-0" size={20} />
                    <span className="flex-1">{faq.question}</span>
                    <span className={`transition-transform duration-300 flex-shrink-0 ${openFAQ === index ? 'rotate-180' : ''}`}>
                      <ArrowUpRight size={16} className="text-purple-400" />
                    </span>
                  </h3>
                  <p
                    className={`text-gray-300 text-xs sm:text-sm md:text-base mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                      openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="py-8 sm:py-10 md:py-14 px-4 sm:px-4 lg:px-8 max-w-7xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white text-center leading-tight">Still have questions?</h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12">
                Don't hesitate to reach out. I'm here to help clarify anything about the process.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-purple-900/30"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {cta.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                {cta.title.split(' ').pop()}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-base sm:text-lg md:text-xl mb-10"
            >
              {cta.description}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              href="/contact"
              className="inline-block px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold rounded-xl bg-white/10 border border-purple-400/50 backdrop-blur-sm
              text-white hover:bg-white/20 hover:border-purple-400/80 transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
            >
              {cta.button_text}
            </motion.a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;