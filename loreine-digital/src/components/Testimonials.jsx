import React from "react";

const Testimonials = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-120px)] flex items-center justify-center py-10 px-4">
      {/* Background from SharedLayout */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/world-map4.png"
          alt="background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/fallback-bg.jpg'; // Add a fallback image
            e.target.className = 'w-full h-full object-cover bg-blue-900'; // Fallback background
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <p className="text-pink-500 font-semibold mb-2 md:mb-3 text-sm md:text-base">
            Testimonial
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-5">
            What Our Customers Say
          </h2>
          <p className="text-gray-200 max-w-md mx-auto text-sm md:text-base">
            Quis ipsum gravida. Accurman locus vel facilisis dolore magna aliqua locus dolor sit
            amet, consectetur adipiscing elitd do.
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="relative h-56 md:h-72 w-full">
          {/* Central Testimonial */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm md:max-w-md px-4">
            <div className="bg-white bg-opacity-90 p-4 md:p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 italic text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
                "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with"
              </p>
              <div className="flex justify-center">
                <img
                  src="/seo.png"
                  alt="Customer"
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white shadow-lg -mb-6 md:-mb-8"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating Customer Images */}
          {[...Array(6)].map((_, i) => (
            <img
              key={i}
              src="/seo.png"
              alt="Customer"
              className={`absolute w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg ${
                i === 0 ? 'top-4 left-4 md:top-10 md:left-16' :
                i === 1 ? 'top-4 right-4 md:top-10 md:right-16' :
                i === 2 ? 'top-1/2 left-2 md:left-8 transform -translate-y-1/2' :
                i === 3 ? 'top-1/2 right-2 md:right-8 transform -translate-y-1/2' :
                i === 4 ? 'bottom-4 left-4 md:bottom-10 md:left-16' :
                'bottom-4 right-4 md:bottom-10 md:right-16'
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.png';
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;