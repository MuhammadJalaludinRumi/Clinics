import React, { useEffect, useRef, useState } from 'react';
import {
  Stethoscope,
  Activity,
  Microscope,
  Shield,
  Heart,
  Users
} from 'lucide-react';

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

const ServicesSection = () => {
  const [servicesRef, servicesVisible] = useScrollAnimation(0.2);

  const services = [
    {
      title: "Konsultasi Dokter Spesialis",
      description: "Konsultasi langsung dengan dokter spesialis paru berpengalaman",
      icon: Stethoscope,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Pemeriksaan Spirometri",
      description: "Tes fungsi paru untuk mengetahui kapasitas dan kondisi paru-paru",
      icon: Activity,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Rontgen Thorax",
      description: "Pemeriksaan radiologi untuk deteksi gangguan pada paru-paru",
      icon: Microscope,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Pengobatan TB & Asma",
      description: "Penanganan komprehensif untuk tuberculosis, asma, dan PPOK",
      icon: Shield,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Program Berhenti Merokok",
      description: "Program terstruktur untuk membantu Anda berhenti merokok",
      icon: Heart,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Konseling Kesehatan Paru",
      description: "Edukasi dan konseling untuk menjaga kesehatan pernapasan",
      icon: Users,
      color: "bg-teal-100 text-teal-600"
    }
  ];

  return (
    <section
      id="services"
      ref={servicesRef}
      className={`py-20 px-4 bg-white transition-all duration-1000 ${
        servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Layanan Poli Paru</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan layanan kesehatan pernapasan yang lengkap dan berkualitas untuk semua kebutuhan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${
                servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: servicesVisible ? `${300 + index * 100}ms` : '0ms'
              }}
            >
              <div className={`inline-flex p-4 rounded-2xl ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              <div className="mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
                  Pelajari Lebih Lanjut →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
