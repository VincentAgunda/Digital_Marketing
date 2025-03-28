import React from 'react';

function LatestNews() {
  const newsData = [
    {
      title: 'Increase ROI Through Scientific SEM',
      date: 'Aug 2, 2023',
      image: 'seo.png',
      link: '#',
    },
    {
      title: 'Content Marketing Guide 2023',
      date: 'Jul 28, 2023',
      image: 'camera.jpg',
      link: '#',
    },
    {
      title: 'Effective Social Media Strategies',
      date: 'Jul 15, 2023',
      image: 'camera1.png',
      link: '#',
    },
  ];

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Latest News</h2>
        <p className="text-gray-600 text-xs mb-4 max-w-md mx-auto">
          Our latest insights and strategies
        </p>
        
        <div className="flex overflow-x-auto pb-3 gap-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
          {newsData.map((news, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[220px] sm:w-full bg-white rounded-md shadow-xs hover:shadow-sm transition-all duration-200"
            >
              <div className="relative aspect-[4/3]">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover rounded-t-md rounded-b-none"
                />
                <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] py-0.5 px-1.5 rounded-sm shadow-xs">
                  {news.date}
                </span>
              </div>
              <div className="p-3 text-left">
                <h3 className="text-xs font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between">
                  <a 
                    href={news.link} 
                    className="text-pink-500 text-[10px] font-medium hover:underline"
                  >
                    READ MORE +
                  </a>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3 text-gray-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;