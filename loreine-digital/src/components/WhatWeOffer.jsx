// WhatWeOffer.jsx
import React from 'react';
import { FaCode, FaShareAlt, FaSearch, FaBullhorn } from 'react-icons/fa';

function WhatWeOffer() {
  return (
    <section id="what-we-offer-section" className="py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-4 border border-gray-200 rounded-lg shadow-md">
            <div className="text-pink-500 text-xl mb-2"><FaCode /></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Web Design & Development</h3>
            <p className="text-gray-600 text-sm">Brief description.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-md">
            <div className="text-pink-500 text-xl mb-2"><FaShareAlt /></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Social Media Marketing</h3>
            <p className="text-gray-600 text-sm">Brief description.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-md">
            <div className="text-pink-500 text-xl mb-2"><FaSearch /></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">SEO & Content Marketing</h3>
            <p className="text-gray-600 text-sm">Brief description.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-md">
            <div className="text-pink-500 text-xl mb-2"><FaBullhorn /></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">PPC & Advertising</h3>
            <p className="text-gray-600 text-sm">Brief description.</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center mb-6">
          <div className="md:w-1/2 p-6">
          <img 
              src="seo.png" 
              alt="SEO Illustration" 
              className="rounded-lg object-cover w-full h-full max-h-60"
              style={{ objectPosition: 'center' }}
            />
          </div>
          <div className="md:w-1/2 p-6 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Search Engine Optimization</h3>
            <p className="text-gray-700 mb-3 text-sm">
              We work systematically to integrate corporate responsibility in our cores business and make our expertise available for the benefit of the society where we operate expertise available.
            </p>
            <p className="text-gray-700 mb-3 text-sm">
              We work systematically to integrate corporate responsibility in our cores business and make our expertise available.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full text-sm">
              Learn More
            </button>
          </div>
        </div>
        <div id="about-us-section" className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-6 text-center md:text-left">
            <h4 className="text-pink-500 font-semibold mb-1 text-sm">About Us</h4>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">We Are Here For Business Solution Idea</h3>
            <p className="text-gray-700 mb-3 text-sm">
              We work systematically to integrate corporate responsibility in our cores business and make our expertise available for the benefit of the society where we operate expertise available.
            </p>
            <p className="text-gray-700 mb-3 text-sm">
              corporate responsibility in our cores business and make our expertise available for the benefit of the society.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full text-sm">
              Discover More
            </button>
          </div>
          <div className="md:w-1/2 p-6 flex justify-center">
          <img 
              src="image-solution.png" 
              alt="SEO Illustration" 
              className="rounded-lg object-cover w-full h-full max-h-60"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeOffer;