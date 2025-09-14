import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";

export default function Carousel() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8000/rooms");
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Featured Rooms & Suites
      </h3>

      <Swiper
        watchSlidesProgress={true}
        slidesPerView={1}
        spaceBetween={20}
        // loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.id}>
            <Link to={`/details/${room.id}`}>
              <div className="w-full mx-auto relative cursor-pointer group">
                {/* Image Card */}
                <div className="overflow-hidden w-full h-60 md:h-80 lg:h-96 rounded-xl my-10">
                  <img
                    className="w-full h-full object-cover rounded-xl hover:scale-110 duration-300 ease-in-out transition-transform"
                    src={`http://127.0.0.1:8000${room.image}`}
                    alt={room.title}
                  />
                </div>

                {/* Details overlay (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 rounded-b-xl p-4">
                  {/* Price and title */}
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-blue-600">
                      {room.price} TK Per Night!
                    </h4>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {room.name}
                    </h1>
                  </div>

                  {/* Horizontal specs */}
                  <ul className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                      {room.area}m²
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      {room.beds} beds
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {room.baths} baths
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      {room.guests} guests
                    </li>
                  </ul>

                  {/* View Details Button */}
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
