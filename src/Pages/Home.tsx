import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import Header from '../Components/Header';
import Footer from '../Components/footer'; 
import Testimonials from '../Components/Testimonials'; 
import { 
  Play, 
  Award, 
  Film, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowUpRight, 
  HelpCircle, 
  PenTool, 
  Palette, 
  Music, 
  
  MessageCircle, 
  Edit3, 
  Cpu, 
  Camera, 
  Laptop,
  Workflow, 
  Wifi 
} from 'lucide-react';

// Define the shape of the counts state
interface Counts {
  yearsExp: number;
  happyClients: number;
  awardsWon: number;
  citiesCov: number;
}

const Home = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State for counting animation with explicit type
  const [counts, setCounts] = useState<Counts>({
    yearsExp: 0,
    happyClients: 0,
    awardsWon: 0,
    citiesCov: 0,
  });
  const statsRef = useRef<HTMLDivElement>(null); // Type the ref as HTMLDivElement

  const phrases = [
    'Cinematic Excellence',
    'Visual Storytelling',
    'Timeless Memories',
    'Creative Vision',
    'Artistic Narratives'
  ];

  // Typewriter effect 
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

  // Counting animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targetCounts: Counts = {
            yearsExp: 8,
            happyClients: 200,
            awardsWon: 15,
            citiesCov: 25,
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
  }, []);

  // Scroll Animation useEffect
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
  }, []);

  // State for FAQ accordion 
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What working hours are manageable for you?',
      answer: 'I am flexible and available to work during standard business hours (9 AM - 5 PM PKT) or can accommodate evening and weekend schedules based on project needs. Let’s discuss your timeline!'
    },
    {
      question: 'Are you capable of playing with large data?',
      answer: 'Yes, I have experience handling large datasets and can efficiently process and analyze them to create impactful visual stories. My tools and expertise ensure smooth delivery even with complex projects.'
    },
    {
      question: 'Can you sign an NDA?',
      answer: 'Absolutely, I am happy to sign a Non-Disclosure Agreement to protect your project’s confidentiality. Please provide the necessary documents, and I’ll review them promptly.'
    },
    {
      question: 'Which subscriptions do you have?',
      answer: 'I maintain subscriptions to industry-leading tools like Adobe Creative Cloud, Final Cut Pro, and other relevant software to ensure top-quality production. Specific details can be shared upon request.'
    },
    {
      question: 'You are familiar with which platforms?',
      answer: 'I am well-versed in platforms including Vimeo, YouTube, Instagram, and client-specific CMS systems. I can adapt to your preferred distribution channels seamlessly.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
              <Award className="text-purple-400" size={20} />
              <span className="text-purple-300 text-sm font-medium">Award-Winning Videographer</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-white block mb-2">Capturing</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 block min-h-[1.2em]">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Transforming your precious moments into breathtaking visual stories through professional cinematography and creative excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-purple-500/50">
                <Play size={24} className="group-hover:scale-110 transition-transform" />
                Watch Portfolio Reel
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50">
                View Our Work
              </button>
            </div>
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
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <p className="text-white/70 text-xs mt-2">Scroll Down</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>

      <section className="intro-section py-10 px-0 bg-gray-900 opacity-0 animate-fadeIn overflow-visible">
  <div className="max-w-7xl pb-8 mx-auto w-full bg-gray-900 rounded-3xl shadow-2xl transition-all duration-500 ease-in-out">
    <div className="flex flex-col md:flex-row gap-0">
      {/* Left: Image */}
      <div className="md:w-1/2 pl-4 sm:pl-8 md:pl-32 pr-0 md:pr-0 p-4 md:p-4 flex flex-col items-center">
        <div className="relative slide-in-left opacity-0 transition-all duration-700 ease-out md:-translate-x-10 translate-x-0 mx-auto">
          <img
            src="/videographerman.jpg"
            alt="Alex Rodriguez holding a camera"
            className="w-full max-w-[90%] h-[600px] object-cover border-4 border-gray-700 rounded-2xl shadow-[0_0_20px_rgba(147,112,219,0.8)] mx-auto"
          />
        </div>
        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 gap-6 pt-8 slide-in-left opacity-0 transition-all duration-700 ease-out md:-translate-x-10 translate-x-0 -translate-x-10 delay-200">
          <div className="bg-gradient-to-br from-gray-800 to-gray-950 p-2 rounded-2xl max-w-xs min-h-32 text-center flex flex-col items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <Calendar className="text-purple-500" size={24} />
            <p className="text-2xl font-bold px-2">{counts.yearsExp}+</p>
            <p className="text-base text-gray-400 px-2">Years Exp</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-950 p-2 rounded-2xl max-w-xs min-h-32 text-center flex flex-col items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <Users className="text-purple-500" size={24} />
            <p className="text-2xl font-bold px-2">{counts.happyClients}+</p>
            <p className="text-base text-gray-400 px-2">Happy Clients</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-950 p-2 rounded-2xl max-w-xs min-h-32 text-center flex flex-col items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <Award className="text-purple-500" size={24} />
            <p className="text-2xl font-bold px-2">{counts.awardsWon}</p>
            <p className="text-base text-gray-400 px-2">Awards Won</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-950 p-2 rounded-2xl max-w-xs min-h-32 text-center flex flex-col items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <MapPin className="text-purple-500" size={24} />
            <p className="text-2xl font-bold px-2">{counts.citiesCov}+</p>
            <p className="text-base text-gray-400 px-2">Cities Cov</p>
          </div>
        </div>
      </div>
      
      {/* Right: Content */}
      <div className="w-full lg:w-1/2 px-8 lg:px-16 p-4 md:p-4 flex items-center justify-center">
        <div className="max-w-[550px]">
          <h1 className="text-5xl md:text-6xl font-bold pt-10 mb-4 text-white leading-tight">
            Crafting Visual<br />Stories<br />That{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Inspire</span>
          </h1>
          <div className="w-15 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-full mb-6"></div>
          <p className="text-gray-300 text-base md:text-lg mb-4">
            With over 8 years of experience in professional videography, I specialize in capturing the essence of life's most precious moments and transform into cinematic masterpieces.
          </p>
          <p className="text-gray-300 text-base md:text-lg mb-4">
            My journey began with a simple camera and an insatiable curiosity for storytelling. Today, I've had the privilege of working with loving couples, businesses, and creators across the globe, helping them share their unique stories through the power of video.
          </p>
          <p className="text-gray-300 text-base md:text-lg mb-4">
            Every project is an opportunity to push creative boundaries while delivering results that exceed expectations. I believe in the perfect blend of technical expertise and artistic vision.
          </p>
          <div className="flex items-center mb-6">
            <ArrowUpRight className="text-purple-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-purple-400">Recent Achievements</h2>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300 text-base md:text-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Vimeo Staff Pick Winner 2023
            </li>
            <li className="flex items-center text-gray-300 text-base md:text-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Wedding Wire Couples Choice Award
            </li>
            <li className="flex items-center text-gray-300 text-base md:text-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
              Featured in Canon Creator Showcase
            </li>
            <li className="flex items-center text-gray-300 text-base md:text-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Real Estate Marketing Award
            </li>
          </ul>
          <div className="flex space-x-4 justify-start pt-4 mt-8">
            <button className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-purple-500/50">
              <Play size={24} className="group-hover:scale-110 transition-transform" />
              View My Portfolio
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Skills Section */}
      <section className="skills-section bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Our Key Skills</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            The foundation of our  work lies in combining creativity with technical expertise.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: PenTool, title: "Storytelling", desc: "Transforming ideas into compelling narratives." },
              { icon: Palette, title: "Color Grading", desc: "Enhancing visuals with cinematic color tones." },
              { icon: Music, title: "Sound Designing", desc: "Crafting immersive soundscapes for impactful videos." },
              { icon: Cpu, title: "Basic Motion Graphics", desc: "Adding motion elements to elevate engagement." },
              { icon: MessageCircle, title: "Good Communication", desc: "Clear collaboration ensures your vision shines." },
              { icon: Edit3, title: "Script Writing", desc: "Shaping ideas into structured, engaging scripts." },
            ].map((skill, index) => (
              <div key={index} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                <skill.icon className="text-purple-400 mb-4 w-12 h-12 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">{skill.title}</h3>
                <p className="text-gray-400">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Additional Sections */}
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
     {/* Process / Tools Section */}

{/* Process / Tools Section */}
<section className="relative py-20 bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
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
        className="text-gray-400 max-w-2xl mx-auto text-lg"
      >
        From concept to final cut, we combine creativity with the latest
        technology to craft unforgettable visual stories.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left - Process */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        {[
          {
            icon: <PenTool size={28} />,
            title: "Creative Planning",
            desc: "We brainstorm and conceptualize your story with detailed scripts and shot planning.",
          },
          {
            icon: <Camera size={28} />,
            title: "Filming",
            desc: "State-of-the-art equipment and cinematic techniques ensure breathtaking visuals.",
          },
          {
            icon: <Edit3 size={28} />,
            title: "Post Production",
            desc: "Advanced editing, color grading, and sound design to bring your story to life.",
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400">
              {step.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right - Tools */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-2 gap-8"
      >
        {[
          {
            icon: <Laptop size={32} className="text-purple-400 mb-3" />,
            title: "Software",
            desc: "Adobe Premiere Pro, DaVinci Resolve, After Effects",
          },
          {
            icon: <Camera size={32} className="text-purple-400 mb-3" />,
            title: "Equipment",
            desc: "Cinema Cameras, Drones, Gimbals, Lenses",
          },
          {
            icon: <Workflow size={32} className="text-purple-400 mb-3" />,
            title: "Process",
            desc: "Agile workflow, storyboarding, collaborative feedback loops",
          },
          {
            icon: <Wifi size={32} className="text-purple-400 mb-3" />,
            title: "Internet Speed",
            desc: "High-speed 1 Gbps connection for seamless remote collaboration",
          },
        ].map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition"
          >
            {tool.icon}
            <h4 className="text-lg font-semibold text-white">{tool.title}</h4>
            <p className="text-gray-400 text-sm">{tool.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>

  {/* Gradient bottom overlay for cinematic feel */}
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
</section>

      {/* Testimonials Section */}
      <Testimonials />
      {/* FAQ Section */}
      <section className="faq-section pt-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-[#1A0D2A] opacity-0 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white text-center leading-tight slide-in-right">
            Frequently Asked<br />{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 slide-in-right">
            Get clarity on how I can bring your vision to life with professional videography services.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-950 p-6 rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:border-purple-500 transition-all duration-300 ease-in-out cursor-pointer max-w-[50rem] mx-auto"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                  <HelpCircle className="text-purple-400" size={28} />
                  {faq.question}
                  <span className={`ml-auto transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}>
                    <ArrowUpRight size={20} className="text-purple-400" />
                  </span>
                </h3>
                <p
                  className={`text-gray-300 mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="py-14 px-4 sm:px-4 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-4xl font-bold mb-4 text-white text-center leading-tight slide-in-right">Still have questions?</h2>
            <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 slide-in-right">
              Don't hesitate to reach out. I'm here to help clarify anything about the process.
            </p>
          </div>
        </div>
      </section>
{/* ✅ CTA Section */}
<section className="relative py-20 bg-gray-900 overflow-hidden">
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-purple-900/30"></div>

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-bold text-white mb-6"
    >
      Ready to{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
        Start Your Project?
      </span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-gray-300 text-lg md:text-xl mb-10"
    >
      Let’s collaborate and bring your vision to life with cinematic excellence.
    </motion.p>

    <motion.a
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      href="/contact"
      className="inline-block px-10 py-4 text-lg font-semibold rounded-xl bg-white/10 border border-purple-400/50 backdrop-blur-sm 
      text-white hover:bg-white/20 hover:border-purple-400/80 transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
    >
      Contact Me
    </motion.a>
  </div>

  {/* Bottom cinematic fade */}
  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
</section>
      <Footer /> 
    </div>
  );
};

export default Home;