import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

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

const ContactSection = () => {
  const [contactRef, contactVisible] = useScrollAnimation(0.2);

  return (
    <section
      id="contact"
      ref={contactRef}
      className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${
        contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Kontak & Lokasi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hubungi kami atau kunjungi klinik kami untuk konsultasi dan pemeriksaan kesehatan pernapasan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Alamat</h4>
                    <p className="text-gray-600">Jl. Kesehatan Paru No. 123<br />Bandung, Jawa Barat 40123</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Telepon & WhatsApp</h4>
                    <p className="text-gray-600">(022) 123-4567<br />0812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Jam Operasional</h4>
                    <p className="text-gray-600">Senin - Jumat: 08:00 - 17:00<br />Sabtu: 08:00 - 12:00<br />Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6">Buat Janji Sekarang</h3>
              <p className="mb-6 text-blue-100">Jangan tunda kesehatan pernapasan Anda. Buat janji konsultasi sekarang!</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Telepon
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 delay-500 ${
            contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Lokasi Klinik</h3>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-gray-600 font-medium">Google Maps</p>
                <p className="text-sm text-gray-500 mt-2">Klik untuk melihat lokasi detail</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 transform hover:scale-105">
                Buka di Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
