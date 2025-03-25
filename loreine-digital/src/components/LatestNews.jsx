import React from 'react';

function LatestNews() {
  const newsData = [
    {
      title: 'How to Increase Your ROI Through Scientific SEM?',
      date: 'Aug 2, 2023',
      image: 'placeholder-news1.png',
      link: '#',
    },
    {
      title: 'How to Increase Your ROI Through Scientific SEM?',
      date: 'Aug 2, 2023',
      image: 'placeholder-news2.png',
      link: '#',
    },
    {
      title: 'How to Increase Your ROI Through Scientific SEM?',
      date: 'Aug 2, 2023',
      image: 'placeholder-news3.png',
      link: '#',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest News</h2>
        <p className="text-gray-600 mb-8">
          Quis ipsum gravida. Accumsan lacus vel facilisis. Dolor magna eget est lorem dolor sed.
          Nullam non nisi est sit amet.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src={news.image} alt={news.title} className="w-full h-auto block" />
                <div className="absolute top-4 left-4 bg-white text-gray-700 text-sm py-1 px-2 rounded-md shadow-sm">
                  {news.date}
                </div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{news.title}</h3>
                <a href={news.link} className="text-pink-500 font-bold hover:underline text-sm">
                  READ MORE +
                </a>
                {/* Share icon - you can add your icon here */}
                <div className="text-gray-500 text-sm mt-2 flex justify-end">
                  {/* Replace with your share icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 1 0-2-2.92l-2 1.29V5a1 1 0 0 0-2 0v2.28l-2-1.29A3 3 0 1 0 5 8c0 1.54.83 2.85 2 3.5v3a1 1 0 0 0 2 0v-3c1.17-.65 2-1.96 2-3.5s-.83-2.85-2-3.5V5a1 1 0 1 0-2 0v2.28l-2-1.29A3 3 0 1 0 5 8c0 1.54.83 2.85 2 3.5v3a1 1 0 0 0 2 0v-3c1.17-.65 2-1.96 2-3.5s-.83-2.85-2-2.92l2 1.29V15a1 1 0 0 0 2 0v-2.28l2-1.29A3 3 0 1 0 15 8z" />
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