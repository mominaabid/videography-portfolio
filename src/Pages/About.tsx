import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Award,
  Heart,
  Users,
  Briefcase,
  Globe,
  PlayCircle,
  ArrowRight,
  Sparkles,
  Film,
  Eye,
  Lightbulb,
  Zap,
  Target,
} from "lucide-react";
import Footer from "../Components/footer";

interface Stat {
  id: number;
  name: string;
  value: number;
}
interface CoreValue {
  id: number;
  title: string;
  description: string;
}
interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}
interface Skill {
  id: number;
  name: string;
  level: number;
}
interface CTA {
  id: number;
  title: string;
  description: string;
  button_text: string;
}
interface TabContent {
  id: number;
  tab_name: string;
  title: string;
  content: string;
  image?: string;
  image_url?: string;
}
interface Hero {
  id: number;
  title: string;
  subtitle: string;
  video_url: string;
  button_text: string;
}

// Use a named easing (string) for compatibility with Framer Motion TS types.
const smoothEase = "easeInOut" as const;

// Typed spring hover
const hoverSpring = { type: "spring" as const, stiffness: 100, damping: 12 };

// Section variants and item variants
const sectionContainer = {
  hidden: { opacity: 0, y: 20 },
  show: (delayChildren = 0) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren, when: "beforeChildren" as const },
  }),
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: smoothEase } },
};

