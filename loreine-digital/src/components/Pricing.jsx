import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pricingPlans = [
    {
      title: "WEB PREMIUM",
      price: "349",
      tagline: "ADVANCED SOLUTION",
      description: "FOR ESTABLISHED BUSINESSES",
      features: [
        "Up to 25 pages",
        "Multi-language support",
        "Full e-commerce suite (unlimited products)",
        "Advanced analytics & conversion tracking",
        "15 content updates per month"
      ],
      cta: "START YOUR WEB PREMIUM",
      footnote: "Free design preview before you commit"
    },
    {
      title: "WEB ESSENTIALS",
      price: "199",
      tagline: "BASIC SOLUTION",
      description: "FOR SMALL BUSINESSES",
      features: [
        "Up to 10 pages",
        "Basic SEO setup",
        "Contact form integration",
        "Basic analytics",
        "5 content updates per month"
      ],
      cta: "START YOUR WEB ESSENTIALS",
      footnote: "Free design preview before you commit"
    },
    {
      title: "WEB ENTERPRISE",
      price: "599",
      tagline: "PREMIUM SOLUTION",
      description: "FOR LARGE BUSINESSES",
      features: [
        "Unlimited pages",
        "Multi-language & regional support",
        "Enterprise e-commerce solutions",
        "Dedicated account manager",
        "Unlimited content updates",
        "Priority support"
      ],
      cta: "START YOUR WEB ENTERPRISE",
      footnote: "Free design preview before you commit"
    }
  ];

  return (
    <>
      {/* Just the NEXTGENDESIGN card without the white container */}
      <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="px-6 py-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            <span className="text-indigo-600">NEXTGEN</span>DESIGN
          </h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            WEBSITE PRICING
          </h3>
          <p className="text-sm text-gray-600 mb-4">Customised to your business needs</p>
          <ul className="space-y-2 mb-6 text-left text-sm">
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free initial design
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Pay only when satisfied
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fully responsive designs
            </li>
          </ul>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full shadow-sm text-sm transition-all duration-300 hover:shadow-md hover:scale-105"
          >
            EXPLORE OUR PLANS
          </button>
          <div className="mt-4 text-xs text-gray-600">
            Monthly plans from only <span className="font-semibold">Ksh 790</span>
            <br />
            <span className="font-semibold">10% discount</span> on yearly billing
          </div>
        </div>
        <div className="bg-gray-100 py-2 text-center text-gray-500 text-xs">
          nextdesign.io
        </div>
      </div>

      {/* Modal remains the same */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="fixed inset-0 flex items-start md:items-center justify-center p-3 pt-20 md:pt-3 z-50 overflow-y-auto"
            >
              <div 
                className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Our Plans</h3>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pricingPlans.map((plan, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="border border-gray-200 rounded-lg p-3 bg-white hover:border-indigo-200 transition-all duration-200"
                      >
                        <div className="text-center">
                          <span className="inline-block px-2 py-0.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full mb-1">
                            {plan.tagline}
                          </span>
                          <h4 className="text-base font-bold text-gray-800">{plan.title}</h4>
                          <p className="text-xs text-gray-600 mb-1">{plan.description}</p>
                          
                          <div className="my-2">
                            <span className="text-2xl font-bold text-gray-900">£{plan.price}</span>
                            <span className="text-gray-600 text-sm">/month</span>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-2">SAVE 10% WITH YEARLY BILLING</p>
                          
                          <ul className="space-y-1 mb-3 text-left text-xs">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="w-3 h-3 mt-0.5 mr-1.5 text-green-500 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-3 rounded text-xs"
                          >
                            {plan.cta}
                          </motion.button>
                          
                          <p className="text-xs text-gray-500 mt-1">
                            {plan.footnote}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Pricing;