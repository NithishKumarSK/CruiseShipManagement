import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-5xl font-bold poppins text-blue-600 text-center mb-8'>
        Services Available:
      </h1>
      
      <div className='my-4 flex md:flex-row md:gap-16 flex-wrap justify-center poppins'>
        <div className='flex flex-col items-center bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300'>
          <h1 className='text-2xl font-semibold my-1 px-4 text-center text-slate-700'>
            Catering:
          </h1>    
          <Link to="/services/catering">
            <img className='w-72 my-1 mb-3 hover:scale-105 rounded-md transition-transform duration-300' src="\images\home\food2.png" alt="Catering Services" />
          </Link>
          {/* <div className='flex text-lg flex-col gap-2 font-semibold text-rose-500  rounded-lg p-2'>
            <p className='hover:scale-105 transition-transform duration-75'> <Link to="/services/catering/snacks">  Snacks </Link> </p> 
            <p className='hover:scale-105 transition-transform duration-75'> <Link to="/services/catering/beverages">Beverages </Link> </p> 
            <p className='hover:scale-105 transition-transform duration-75'> <Link to="/services/catering/desserts">Desserts </Link> </p> 
            <p className='hover:scale-105 transition-transform duration-75'> <Link to="/services/catering/dining">Fine Dining </Link> </p> 
            <p className='hover:scale-105 transition-transform duration-75'> <Link to="/services/catering">Browse Menu </Link> </p> 
          </div> */}
        </div>

        <div className='flex flex-col items-center bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-75'>
          <h1 className='text-2xl font-semibold my-1 px-4 text-center text-slate-700'>
            Stationery:
          </h1>
          <Link to='/services/stationery'>
            <img className='w-72 my-1 rounded-md hover:scale-105 mb-3 transition-transform duration-75' src="\images\home\stationery.png" alt="Stationery Services" />
          </Link>    
          {/* <div className='flex text-lg flex-col gap-2 font-semibold text-blue-500  rounded-lg p-2'>
            <p className='hover:scale-105 transition-transform duration-75'> <Link to='/services/stationery/gifts'> Gifts </Link> </p>
            <p className='hover:scale-105 transition-transform duration-75'> <Link to='/services/stationery/stationery'> Daily Stationery </Link> </p>
            <p className='hover:scale-105 transition-transform duration-75'> <Link to='/services/stationery/books_art'> Books & Art Works </Link> </p>
            <p className='hover:scale-105 transition-transform duration-75'> <Link to='/services/stationery/personal'> Personal Stationery </Link> </p>
            <p className='hover:scale-105 transition-transform duration-75'> <Link to='/services/stationery'>Full Collection </Link> </p>
          </div> */}
        </div>

        <div className='flex flex-col items-center bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-75'>
          <h1 className='text-2xl font-semibold my-1 px-4 text-center text-slate-700'>
            Facilities:
          </h1>
          <Link to='/services/facilities'>
            <img className='w-72 my-1 hover:scale-105 rounded-md mb-3 transition-transform duration-75' src="\images\home\partyhall.png" alt="Facilities Services" />
          </Link>   
          {/* <div className='flex text-lg flex-col gap-2 font-semibold text-green-500  rounded-lg p-2'>
            <p className='hover:scale-105 transition-transform duration-100'> <Link to='/services/facilities/movies'> Movie Tickets </Link> </p>
            <p className='hover:scale-105 transition-transform duration-100'> <Link to='/services/facilities/salon'> Beauty Salon </Link> </p>
            <p className='hover:scale-105 transition-transform duration-100'> <Link to='/services/facilities/fitness'> Fitness Center </Link> </p>
            <p className='hover:scale-105 transition-transform duration-100'> <Link to='/services/facilities/partyhall'> Party Hall </Link> </p>
            <p className='hover:scale-105 transition-transform duration-100'> <Link to='/services/facilities'> More Facilities </Link> </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Services;
