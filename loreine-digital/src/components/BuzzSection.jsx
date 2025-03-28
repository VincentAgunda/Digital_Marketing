import React from "react";
import { FaCheckCircle, FaLightbulb, FaPalette, FaGlobe } from "react-icons/fa";

function BuzzSection() {
  const features = [
    { Icon: FaCheckCircle, title: "Certified Company", bg: "bg-yellow-500" },
    { Icon: FaLightbulb, title: "Business Concepts", bg: "bg-blue-500" },
    { Icon: FaPalette, title: "Perfect Design", bg: "bg-blue-400" },
    { Icon: FaGlobe, title: "Global Relationships", bg: "bg-pink-500" },
  ];

  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Why Choose Us</h2>
          <h3 className="text-lg font-bold text-pink-500 mb-2">We create a curious BUZZ</h3>
          <p className="text-gray-600 text-xs mb-2">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </p>
          <ul className="text-gray-600 text-xs mb-3 space-y-1">
            <li>✔️ Marketing strategies for startups</li>
            <li>✔️ Experts optimize budgets</li>
            <li>✔️ Tailored digital solutions</li>
          </ul>
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs py-1.5 px-3 rounded-full">
            Discover More
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {features.map(({ Icon, title, bg }, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded shadow-xs flex flex-col items-center">
              <div className={`${bg} text-white rounded w-7 h-7 flex items-center justify-center mb-1`}>
                <Icon size={12} />
              </div>
              <h4 className="text-xs font-bold text-gray-800">{title}</h4>
              <p className="text-2xs text-gray-500">Lorem ipsum</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BuzzSection;