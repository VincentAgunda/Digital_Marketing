import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

function LatestNews() {
  const newsData = [
    { title: 'Increase ROI Through Scientific SEM', date: 'Aug 2, 2023', image: 'camera1.png', link: '#' },
    { title: 'Content Marketing Guide 2023', date: 'Jul 28, 2023', image: 'background3.webp', link: '#' },
    { title: 'Effective Social Media Strategies', date: 'Jul 15, 2023', image: 'camera.jpg', link: '#' },
  ];

  const containerRef = useRef(null);
  const controls = useAnimation();
  const itemWidth = 220;
  const gapWidth = 16;
  const totalItemWidth = itemWidth + gapWidth;

  useEffect(() => {
    let isMounted = true;
    let animationTimeout;

    const startAnimation = async () => {
      try {
        // Wait for component to be fully mounted
        await new Promise(resolve => {
          animationTimeout = setTimeout(resolve, 50);
        });

        if (!isMounted) return;

        // Initial fade in
        await controls.start({ 
          opacity: 1, 
          transition: { duration: 0.3 } 
        });

        if (!isMounted) return;

        // Continuous animation loop
        const animate = async () => {
          if (!isMounted) return;
          
          await controls.start({
            x: `-${totalItemWidth * newsData.length}px`,
            transition: {
              duration: 10,
              ease: 'linear',
            },
          });

          if (isMounted) {
            // Reset position instantly (no animation)
            controls.set({ x: 0 });
            // Start next animation cycle on next frame
            requestAnimationFrame(() => {
              if (isMounted) animate();
            });
          }
        };

        animate();
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    startAnimation();

    return () => {
      isMounted = false;
      clearTimeout(animationTimeout);
      controls.stop();
    };
  }, [controls, newsData.length, totalItemWidth]);

  return (
    <section className="py-10 bg-white flex flex-col items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
        <p className="text-gray-600 text-sm">Our latest insights and strategies</p>
      </div>
      <div className="relative w-full max-w-5xl h-[280px] overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex absolute top-0 left-0"
          style={{ 
            gap: `${gapWidth}px`, 
            width: `${totalItemWidth * newsData.length * 2}px`, 
            opacity: 0 
          }}
          animate={controls}
        >
          {[...newsData, ...newsData].map((news, index) => (
            <div
              key={`${news.title}-${index}`}
              className="w-[220px] bg-gray-100 rounded-xl shadow-md overflow-hidden flex-shrink-0"
            >
              <div className="relative aspect-video rounded-t-xl overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md">
                  {news.date}
                </span>
              </div>
              <div className="p-3 text-left">
                <h3 className="text-xs font-semibold text-gray-800 mb-2 leading-tight">
                  {news.title}
                </h3>
                <a 
                  href={news.link} 
                  className="text-blue-500 text-xs font-medium hover:underline"
                >
                  READ MORE +
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LatestNews;