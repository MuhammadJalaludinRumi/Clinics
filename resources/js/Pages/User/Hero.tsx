import { Calendar, CheckCircle, Stethoscope } from "lucide-react";
import { useScrollAnimation } from "../Hooks/useScrollAnimation";

export default function HeroSection() {
  const [heroRef, heroVisible] = useScrollAnimation(0.3);

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative py-20 px-4 overflow-hidden transition-all duration-1000 ${
        heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Klinik Poli Paru
              <span className="block text-blue-600">Solusi Kesehatan</span>
              <span className="block text-green-500">Pernapasan Anda</span>
            </h1>
            <p className="text-xl text-gray-600 mt-4">
              Dengan dokter spesialis berpengalaman, peralatan modern, dan pelayanan ramah.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Buat Janji
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-semibold">
                Konsultasi Online
              </button>
            </div>
            <div className="mt-6 flex gap-6 text-sm text-gray-600">
              <span className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2"/> Dokter Spesialis</span>
              <span className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2"/> 24/7</span>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl">
            <div className="text-8xl text-center mb-4">🏥</div>
            <p className="text-center font-medium">Tim Medis Profesional</p>
            <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Stethoscope className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
