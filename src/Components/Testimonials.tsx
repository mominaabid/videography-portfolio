import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      role: "Startup Founder",
      company: "InnovateLab",
      avatar: "JW",
      rating: 5,
      text: "The storytelling in our company documentary was phenomenal. Alex took complex technical concepts and made them accessible and compelling. Investor presentations have never been easier.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Wedding Client",
      company: "Married 2023",
      avatar: "SM",
      rating: 5,
      text: "Our wedding video exceeded every expectation! Alex captured moments we didn't even notice on the day. The cinematography is absolutely stunning, and we've watched it countless times.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Marketing Director",
      company: "TechVision Inc",
      avatar: "MC",
      rating: 5,
      text: "Working with Alex transformed our brand presence. The commercial videos delivered exceptional ROI, and the creative vision brought our products to life in ways we never imagined possible.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Real Estate Agent",
      company: "Luxury Homes Co",
      avatar: "ER",
      rating: 5,
      text: "The property tour videos are game-changers! Properties sell 40% faster with Alex's cinematic approach. Clients are always impressed by the professional quality and attention to detail.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      name: "David Thompson",
      role: "Event Organizer",
      company: "Elite Events",
      avatar: "DT",
      rating: 5,
      text: "Alex covered our corporate conference flawlessly. The highlight reel captured the energy perfectly, and attendees still talk about the video. Truly professional and creative work!",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-purple relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
            <Star className="text-purple-400" size={16} fill="currentColor" />
            <span className="text-purple-300 text-xs sm:text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-white leading-tight">
            What Clients<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-full mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto px-4">
            Trusted by couples, businesses, and creators worldwide to capture their{' '}
            <span className="text-purple-400 font-semibold">most important moments</span>
          </p>
        </div>

        {/* Testimonial Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-gray-700/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:border-purple-500/50 transition-all duration-500 group">
            {/* Quote Icon */}
            <div className="absolute -top-4 sm:-top-6 left-4 sm:left-8">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${current.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
                <Quote size={24} className="text-white sm:w-8 sm:h-8" />
              </div>
            </div>

            {/* Large Quote Mark */}
            <div className="absolute top-2 sm:top-4 right-4 sm:right-8 opacity-5 sm:opacity-10">
              <Quote size={60} className="text-purple-400 sm:w-28 sm:h-28 md:w-32 md:h-32" />
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 justify-center md:justify-start relative z-10 pt-8 sm:pt-0">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-yellow-400 fill-yellow-400 animate-pulse sm:w-6 sm:h-6"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 relative z-10 italic text-center md:text-left">
              "{current.text}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 justify-center md:justify-start">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${current.color} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                {current.avatar}
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg">{current.name}</h4>
                <p className="text-gray-400 text-xs sm:text-sm">{current.role}</p>
                <p className="text-purple-400 text-xs sm:text-sm font-medium">{current.company}</p>
              </div>
            </div>

            {/* Decorative gradient line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r ${current.color} rounded-b-2xl sm:rounded-b-3xl opacity-50`}></div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 border border-gray-700 hover:border-purple-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-white sm:w-6 sm:h-6" />
            </button>

            {/* Dot Navigation */}
            <div className="flex gap-1.5 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-6 h-2.5 sm:w-8 sm:h-3 bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 border border-gray-700 hover:border-purple-500"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-white sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Counter */}
          <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
            {currentIndex + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;