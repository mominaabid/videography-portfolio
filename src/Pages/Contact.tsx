import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Award, MessageSquare, User, AtSign, Hash, FileText, CheckCircle, Star, Heart, Camera } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/footer';
interface VisibilityState {
  [key: string]: boolean;
}

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [typewriterText, setTypewriterText] = useState<string>('');
  const fullText = "Let's Create Something Extraordinary Together";
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setIsVisible((prev: VisibilityState) => ({ ...prev, [target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el: Element) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', whatsapp: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      info: "+92 300 1234567",
      link: "tel:+923001234567"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "info@alexrodriguez.com",
      link: "mailto:info@alexrodriguez.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      info: "I-8, Islamabad, Pakistan",
      link: "#map"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      info: "Mon - Sat: 9AM - 8PM",
      link: "#"
    }
  ];

  const reasons = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning",
      description: "15+ industry awards and recognition"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "500+ Projects",
      description: "Successfully delivered with excellence"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "98% Satisfaction",
      description: "Happy clients who return"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Cinema-grade equipment & expertise"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
        <Header />
      <style dangerouslySetInnerHTML={{__html: `
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

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}} />

      {/* Hero Section with Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/contact.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_: undefined, i: number) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-500/30 mb-8 animate-fade-in">
            <MessageSquare className="w-5 h-5 text-purple-400 animate-spin-slow" />
            <span className="text-purple-300 text-sm font-medium">We're Here to Help</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-slide-up">
            Get in Touch
          </h1>
          
          <div className="h-20 flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
            Have a project in mind? Let's discuss how we can bring your vision to life with our cinematic expertise.
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {contactInfo.map((item, index: number) => (
              <a
                key={index}
                href={item.link}
                className="flex items-center gap-4 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">{item.title}</h3>
                  <p className="text-white font-semibold">{item.info}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Contact Form Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12" data-animate id="contact-section">
            {/* Map */}
            <div className={`transition-all duration-1000 ${isVisible['contact-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Visit Our <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Studio</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Drop by our studio in Islamabad or reach out online. We're always excited to meet new clients and discuss creative projects.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-2xl shadow-purple-500/20" id="map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26565.10740840091!2d73.05255576450394!3d33.666529509507775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9544389abb3f%3A0x8ea6e9c4c6afe851!2sI-8%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1759717562615!5m2!1sen!2s" 
                  width="100%" 
                  height="500" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible['contact-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Send Us a <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Message</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <User className="w-4 h-4 text-purple-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <AtSign className="w-4 h-4 text-purple-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <Phone className="w-4 h-4 text-purple-400" />
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <Hash className="w-4 h-4 text-purple-400" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Wedding Videography Inquiry"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {isSubmitted ? (
                  <div className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full animate-pulse-glow">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">Message Sent Successfully!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50 group cursor-pointer"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate id="reasons-title">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible['reasons-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Why <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Choose Us</span>
            </h2>
            <p className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['reasons-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              We don't just capture moments, we create cinematic experiences that last forever
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index: number) => (
              <div
                key={index}
                data-animate
                id={`reason-${index}`}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 ${isVisible[`reason-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    {reason.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{reason.title}</h3>
                <p className="text-gray-400">{reason.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center" data-animate id="final-cta">
            <div className={`transition-all duration-1000 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-2xl text-gray-300 mb-8">
                Ready to start your project? Let's make it happen!
              </p>
              <a
                href="#contact-section"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-6 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/50 cursor-pointer text-xl font-semibold"
              >
                <Heart className="w-6 h-6 animate-pulse" />
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
        <Footer />
    </div>
  );
}