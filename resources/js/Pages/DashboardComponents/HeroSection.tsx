import React, { useEffect, useRef, useState } from 'react';
import { Calendar, CheckCircle, Stethoscope } from 'lucide-react';

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

const HeroSection = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative py-20 px-4 overflow-hidden transition-all duration-1000 ${
        heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-400/10"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Klinik Poli Paru
                <span className="block text-blue-600">Solusi Kesehatan</span>
                <span className="block text-green-500">Pernapasan Anda</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Dengan dokter spesialis berpengalaman, peralatan modern, dan pelayanan ramah untuk kesehatan paru-paru yang optimal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Calendar className="inline-block w-5 h-5 mr-2" />
                Buat Janji Sekarang
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Konsultasi Online
              </button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Dokter Spesialis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Peralatan Modern</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Pelayanan 24/7</span>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-500 ${
            heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-8 text-center shadow-inner">
                <div className="bg-blue-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Stethoscope className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Pelayanan Profesional</h3>
                <p className="text-gray-600">Tim medis berpengalaman dengan teknologi terdepan</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Stethoscope className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
