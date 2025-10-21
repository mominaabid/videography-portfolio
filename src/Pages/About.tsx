import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Award,
  Heart,
  Users,
  Briefcase,
  Globe,
  CheckCircle,
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
}
interface Hero {
  id: number;
  title: string;
  subtitle: string;
  video_url: string;
  button_text: string;
}

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

  // Fetch all about page data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

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

        const getResults = (data) =>
          Array.isArray(data) ? data : data?.results || [];

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

  // Animate counters when in view
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
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [stats]);

  // Scroll reveal animation
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const valueIcons = [Heart, Eye, Lightbulb, Users];
  const timelineIcons = [PlayCircle, Award, Briefcase, Globe, Sparkles];
  const skillIcons = [Camera, Sparkles, Film, Zap, Target, Eye];

  const getTab = (name: string) => tabContent.find((t) => t.tab_name === name);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      {hero && (
        <section className="relative overflow-hidden min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          >
            <source src={hero.video_url} type="video/mp4" />
          </video>
          <div className="relative z-20 flex items-center justify-center min-h-screen px-8">
            <div className="max-w-3xl text-center mx-auto scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
                <Sparkles className="text-purple-400" size={14} />
                <span className="text-purple-300 font-medium">About Me</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                {hero.title.split(" ").slice(0, -2).join(" ")}
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mt-2">
                  {hero.title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">{hero.subtitle}</p>
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto">
                <PlayCircle size={18} />
                {hero.button_text}
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 h-24 bg-gradient-to-t from-gray-900 to-transparent w-full z-10"></div>
        </section>
      )}

      {/* Stats Section */}
      {stats.length > 0 && (
        <section ref={statsRef} className="py-16 px-8 bg-gradient-to-br from-gray-900 to-[#1A0D2A]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = [Briefcase, Users, Award, Globe][i % 4];
              return (
                <div
                  key={stat.id}
                  className="scroll-reveal bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 text-center hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {counters[stat.name] || 0}+
                  </div>
                  <div className="text-gray-400 mt-2">{stat.name}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tabs Section */}
      {tabContent.length > 0 && (
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center gap-4 mb-12">
              {["story", "philosophy", "approach"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
              {/* Image Column */}
              <div className="w-full lg:w-5/12 flex justify-center animate-fadeInLeft">
                <div className="w-full max-w-[500px]">
                  {getTab(activeTab)?.image ? (
                    <img
                      src={getTab(activeTab)?.image}
                      alt={getTab(activeTab)?.title || "Tab Image"}
                      className="w-full h-auto object-cover rounded-3xl shadow-2xl border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 transform"
                      key={activeTab} // Ensure image re-renders on tab change
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-800 rounded-3xl flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-7/12 flex justify-center">
                <div className="max-w-3xl text-center lg:text-left space-y-6 animate-fadeInRight">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {getTab(activeTab)?.title || "No Title"}
                  </h2>
                  <div className="h-1 w-24 mx-auto lg:mx-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  {getTab(activeTab)?.content
                    ?.split("\n")
                    .filter((p) => p.trim())
                    .map((para, i) => (
                      <p key={i} className="text-gray-300 text-lg leading-relaxed">
                        {para}
                      </p>
                    )) || <p>No content available</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values */}
      {coreValues.length > 0 && (
        <section className="py-16 px-8 bg-gradient-to-br from-[#1A0D2A] to-gray-900">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Core Values</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {coreValues.map((val, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div
                  key={val.id}
                  className="scroll-reveal bg-gray-800/80 p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/80 transition-all duration-500 hover:scale-105"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{val.title}</h3>
                  <p className="text-gray-400">{val.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="py-16 px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((s, i) => {
              const Icon = skillIcons[i % skillIcons.length];
              return (
                <div key={s.id}>
                  <div className="flex justify-between mb-3 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <span className="font-semibold text-lg">{s.name}</span>
                    </div>
                    <span className="text-purple-400 font-bold">{s.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full"
                      style={{ width: `${s.level}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="py-16 px-8 bg-gradient-to-br from-gray-900 to-[#1A0D2A]">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">The Journey</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
            {timeline.map((item, i) => {
              const Icon = timelineIcons[i % timelineIcons.length];
              return (
                <div
                  key={item.id}
                  className={`scroll-reveal mb-12 flex flex-col sm:flex-row ${
                    i % 2 === 0 ? "" : "sm:flex-row-reverse"
                  } items-center`}
                >
                  <div className="w-full sm:w-5/12 p-4 bg-gray-800/80 rounded-2xl border border-gray-700/50 hover:border-purple-500/80 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                        {item.year}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <div className="w-full sm:w-2/12 flex justify-center py-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900"></div>
                  </div>
                  <div className="w-full sm:w-5/12"></div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="py-20 px-8 bg-gray-900 text-center">
          <h2 className="text-5xl font-bold mb-6">{cta.title}</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">{cta.description}</p>
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform px-8 py-4 rounded-lg font-semibold flex items-center gap-2 mx-auto">
            {cta.button_text}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default About;