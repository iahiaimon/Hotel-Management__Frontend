import React, { useState, useEffect } from "react";

const BlinkingCarousel = () => {
  const images = [
    "https://pura.uxper.co/bb/wp-content/uploads/sites/4/2024/02/gif_1.webp",
    "https://pura.uxper.co/bb/wp-content/uploads/sites/4/2024/01/rectangle_2647.webp",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);

      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsBlinking(false);
      }, 300); // blink duration
    }, 5000); // stay for 5s before switching

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden mb-16">
      {/* Animations */}
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .zooming {
          animation: zoomIn 5s ease-in-out forwards;
        }
        .blinking {
          animation: blink 0.3s linear;
        }
      `}</style>

      {/* Background images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 
            ${index === activeIndex ? "opacity-100" : "opacity-0"} 
            ${isBlinking && index === activeIndex ? "blinking" : "zooming"}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col gap-4 items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Cozy Like Your Home
        </h1>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
          deleniti!
        </h3>
        <button className="mt-6 px-4 py-2 bg-[#1a70cc] hover:bg-blue-600 rounded-3xl shadow-lg courser-pointer text-white transition-color duration-200 ease-in-out">
          Explore Room
        </button>
      </div>

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
    </div>
  );
};

export default BlinkingCarousel;
