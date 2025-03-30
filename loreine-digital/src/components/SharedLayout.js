// src/components/SharedLayout.js
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with fixed positioning and z-index */}
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
      
      {/* Content area with proper z-index */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;