import React, { useEffect, useRef, useState } from 'react';
import { Star, User } from 'lucide-react';

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

const TestimonialsSection = () => {
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation(0.2);

  const testimonials = [
    {
      name: "Budi Santoso",
      rating: 5,
      comment: "Pelayanan sangat baik, dokternya ramah dan penjelasannya detail. Asma saya sekarang terkontrol dengan baik.",
      profession: "Manager"
    },
    {
      name: "Siti Rahayu",
      rating: 5,
      comment: "Fasilitas modern dan bersih. Proses pemeriksaan cepat dan hasilnya akurat. Sangat puas!",
      profession: "Guru"
    },
    {
      name: "Agus Wijaya",
      rating: 5,
      comment: "Berkat program berhenti merokok di sini, saya sudah 6 bulan bebas rokok. Terima kasih!",
      profession: "Teknisi"
    }
  ];

  return (
    <section
      ref={testimonialsRef}
      className={`py-20 px-4 bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-1000 ${
        testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-white mb-4">Testimoni Pasien</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Apa kata pasien kami tentang pelayanan dan pengalaman mereka di klinik.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-500 ${
                testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: testimonialsVisible ? `${300 + index * 150}ms` : '0ms'
              }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full p-3 mr-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.profession}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
