import React from 'react';
import { FaCheckCircle, FaLightbulb, FaPalette, FaGlobe } from 'react-icons/fa';

function BuzzSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
          <div className="text-left mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
            <h3 className="text-2xl font-bold text-pink-500 mb-4">We create a curious BUZZ</h3>
            <p className="text-gray-700 mb-4">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has
              roots in a piece of classical Latin literature from 45 BC.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>For startups and growing businesses, an online specialist can develop a digital marketing plan to help you grow.</li>
              <li>Your digital consultant will also be able to kickstart campaigns and maximise your marketing budget.</li>
              <li>Lorem ipsum dolor sit amet, vis an natum labitur eleif, mel amet laudem prois menandri.</li>
            </ul>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full">
              Discover More
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <div className="bg-yellow-500 text-white rounded-md w-10 h-10 flex items-center justify-center mb-4">
                {/* Replace with your actual icon */}
                <FaCheckCircle />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Professional & Certified Company</h4>
              <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet vis an natum labitur eleif.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <div className="bg-blue-500 text-white rounded-md w-10 h-10 flex items-center justify-center mb-4">
                {/* Replace with your actual icon */}
                <FaLightbulb />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Business & Product Concept too</h4>
              <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet vis an natum labitur eleif.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <div className="bg-blue-400 text-white rounded-md w-10 h-10 flex items-center justify-center mb-4">
                {/* Replace with your actual icon */}
                <FaPalette />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Pixel & Perfect Design</h4>
              <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet vis an natum labitur eleif.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <div className="bg-pink-500 text-white rounded-md w-10 h-10 flex items-center justify-center mb-4">
                {/* Replace with your actual icon */}
                <FaGlobe />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">International Good Relationship</h4>
              <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet vis an natum labitur eleif.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuzzSection;