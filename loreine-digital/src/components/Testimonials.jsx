import React from 'react';

function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 mb-12">
          Quis ipsum gravida. Accumsan lacus vel facilisis. Dolor magna eget est lorem dolor sed.
          Nullam non nisi est sit amet.
        </p>
        <div className="relative bg-white rounded-lg shadow-md py-12 px-8">
          {/* World map background (you might need to implement this with an image or more complex CSS) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-50 rounded-lg">
            {/* Replace with your world map image or SVG */}
            <img src="placeholder-world-map.png" alt="World Map" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="relative z-10 flex justify-center items-center flex-col">
            {/* Central Testimonial */}
            <img
              src="placeholder-customer-central.png"
              alt="Keya Akter"
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
            />
            <p className="italic text-gray-700 mb-2 text-lg">
              Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
              A small river named Duden flows by their place and supplies it with
            </p>
            <h4 className="font-semibold text-gray-800 mb-1">Keya Akter</h4>
            <p className="text-gray-500 text-sm">Customer</p>
          </div>
          {/* Surrounding Customer Avatars - Adjust positioning as needed */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <img src="placeholder-customer1.png" alt="Customer 1" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <img src="placeholder-customer2.png" alt="Customer 2" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute top-1/2 left-1/8 transform -translate-x-1/2">
            <img src="placeholder-customer3.png" alt="Customer 3" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute top-1/2 right-1/8 transform translate-x-1/2">
            <img src="placeholder-customer4.png" alt="Customer 4" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2">
            <img src="placeholder-customer5.png" alt="Customer 5" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <img src="placeholder-customer6.png" alt="Customer 6" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="placeholder-customer7.png" alt="Customer 7" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
          <div className="absolute bottom-1/8 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img src="placeholder-customer8.png" alt="Customer 8" className="w-12 h-12 rounded-full object-cover shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;