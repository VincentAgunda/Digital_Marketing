import React from "react";

const Testimonials = () => {
  return (
    <section className="relative py-10 bg-gray-50 overflow-hidden" style={{ minHeight: '400px' }}>
      {/* Full-cover map background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="world-map4.png" 
          alt="World Map" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center h-full flex flex-col justify-center">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <p className="text-pink-500 font-semibold mb-1 md:mb-2 text-sm md:text-base">Testimonial</p>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-md mx-auto text-xs md:text-sm">
            Quis ipsum gravida. Accurman locus vel facilisis dolore magna aliqua locus dolor sit
            amet, consectetur adipiscing elitd do.
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="relative h-48 md:h-64">
          {/* Central Testimonial */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs md:max-w-md px-4">
            <div className="bg-white p-3 md:p-5 rounded-lg shadow-md">
              <p className="text-gray-700 italic text-xs md:text-sm mb-2 md:mb-3 leading-tight">
                "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with"
              </p>
              <div className="flex justify-center">
                <img 
                  src="seo.png" 
                  alt="Customer" 
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white shadow-md -mb-5 md:-mb-7"
                />
              </div>
            </div>
          </div>

          {/* Floating Customer Images - Compact Positions */}
          <img 
            src="seo.png" 
            alt="Customer" 
            className="absolute top-3 left-3 md:top-8 md:left-12 w-6 h-6 md:w-10 md:h-10 rounded-full border border-white shadow"
          />
          <img 
            src="seo.png" 
            alt="Customer" 
            className="absolute top-3 right-3 md:top-8 md:right-12 w-6 h-6 md:w-10 md:h-10 rounded-full border border-white shadow"
          />
          <img 
            src="seo.png" 
            alt="Customer" 
            className="absolute top-1/2 left-1 md:left-6 transform -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full border border-white shadow"
          />
          <img 
            src="seo.png" 
            alt="Customer" 
            className="absolute top-1/2 right-1 md:right-6 transform -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full border border-white shadow"
          />
          <img 
            src="seo.png" 
            alt="Customer" 
            className="absolute bottom-3 left-3 md:bottom-8 md:left-12 w-6 h-6 md:w-10 md:h-10 rounded-full border border-white shadow"
          />
          <img 
            src="seo.png" 
            alt="Customer" 
            className="absolute bottom-3 right-3 md:bottom-8 md:right-12 w-6 h-6 md:w-10 md:h-10 rounded-full border border-white shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;