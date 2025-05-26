import React from 'react';
import { Link } from 'react-router-dom';

function Facilities() {
  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 min-h-screen">
      {/* Header */}
      <h1 className="text-5xl font-bold text-center text-indigo-700 mb-6 poppins">
        Welcome to the <span className="text-indigo-500">Facilities</span> of Celestia
      </h1>
      <h2 className="text-lg text-center poppins text-gray-600 mb-8">
        Choose from our exclusive services to enhance your voyage experience.
      </h2>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Movies */}
        <Link
          to="/services/facilities/movies"
          className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg"
        >
          <img
            className="rounded-lg mb-4 w-40 h-40 object-cover"
            src="\images\home\theatre.png"
            alt="Movies"
          />
          <h2 className="text-xl font-semibold text-indigo-700">Movies</h2>
        </Link>

        {/* Fitness Center */}
        <Link
          to="/services/facilities/fitness"
          className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg"
        >
          <img
            className="rounded-lg mb-4 w-40 h-40 object-cover"
            src="\images\home\gym.png"
            alt="Fitness Center"
          />
          <h2 className="text-xl font-semibold  text-indigo-700">Fitness Center</h2>
        </Link>

        {/* Beauty Salon */}
        <Link
          to="/services/facilities/salon"
          className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg"
        >
          <img
            className="rounded-lg mb-4 w-40 h-40 object-cover"
            src="\images\home\salon.jpg"
            alt="Beauty Salon"
          />
          <h2 className="text-xl font-semibold text-indigo-700">Beauty Salon</h2>
        </Link>

        {/* Party Hall */}
        <Link
          to="/services/facilities/partyhall"
          className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg"
        >
          <img
            className="rounded-lg mb-4 w-40 h-40 object-cover"
            src="\images\home\partyhall.png"
            alt="Party Hall"
          />
          <h2 className="text-xl font-semibold text-indigo-700">Party Hall</h2>
        </Link>
      </div>
    </div>
  );
}

export default Facilities;
