import React, { useEffect, useRef, useState } from 'react';
import { Award, Heart } from 'lucide-react';

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

const AboutSection = () => {
  const [aboutRef, aboutVisible] = useScrollAnimation(0.2);

  return (
    <section
      id="about"
      ref={aboutRef}
      className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${
        aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tentang Klinik Poli Paru</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami berkomitmen memberikan pelayanan kesehatan pernapasan terbaik dengan pendekatan holistik dan teknologi terdepan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${
            aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-8 w-8 text-blue-600 mr-3" />
                Misi Kami
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Membantu setiap pasien dengan gangguan pernapasan untuk mencapai kualitas hidup yang lebih sehat melalui pelayanan medis yang komprehensif dan berkualitas tinggi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                Visi Kami
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi klinik poli paru terdepan yang dipercaya masyarakat dalam memberikan solusi kesehatan pernapasan yang inovatif dan berkelanjutan.
              </p>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-500 ${
            aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-gradient-to-br from-blue-500 to-green-400 rounded-3xl p-8 text-white shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-sm opacity-90">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">5000+</div>
                  <div className="text-sm opacity-90">Pasien Ditangani</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-sm opacity-90">Tingkat Kepuasan</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-90">Layanan Darurat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
