import React from 'react';
import Navigation from './DashboardComponents/Navigation';
import HeroSection from './DashboardComponents/HeroSection';
import AboutSection from './DashboardComponents/AboutSection';
import ServicesSection from './DashboardComponents/ServicesSection';
import DoctorsSection from './DashboardComponents/DoctorsSection';
import FacilitiesSection from './DashboardComponents/FacilitiesSection';
import TestimonialsSection from './DashboardComponents/TestimonialsSection';
import ContactSection from './DashboardComponents/ContactSection';
import Footer from './DashboardComponents/FooterSection';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DoctorsSection />
      <FacilitiesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Dashboard;
