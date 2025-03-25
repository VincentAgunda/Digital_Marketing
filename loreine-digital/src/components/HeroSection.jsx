// HeroSection.jsx
import React from 'react';

function HeroSection() {
  return (
    <section className="py-20 md:py-36 relative overflow-hidden bg-cover bg-center" 
             style={{ backgroundImage: "url('background1.jpg')" }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Text Content */}
        <div className="text-center md:text-left md:max-w-lg lg:max-w-xl w-full mb-10 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            WE Are Brilliant In <br className="hidden md:block" /> Terms of Digital Marketing
          </h1>
          <p className="text-lg text-white mb-8">
            Book Your 30-minute strategy call
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Book Now
          </button>
        </div>

        {/* Image container */}
        <div className="relative w-full md:w-auto md:max-w-md lg:max-w-lg xl:mr-0">
          <img 
            src="placeholder-hero.png" 
            alt="Digital marketing illustration" 
            className="rounded-lg shadow-xl w-full max-w-xs md:max-w-none mx-auto md:mx-0" 
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;