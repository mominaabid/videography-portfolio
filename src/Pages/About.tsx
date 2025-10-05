import { useState, useEffect, useRef } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/footer'; 
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
  Target
} from 'lucide-react';

// Import the CSS file
import '../styles/About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [counters, setCounters] = useState({ projects: 0, clients: 0, awards: 0, years: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targets = { projects: 500, clients: 200, awards: 25, years: 8 };
          const duration = 2000;
          const startTime = Date.now();

          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounters({
              projects: Math.floor(targets.projects * progress),
              clients: Math.floor(targets.clients * progress),
              awards: Math.floor(targets.awards * progress),
              years: Math.floor(targets.years * progress)
            });

            if (progress >= 1) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      title: "Passion-Driven",
      description: "Every project is approached with genuine enthusiasm and dedication to excellence."
    },
    {
      title: "Attention to Detail",
      description: "Meticulous focus on every frame, ensuring nothing is overlooked in the storytelling process."
    },
    {
      title: "Creative Innovation",
      description: "Constantly pushing boundaries with fresh perspectives and cutting-edge techniques."
    },
    {
      title: "Client-Centered",
      description: "Your vision guides the creative process, with collaboration at every step."
    }
  ];

  const valueIcons = [Heart, Eye, Lightbulb, Users];

  const timeline = [
    { year: "2016", title: "The Beginning", description: "Started freelance videography with a passion for storytelling" },
    { year: "2018", title: "First Award", description: "Won Best Wedding Film at Regional Film Festival" },
    { year: "2020", title: "Studio Launch", description: "Established professional studio with state-of-the-art equipment" },
    { year: "2022", title: "International Recognition", description: "Featured in Vimeo Staff Picks and Canon Creator Showcase" },
    { year: "2024", title: "Continued Excellence", description: "Serving clients globally with 500+ successful projects" }
  ];

  const timelineIcons = [PlayCircle, Award, Briefcase, Globe, Sparkles];

  const skills = [
    { name: "Cinematography", level: 95 },
    { name: "Color Grading", level: 90 },
    { name: "Storytelling", level: 98 },
    { name: "Drone Operation", level: 85 },
    { name: "Audio Design", level: 88 },
    { name: "Motion Graphics", level: 82 }
  ];

  const skillIcons = [Camera, Sparkles, Film, Zap, Target, Eye];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        >
          <source src="/aboutvideo.mp4" type="video/mp4" />
        </video>
        <div className="relative z-20 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl scroll-reveal opacity-0 translate-x-[-100px]">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="text-purple-400" size={20} />
              <span className="text-purple-300 text-sm font-medium">About Me</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Turning Moments Into
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Timeless Art
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              I'm Alex Rodriguez, a passionate videographer dedicated to capturing the essence of your story through cinematic excellence and creative vision.
            </p>
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-purple-500/50">
              <PlayCircle size={24} className="group-hover:scale-110 transition-transform" />
              Watch My Story
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-[#1A0D2A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, value: counters.projects, label: "Projects", suffix: "+" },
              { icon: Users, value: counters.clients, label: "Happy Clients", suffix: "+" },
              { icon: Award, value: counters.awards, label: "Awards Won", suffix: "+" },
              { icon: Globe, value: counters.years, label: "Years Experience", suffix: "+" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="scroll-reveal opacity-0 translate-y-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 text-center group hover:scale-105 transform"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['story', 'philosophy', 'approach'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal opacity-0 translate-x-[-50px]">
              <img
                src="/src/assets/videographerman.jpg"
                alt="Alex Rodriguez with camera"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 transform"
              />
            </div>

            <div className="scroll-reveal opacity-0 translate-x-[50px]">
              {activeTab === 'story' && (
                <div className="space-y-6 animate-fadeInUp">
                  <h2 className="text-5xl md:text-6xl font-bold">
                    My <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Journey</span>
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    My love affair with videography began over 8 years ago with a simple camera and an unquenchable thirst for capturing life's beautiful moments. What started as a hobby quickly evolved into a passionate career.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    From humble beginnings shooting local events, I've had the privilege of documenting weddings across continents, creating compelling brand stories for Fortune 500 companies, and producing award-winning documentaries.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Each project teaches me something new, and every client's story becomes a part of my own journey. This constant growth and evolution is what keeps my passion burning bright.
                  </p>
                </div>
              )}

              {activeTab === 'philosophy' && (
                <div className="space-y-6 animate-fadeInUp">
                  <h2 className="text-5xl md:text-6xl font-bold">
                    My <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Philosophy</span>
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I believe that great videography is not just about technical perfection—it's about emotion, authenticity, and connection. Every frame should tell a story, evoke a feeling, and create a lasting memory.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    My approach is rooted in three principles: Listen deeply to understand your vision, capture authentically without forcing moments, and craft meticulously in post-production to bring the story to life.
                  </p>
                  <div className="flex items-center gap-3 pt-4">
                    <CheckCircle className="text-purple-400" size={24} />
                    <span className="text-lg">Authenticity over perfection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-purple-400" size={24} />
                    <span className="text-lg">Emotion over aesthetics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-purple-400" size={24} />
                    <span className="text-lg">Story over spectacle</span>
                  </div>
                </div>
              )}

              {activeTab === 'approach' && (
                <div className="space-y-6 animate-fadeInUp">
                  <h2 className="text-5xl md:text-6xl font-bold">
                    My <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Approach</span>
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Every project begins with a conversation. I take the time to understand your goals, vision, and the story you want to tell. This collaborative process ensures the final product exceeds your expectations.
                  </p>
                  <div className="space-y-4 pt-4">
                    {[
                      { step: "01", title: "Discovery", desc: "Understanding your vision and objectives" },
                      { step: "02", title: "Planning", desc: "Crafting the perfect creative strategy" },
                      { step: "03", title: "Production", desc: "Capturing stunning footage with precision" },
                      { step: "04", title: "Post-Production", desc: "Editing magic to bring it all together" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start group">
                        <div className="text-3xl font-bold text-purple-400/30 group-hover:text-purple-400/60 transition-colors">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A0D2A] to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10">
            <h2 className="text-5xl font-bold mb-4">Core Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              The principles that guide every decision and frame
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = valueIcons[index];
              return (
                <div
                  key={index}
                  className="scroll-reveal opacity-0 translate-y-10 relative group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/80 transition-all duration-500 group hover:scale-105 transform h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10">
            <h2 className="text-5xl font-bold mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skillIcons[index];
              return (
                <div
                  key={index}
                  className="scroll-reveal opacity-0 translate-x-[-50px] group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-lg font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-purple-400 font-bold text-xl">{skill.level}%</span>
                  </div>
                  <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-[#1A0D2A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10">
            <h2 className="text-5xl font-bold mb-4">The Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>

            {timeline.map((item, index) => {
              const IconComponent = timelineIcons[index];
              return (
                <div
                  key={index}
                  className={`scroll-reveal opacity-0 mb-12 flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/80 transition-all duration-300 hover:scale-105 transform">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <IconComponent size={24} />
                          </div>
                          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{item.year}</div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 z-10"></div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center scroll-reveal opacity-0 translate-y-10">
          <h2 className="text-5xl font-bold mb-6">Let's Create Together</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Ready to turn your vision into a cinematic masterpiece? Let's start a conversation about your next project.
          </p>
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-purple-500/50 mx-auto">
            Get In Touch
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;