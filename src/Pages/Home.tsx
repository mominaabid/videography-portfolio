import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/footer';
import Testimonials from '../Components/Testimonials';
import {
  Play, Award, Calendar, Users, MapPin, ArrowUpRight, HelpCircle,
  PenTool, Palette, Music, MessageCircle, Edit3, Cpu, Camera, Laptop, Workflow, Wifi
} from 'lucide-react';

// Define interfaces for API data based on backend models
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
  value: number;
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

interface Counts {
  yearsExp: number;
  happyClients: number;
  awardsWon: number;
  citiesCov: number;
}

const BASE_URL = 'https://backendvideography.vercel.app';

// Helper function to extract data from paginated response
const extractData = <T,>(response: any): T[] => {
  if (response && response.results && Array.isArray(response.results)) {
    return response.results;
  }
  if (Array.isArray(response)) {
    return response;
  }
  return [];
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

  // Fetch all API data
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
          ctaRes
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
          })
        ]);

        // Log responses for debugging
        console.log('Hero Response:', heroRes.data);
        console.log('Stats Response:', statsRes.data);
        console.log('Intro Response:', introRes.data);

        // Extract hero data
        const heroData = extractData<Hero>(heroRes.data);
        const heroItem = heroData.length > 0 ? heroData[0] : null;

        // Extract and set typewriter phrases
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
        setStats(statsData.filter(stat => stat.is_active));

        // Extract intro data
        const introData = extractData<Intro>(introRes.data);
        setIntro(introData.length > 0 ? introData[0] : null);

        // Extract skills data
        const skillsData = extractData<Skill>(skillsRes.data);
        setSkills(skillsData.filter(skill => skill.is_active));

        // Extract services data
        const servicesData = extractData<Service>(servicesRes.data);
        setServices(servicesData.filter(service => service.is_active));

        // Extract processes data
        const processesData = extractData<Process>(processesRes.data);
        setProcesses(processesData.filter(process => process.is_active));

        // Extract tools data
        const toolsData = extractData<Tool>(toolsRes.data);
        setTools(toolsData.filter(tool => tool.is_active));

        // Extract FAQs data
        const faqsData = extractData<FAQ>(faqsRes.data);
        setFaqs(faqsData.filter(faq => faq.is_active));

        // Extract CTA data
        const ctaData = extractData<CTA>(ctaRes.data);
        setCta(ctaData.length > 0 ? ctaData[0] : null);

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
            yearsExp: stats.find(s => s.name.toLowerCase().includes('years'))?.value || 8,
            happyClients: stats.find(s => s.name.toLowerCase().includes('clients'))?.value || 200,
            awardsWon: stats.find(s => s.name.toLowerCase().includes('awards'))?.value || 15,
            citiesCov: stats.find(s => s.name.toLowerCase().includes('cities'))?.value || 25,
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

      {/* Hero Section */}
    

      {/* Intro Section */}
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
                {stats.length > 0 && (
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
                            {counts[stat.name.toLowerCase().includes('years') ? 'yearsExp' : stat.name.toLowerCase().includes('clients') ? 'happyClients' : stat.name.toLowerCase().includes('awards') ? 'awardsWon' : 'citiesCov']}{stat.suffix}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400 px-2">{stat.name}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 md:py-4 flex items-center justify-center"
              >
                <div className="max-w-[550px] text-center">
                  <motion.h1 
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pt-0 sm:pt-4 mb-3 sm:mb-4 text-white leading-tight"
                  >
                    {intro.title}
                  </motion.h1>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="w-12 sm:w-15 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-full mb-4 sm:mb-6 mx-auto"
                  ></motion.div>
                  {intro.subtitle.split('\n').map((para, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4"
                    >
                      {para}
                    </motion.p>
                  ))}
                  {intro.achievements && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
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
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
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
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="skills-section bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Our Key Skills
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-12"
            >
              The foundation of our work lies in combining creativity with technical expertise.
            </motion.p>
            <div className="grid md:grid-cols-4 gap-8">
              {skills.map((skill, index) => {
                const Icon = iconMap[skill.icon] || PenTool;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Icon className="text-purple-400 mb-4 w-12 h-12 mx-auto" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{skill.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base">{skill.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Your Story, Beautifully Told
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
              >
                Every frame matters. We blend artistry with cutting-edge technology to create videos that resonate and inspire.
              </motion.p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || PenTool;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -15, scale: 1.03 }}
                    className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.7, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors"
                    >
                      <Icon className="text-purple-400" size={32} />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
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