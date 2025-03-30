import React from 'react';
import { FaCode, FaShareAlt, FaSearch, FaBullhorn } from 'react-icons/fa';

const services = [
  { 
    icon: <FaCode size={20} />, 
    title: "Web Design & Development", 
    desc: "Custom websites tailored to your business needs.",
    color: "#EFFAFE" // Light blue
  },
  { 
    icon: <FaShareAlt size={20} />, 
    title: "Social Media Marketing", 
    desc: "Boost your online presence across platforms.",
    color: "#1C4550" // Dark teal
  },
  { 
    icon: <FaSearch size={20} />, 
    title: "SEO & Content Marketing", 
    desc: "Improve visibility and organic traffic.",
    color: "#BF8167" // Muted orange
  },
  { 
    icon: <FaBullhorn size={20} />, 
    title: "PPC & Advertising", 
    desc: "Targeted ads for maximum ROI.",
    color: "#E4650D" // Vibrant orange
  }
];

const FeatureCard = ({ img, title, subtitle, desc, buttonText, reverse = false, color }) => (
  <div className={`rounded-lg shadow-md overflow-hidden flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center mb-6`} style={{ backgroundColor: color }}>
    <div className="w-full md:w-1/2 p-4 md:p-6">
      <img 
        src={img} 
        alt={title} 
        className="rounded-lg object-cover w-full h-40 md:h-48 mx-auto"
        loading="lazy"
      />
    </div>
    <div className="w-full md:w-1/2 p-4 md:p-6 text-center md:text-left">
      {subtitle && <h4 className="text-white font-semibold mb-1 text-sm">{subtitle}</h4>}
      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
      {desc.map((paragraph, i) => (
        <p key={i} className="text-white mb-3 text-xs md:text-sm">{paragraph}</p>
      ))}
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full text-xs md:text-sm transition-colors">
        {buttonText}
      </button>
    </div>
  </div>
);

function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="py-8 md:py-12 px-4" style={{ backgroundColor: "#F0F0F0"}}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">What We Offer</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="p-4 md:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: service.color,
                color: i === 0 ? "#1C4550" : "white" // Dark text for light background
              }}
            >
              <div className="flex justify-center md:justify-start text-xl mb-3" style={{ color: i === 0 ? "EFFAFE" : "white" }}>
                {service.icon}
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-center md:text-left">{service.title}</h3>
              <p className="text-xs md:text-sm text-center md:text-left" style={{ opacity: i === 0 ? 0.9 : 0.8 }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <FeatureCard 
          img="camera1.png" 
          title="Search Engine Optimization" 
          desc={[
            "We work systematically to integrate corporate responsibility in our core business and make our expertise available for the benefit of society.",
            "Our proven strategies deliver measurable results for your online presence."
          ]} 
          buttonText="Learn More"
          color="#1C4550"
        />

        <FeatureCard 
          img="image-solution.png" 
          title="We Are Here For Business Solution Ideas" 
          subtitle="About Us"
          desc={[
            "We combine innovation with expertise to deliver comprehensive digital solutions.",
            "Our team is dedicated to helping your business thrive in the digital landscape."
          ]} 
          buttonText="Discover More" 
          reverse 
          color="#1C4550"
        />
      </div>
    </section>
  );
}

export default WhatWeOffer;