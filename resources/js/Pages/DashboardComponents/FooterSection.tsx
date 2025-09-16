import React from 'react';
import { Activity, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">PoliParu Clinic</span>
            </div>
            <p className="text-gray-300 mb-4">
              Klinik spesialis paru terpercaya untuk kesehatan pernapasan yang optimal.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition-colors duration-300">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Tentang</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Layanan</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors">Dokter</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Konsultasi Spesialis</li>
              <li>Pemeriksaan Spirometri</li>
              <li>Rontgen Thorax</li>
              <li>Pengobatan TB & Asma</li>
              <li>Program Berhenti Merokok</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                Jl. Kesehatan Paru No. 123
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                (022) 123-4567
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                0812-3456-7890
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span>
                Sen-Jum: 08:00-17:00
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span>
                Sabtu: 08:00-12:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2025 PoliParu Clinic. All rights reserved. | Dibuat dengan ❤️ untuk kesehatan pernapasan yang lebih baik.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
