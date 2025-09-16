import React, { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">PoliParu Clinic</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Tentang</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Layanan</a>
            <a href="#doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Dokter</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Kontak</a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-700">Tentang</a>
              <a href="#services" className="block px-3 py-2 text-gray-700">Layanan</a>
              <a href="#doctors" className="block px-3 py-2 text-gray-700">Dokter</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700">Kontak</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
