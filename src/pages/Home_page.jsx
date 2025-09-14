import React from "react";
import BlinkingCarousel from "./BlinkingCarousel";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "../components/Footer";

// Use it inside Home_page
export default function Home_page() {
  return (
    <div>
      <Navbar />
      <BlinkingCarousel />

      <div className="flex justify-between items-center container mx-auto">
        <div className=" w-[100%] px-5">
          <h4 className="text-lg pb-5 tracking-[0.2em]">Home</h4>
          <h1 className="pb-3 text-3xl font-bold font-serif">
            A Home Away From Home
          </h1>
          <p className="text-gray-700 text-justify px-6 border-l-1 border-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aliquam amet nulla reiciendis libero aspernatur odio ab. Nisi
            possimus in, minima expedita at iure consectetur dicta adipisci,
            nemo amet quaerat eum deleniti quibusdam dolores, dolore nihil?
            Necessitatibus sit nemo doloremque, perferendis fuga esse a est.
            Excepturi ipsum aliquam laboriosam sed.
          </p>
          <button className="mt-6 px-4 py-2 bg-[#1a70cc] hover:bg-blue-700 rounded-3xl shadow-lg courser-pointer text-white transition-color duration-200 ease-in-out flex justify-center items-center">
            Read More
          </button>
        </div>
        <div className="w[50%] p-5 ml-6">
          <img
            className="rounded-3xl"
            src="/hotel_image_1.webp"
            alt="hotel_image_1"
          />
        </div>
      </div>

      <div className="">
        <div className="text-center">
          <h4 className="text-lg pb-5 tracking-[0.2em]">EXPLORE</h4>
          <h1 className="pb-3 text-3xl font-bold font-serif">
            Choose Your Stay
          </h1>
          <p className="text-gray-700 text-center px-6 w-[400px] mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aliquam amet nulla reiciendis libero aspernatur odio ab.
          </p>
        </div>
        <Carousel />
      </div>

      <div className="flex justify-between items-center container mx-auto">
        <div className="w-[50%]">
          <h4 className="text-lg pb-5 tracking-[0.2em]">AMENITIES</h4>
          <h1 className="pb-3 text-3xl font-bold font-serif">
            Make Your Stay Memoreable
          </h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Airport Transfer",
              "Car Parking",
              "Free Tea/ Coffee",
              "Free WIFI",
              "Smart TV",
              "Weekly Housekeeping",
            ].map((facility, index) => (
              <li
                key={index}
                className="flex items-center bg-white shadow-sm rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 font-medium">{facility}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[50%] flex gap-8 p-8">
          <div className="">
            <img className="rounded-2xl" src="image_1.webp" alt="image_1" />
          </div>
          <div className="">
            <img className="rounded-2xl" src="image_2.webp" alt="image_2" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
