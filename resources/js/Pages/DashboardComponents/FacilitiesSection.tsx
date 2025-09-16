import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Home, Microscope, ShoppingBag, Car } from 'lucide-react';

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

const FacilitiesSection = () => {
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation(0.2);

  const facilities = [
    "Ruang tunggu nyaman ber-AC",
    "Sistem booking online 24/7",
    "Laboratorium dalam gedung",
    "Apotek lengkap tersedia",
    "Parkir luas & gratis",
    "Ramah untuk anak & lansia"
  ];

  const facilityCards = [
    {
      icon: Home,
      title: "Ruang Tunggu",
      description: "Nyaman & Ber-AC",
      color: "from-blue-100 to-blue-50"
    },
    {
      icon: Microscope,
      title: "Laboratorium",
      description: "Peralatan Modern",
      color: "from-green-100 to-green-50"
    },
    {
      icon: ShoppingBag,
      title: "Apotek",
      description: "Obat Lengkap",
      color: "from-purple-100 to-purple-50"
    },
    {
      icon: Car,
      title: "Parkir",
      description: "Luas & Gratis",
      color: "from-orange-100 to-orange-50"
    }
  ];

  return (
    <section
      ref={facilitiesRef}
      className={`py-20 px-4 bg-white transition-all duration-1000 ${
        facilitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          facilitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Fasilitas Klinik</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dilengkapi dengan fasilitas modern dan nyaman untuk memberikan pengalaman terbaik bagi pasien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-500 ${
                facilitiesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                transitionDelay: facilitiesVisible ? `${300 + index * 100}ms` : '0ms'
              }}
            >
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{facility}</span>
            </div>
          ))}
        </div>

        <div className={`mt-16 grid md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${
          facilitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {facilityCards.map((facility, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${facility.color} rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                <facility.icon className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{facility.title}</h4>
              <p className="text-sm text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
