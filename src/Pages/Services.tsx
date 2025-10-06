import { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Award,
  Users,
  Heart,
  Star,
  TrendingUp,
  CheckCircle,
  Home,
  User,
  Palette,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/footer';

interface VisibilityState {
  [key: string]: boolean;
}

export default function ServicesPage() {
  const [typewriterText, setTypewriterText] = useState<string>('');
  const fullText =
    'Elevating Your Vision Through Professional Cinematography';
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
    satisfaction: 0,
  });
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Typewriter Effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setIsVisible((prev: VisibilityState) => ({
              ...prev,
              [target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el: Element) => {
      if (observerRef.current) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Animated Stats Counter
  useEffect(() => {
    if (isVisible['stats-title']) {
      let start = 0;
      const endValues = { projects: 500, clients: 300, awards: 15, satisfaction: 98 };
      const duration = 2000;
      const increment = 20;

      const counter = setInterval(() => {
        start += increment;
        setAnimatedStats({
          projects: Math.min(Math.floor((endValues.projects * start) / duration), endValues.projects),
          clients: Math.min(Math.floor((endValues.clients * start) / duration), endValues.clients),
          awards: Math.min(Math.floor((endValues.awards * start) / duration), endValues.awards),
          satisfaction: Math.min(Math.floor((endValues.satisfaction * start) / duration), endValues.satisfaction),
        });
        if (start >= duration) clearInterval(counter);
      }, increment);
    }
  }, [isVisible['stats-title']]);

  const services = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Wedding',
      video: 'wedding.mp4',
      description:
        "Capture your special day with cinematic excellence. We blend documentary and artistic styles to create timeless memories that you'll cherish forever.",
      features: [
        '4K/8K Resolution',
        'Drone Footage',
        'Same Day Edit',
        'Multi-Cam Setup',
      ],
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: 'Real Estate',
      video: 'real.mp4',
      description:
        'Showcase properties with stunning visuals that sell. Professional tours, aerial shots, and compelling narratives that make listings stand out.',
      features: [
        'Virtual Tours',
        'Aerial Shots',
        'Twilight Photos',
        'Floor Plans',
      ],
    },
    {
      icon: <User className="w-12 h-12" />,
      title: 'Talking Head',
      video: 'talking.mp4',
      description:
        'Professional interview and presentation videos. Perfect lighting, clear audio, and expert editing for corporate communications and testimonials.',
      features: [
        'Studio Setup',
        'Teleprompter',
        'Audio Design',
        'Green Screen',
      ],
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: 'Others',
      video: 'intro.mp4',
      description:
        'From music videos to documentaries, commercials to social media content. Whatever your vision, we bring it to life with creative excellence.',
      features: ['Music Videos', 'Commercials', 'Documentaries', 'Social Media'],
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery Call',
      description:
        'We start by understanding your vision, goals, and creative preferences in a detailed consultation.',
      delay: '0',
    },
    {
      step: '02',
      title: 'Pre-Production',
      description:
        'Planning everything from storyboards to location scouting, ensuring every detail is perfect.',
      delay: '200',
    },
    {
      step: '03',
      title: 'Production',
      description:
        'Professional filming with state-of-the-art equipment and a skilled crew to capture your story.',
      delay: '400',
    },
    {
      step: '04',
      title: 'Post-Production',
      description:
        'Expert editing, color grading, and sound design to deliver a polished final product.',
      delay: '600',
    },
  ];

  const stats = [
    { icon: <Star className="w-8 h-8" />, number: animatedStats.projects + '+', label: 'Projects Completed' },
    { icon: <Users className="w-8 h-8" />, number: animatedStats.clients + '+', label: 'Happy Clients' },
    { icon: <Award className="w-8 h-8" />, number: animatedStats.awards + '+', label: 'Industry Awards' },
    { icon: <TrendingUp className="w-8 h-8" />, number: animatedStats.satisfaction + '%', label: 'Client Satisfaction' },
  ];

  const equipment = [
    { name: 'Cinema Cameras', items: ['RED Komodo 6K', 'Sony FX6', 'Canon C70', 'Blackmagic 6K'] },
    { name: 'Lenses & Optics', items: ['Zeiss CP.3', 'Canon RF Series', 'Sigma Cine', 'Anamorphic'] },
    { name: 'Audio Equipment', items: ['Sennheiser', 'Rode Wireless', 'Zoom Recorders', 'Lavs'] },
    { name: 'Lighting & Grip', items: ['Aputure 600D', 'ARRI SkyPanel', 'Sliders', 'Gimbals'] },
  ];

  const testimonials = [
    {
      name: 'Sarah & John',
      role: 'Wedding Couple',
      text: 'Our wedding film exceeded all expectations. Every emotional moment was captured beautifully!',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Real Estate Agent',
      text: 'The property videos have increased our listing views by 300%. Absolutely phenomenal work!',
      rating: 5,
    },
    {
      name: 'Tech Startup Inc',
      role: 'Corporate Client',
      text: 'Professional, creative, and delivered on time. Our testimonial videos look incredible!',
      rating: 5,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <Header />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progress {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 1s ease-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `,
        }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/Service2.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 mb-8 animate-fade-in">
            <Award className="w-5 h-5 text-purple-400 animate-spin-slow" />
            <span className="text-purple-300 text-sm font-medium">
              Award-Winning Services
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-slide-up">
            Our Services
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate id="services-title">
            <h2
              className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
                isVisible['services-title']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              What We{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Offer
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                data-animate
                id={`service-${index}`}
                className={`group relative bg-black rounded-2xl border border-purple-500/20 transition-all duration-700 hover:scale-105 overflow-hidden ${
                  isVisible[`service-${index}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Auto-playing Video */}
                <div className="absolute inset-0 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-70 transition-opacity duration-700"
                  >
                    <source src={`/${service.video}`} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>

                <div className="relative p-8 z-10">
                  <div className="text-purple-400 mb-6">{service.icon}</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-pink-500" />
                        <span className="text-sm text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            data-animate
            id="process-title"
          >
            <h2
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                isVisible['process-title']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              Our{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="text-center transition-all duration-1000"
                style={{ transitionDelay: item.delay + 'ms' }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-bold relative">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/30">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
            data-animate
            id="equipment-title"
          >
            <h2
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                isVisible['equipment-title']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              Professional{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Equipment
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {equipment.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:scale-105 transition-all duration-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-400 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Client{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:scale-105 transition-all duration-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="text-white font-bold">
                    {testimonial.name}
                  </h4>
                  <p className="text-purple-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className={`text-5xl md:text-6xl font-bold mb-16 ${
              isVisible['stats-title']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            id="stats-title"
            data-animate
          >
            Excellence in{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 hover:scale-110 transition-all duration-700"
              >
                <div className="text-purple-400 flex justify-center mb-4 animate-pulse">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 mb-8 animate-fade-in">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">
              Ready to Get Started?
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Let's Create Something
            <br />
            Extraordinary Together
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your vision into stunning visual stories. Our award-winning team is ready to bring your project to life with cinematic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/Contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="/Contact"
              className="px-10 py-5 border-2 border-purple-500/50 rounded-full font-bold text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
            >
              Schedule a Consultation
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                Fast
              </div>
              <div className="text-gray-400 text-sm">Turnaround Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                Free
              </div>
              <div className="text-gray-400 text-sm">Initial Consultation</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}