const About = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [cta, setCTA] = useState<CTA | null>(null);
  const [tabContent, setTabContent] = useState<TabContent[]>([]);
  const [activeTab, setActiveTab] = useState<"story" | "philosophy" | "approach">("story");
  const [counters, setCounters] = useState<Record<string, number>>({});
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const BASE_URL = "https://backendvideography.vercel.app";
        const endpoints = {
          hero: `${BASE_URL}/about/hero/`,
          stats: `${BASE_URL}/about/stats/`,
          core: `${BASE_URL}/about/core-values/`,
          timeline: `${BASE_URL}/about/timeline/`,
          skills: `${BASE_URL}/about/skills/`,
          cta: `${BASE_URL}/about/cta/`,
          tabs: `${BASE_URL}/about/tab-content/`,
        };

        const [
          heroRes,
          statsRes,
          coreRes,
          timelineRes,
          skillsRes,
          ctaRes,
          tabsRes,
        ] = await Promise.all([
          fetch(endpoints.hero),
          fetch(endpoints.stats),
          fetch(endpoints.core),
          fetch(endpoints.timeline),
          fetch(endpoints.skills),
          fetch(endpoints.cta),
          fetch(endpoints.tabs),
        ]);

        const [
          heroJson,
          statsJson,
          coreJson,
          timelineJson,
          skillsJson,
          ctaJson,
          tabsJson,
        ] = await Promise.all([
          heroRes.json(),
          statsRes.json(),
          coreRes.json(),
          timelineRes.json(),
          skillsRes.json(),
          ctaRes.json(),
          tabsRes.json(),
        ]);

        const getResults = (data: any) => (Array.isArray(data) ? data : data?.results || []);

        setHero(getResults(heroJson)[0] || null);
        setStats(getResults(statsJson));
        setCoreValues(getResults(coreJson));
        setTimeline(getResults(timelineJson));
        setSkills(getResults(skillsJson));
        setCTA(getResults(ctaJson)[0] || null);
        setTabContent(getResults(tabsJson));
      } catch (err) {
        console.error("❌ Failed to fetch about page data:", err);
      }
    };

    fetchAll();
  }, []);

  // Counter Animation (unchanged logic but same behavior)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && stats.length > 0) {
          const duration = 2000;
          const startTime = Date.now();

          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const updated = stats.reduce((acc, stat) => {
              acc[stat.name] = Math.floor(stat.value * progress);
              return acc;
            }, {} as Record<string, number>);

            setCounters(updated);
            if (progress >= 1) clearInterval(interval);
          }, 30);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [stats]);

  const valueIcons = [Heart, Eye, Lightbulb, Users];
  const timelineIcons = [PlayCircle, Award, Briefcase, Globe, Sparkles];
  const skillIcons = [Camera, Sparkles, Film, Zap, Target, Eye];
  const getTab = (name: string) => tabContent.find((t) => t.tab_name === name);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* HERO */}
      {hero && (
        <section className="relative overflow-hidden min-h-screen h-[110vh] sm:h-screen flex items-center justify-center">
          {/* subtle overlay: animated for parallax-like depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: smoothEase }}
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10 pointer-events-none"
            aria-hidden
          />

          <motion.video
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: smoothEase }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          >
            <source src={hero.video_url} type="video/mp4" />
          </motion.video>

          <div className="relative z-20 flex items-center justify-center text-center px-4 sm:px-8 w-full h-full py-20">
            <div className="max-w-2xl sm:max-w-3xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
                className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 px-3 py-1 rounded-full mb-4 sm:mb-6 text-sm sm:text-base"
              >
                <Sparkles size={14} className="text-purple-400" />
                <span>About Me</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: smoothEase }}
                className="text-3xl sm:text-5xl font-bold mb-4 leading-snug"
              >
                {hero.title.split(" ").slice(0, -2).join(" ")}
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mt-1">
                  {hero.title.split(" ").slice(-2).join(" ")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: smoothEase }}
                className="text-gray-300 text-base sm:text-lg mb-6"
              >
                {hero.subtitle}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 80, damping: 10, delay: 0.7 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto text-sm sm:text-base"
              >
                <PlayCircle size={18} />
                {hero.button_text}
              </motion.button>
            </div>
          </div>

          <div className="absolute bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent w-full z-10 pointer-events-none" />
        </section>
      )}

      {/* STATS */}
      {stats.length > 0 && (
        <section ref={statsRef} className="py-16 px-6 bg-gradient-to-br from-gray-900 to-[#1A0D2A]">
          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.14 } },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, i) => {
                const Icon = [Briefcase, Users, Award, Globe][i % 4];
                return (
                  <motion.div
                    key={stat.id}
                    variants={itemVariant}
                    whileHover={{ scale: 1.05, y: -6, transition: hoverSpring }}
                    className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.88, rotate: -20, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: smoothEase }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="w-14 h-14 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4"
                    >
                      <Icon size={20} />
                    </motion.div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {counters[stat.name] || 0}+
                    </div>
                    <div className="text-gray-400 mt-2 text-sm sm:text-base">{stat.name}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* TABS */}
      {tabContent.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: smoothEase }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              {["story", "philosophy", "approach"].map((tab, index) => (
                <motion.button
                  key={tab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: smoothEase }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab as any)}
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

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-center">
              <div className="w-full lg:w-5/12 flex justify-center">
                <div className="w-full max-w-[500px]">
                  <AnimatePresence mode="wait">
                    {getTab(activeTab)?.image_url ? (
                      <motion.img
                        key={getTab(activeTab)?.image_url}
                        src={getTab(activeTab)?.image_url}
                        alt={getTab(activeTab)?.title || "Tab Image"}
                        initial={{ opacity: 0, y: 20, scale: 0.995 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.9, ease: smoothEase }}
                        className="w-full h-auto object-cover rounded-3xl shadow-xl border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-400 will-change-transform"
                        onError={() => {
                          console.error("❌ Image failed to load:", getTab(activeTab)?.image_url);
                        }}
                      />
                    ) : (
                      <motion.div
                        key={"no-image-" + activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-48 sm:h-64 bg-gray-800 rounded-3xl flex flex-col items-center justify-center text-gray-400 text-sm gap-2"
                      >
                        <Camera size={48} className="text-gray-600" />
                        <p>No Image Available</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-full lg:w-7/12 text-center lg:text-left space-y-4 sm:space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + "-content"}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.9, ease: smoothEase }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                      {getTab(activeTab)?.title || "No Title"}
                    </h2>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.15, ease: "easeInOut" }}
                      className="h-1 w-20 sm:w-24 mx-auto lg:mx-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                    {getTab(activeTab)?.content
                      ?.split("\n")
                      .filter((p) => p.trim())
                      .map((para, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: smoothEase }}
                          className="text-gray-300 text-base sm:text-lg leading-relaxed"
                        >
                          {para}
                        </motion.p>
                      )) || <p className="text-gray-400">No content available</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CORE VALUES */}
      {coreValues.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-br from-[#1A0D2A] to-gray-900">
          <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: smoothEase }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4"
            >
              Core Values
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>

          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {coreValues.map((val, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <motion.div
                  key={val.id}
                  variants={itemVariant}
                  whileHover={{ scale: 1.05, y: -8, transition: hoverSpring }}
                  className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/80 transition-all"
                >
                  <motion.div
                    initial={{ scale: 0.9, rotate: -20, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: smoothEase }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto"
                  >
                    <Icon size={20} />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{val.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: smoothEase }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4"
            >
              Skills & Expertise
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>

          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {skills.map((s, i) => {
              const Icon = skillIcons[i % skillIcons.length];
              return (
                <motion.div key={s.id} variants={itemVariant} className="py-2">
                  <div className="flex justify-between mb-2 sm:mb-3 items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div
                        initial={{ scale: 0.9, rotate: -15 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                      >
                        <Icon size={16} />
                      </motion.div>
                      <span className="font-semibold text-base sm:text-lg">{s.name}</span>
                    </div>
                    <span className="text-purple-400 font-bold text-sm sm:text-base">{s.level}%</span>
                  </div>
                  <div className="h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      transition={{ duration: 1.2, delay: i * 0.06, ease: smoothEase }}
                      viewport={{ once: true, margin: "0px", amount: 0.3 }}
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full will-change-transform"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}

      {/* TIMELINE */}
      {timeline.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-900 to-[#1A0D2A]">
          <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4"
            >
              The Journey
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
            <div className="max-w-5xl mx-auto space-y-10">
              {timeline.map((item, i) => {
                const Icon = timelineIcons[i % timelineIcons.length];
                const isEven = i % 2 === 0;
                return (
                  <div key={item.id} className={`mb-10 flex flex-col sm:flex-row ${isEven ? "" : "sm:flex-row-reverse"} items-center`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="w-full sm:w-5/12 p-6 bg-gray-800/80 rounded-2xl border border-gray-700/50 hover:border-purple-500/80 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3 justify-center sm:justify-start">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{item.year}</div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
                    </motion.div>

                    <div className="w-full sm:w-2/12 flex justify-center py-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900"
                      />
                    </div>

                    <div className="w-full sm:w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="py-12 sm:py-20 px-4 sm:px-8 bg-gray-900 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: smoothEase }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-2xl sm:text-5xl font-bold mb-4"
            >
              {cta.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-gray-300 text-base sm:text-lg mb-6"
            >
              {cta.description}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: smoothEase }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.06, transition: hoverSpring }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold"
            >
              <span className="text-sm sm:text-base">{cta.button_text}</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default About;