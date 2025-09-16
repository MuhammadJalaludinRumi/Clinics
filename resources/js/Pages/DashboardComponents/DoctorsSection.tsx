import React, { useEffect, useRef, useState } from 'react';
import { Clock, User } from 'lucide-react';

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

const DoctorsSection = () => {
  const [doctorsRef, doctorsVisible] = useScrollAnimation(0.2);

  const doctors = [
    {
      name: "Dr. Ahmad Respiratory, Sp.P",
      specialty: "Spesialis Pulmonologi",
      experience: "15+ tahun pengalaman",
      schedule: "Senin - Jumat: 08:00 - 16:00",
      education: "Universitas Indonesia",
      certification: "Ikatan Dokter Paru Indonesia"
    },
    {
      name: "Dr. Sarah Pneumonia, Sp.P",
      specialty: "Spesialis Paru & Pernapasan",
      experience: "12+ tahun pengalaman",
      schedule: "Selasa - Sabtu: 09:00 - 17:00",
      education: "Universitas Gadjah Mada",
      certification: "American Thoracic Society"
    }
  ];

  return (
    <section
      id="doctors"
      ref={doctorsRef}
      className={`py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50 transition-all duration-1000 ${
        doctorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
          doctorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Dokter Spesialis Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tim dokter spesialis paru berpengalaman yang siap memberikan pelayanan terbaik untuk kesehatan pernapasan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                doctorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: doctorsVisible ? `${400 + index * 200}ms` : '0ms'
              }}
            >
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 flex-shrink-0">
                  <User className="h-16 w-16 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience}</p>

                  <div className="space-y-3 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">{doctor.schedule}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-700">Pendidikan:</span>
                        <span className="text-gray-600 ml-2">{doctor.education}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-gray-700">Sertifikasi:</span>
                        <span className="text-gray-600 ml-2">{doctor.certification}</span>
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                    Buat Janji dengan Dokter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
