import React from 'react'
import { Link } from 'react-router-dom';

function NavbarDropDown(  ) {
  
    return (
    <div className='bg-gray-100 shadow-md text-sm sm:text-lg shadow-slate-400 flex flex-col gap-0.5 p-2 sm:gap-3 sm:p-5 roboto rounded-md'>
        <div className='bg-sky-500 rounded-md roboto  transition-transform duration-100 hover:scale-105'>
            <Link to="/services/catering">
                <h1 className='  my-1 text-slate-100'>
                    Catering
                </h1>  
            </Link>  
        </div>

        <div className='bg-sky-500 rounded-md transition-transform duration-100 hover:scale-105'>
            <Link to="/services/stationery">
                <h1 className='  my-1 text-slate-100'>
                    
                    Stationery
                </h1>
            </Link>
            
        </div>
        <div className='  '>
            <Link to="/services/facilities">
                <h1 className=' text-white bg-sky-500 mb-1 p-1 rounded-md transition-transform duration-100 hover:scale-105'>
                    Facilities
                </h1>
            </Link>
            
            <div className='flex flex-col mt-2 gap-0.5 sm:gap-2 text-slate-100 *:bg-blue-500 *:p-1 *:rounded-md  *:min-w-40'>

              <Link to='/services/facilities/movies'><p className='transition-transform duration-100 hover:scale-105 '>  Movie Tickets </p></Link>
              <Link to='/services/facilities/salon'><p className='transition-transform duration-100 hover:scale-105 '>  Beauty Salon </p></Link>
              <Link to='/services/facilities/fitness'><p className='transition-transform duration-100 hover:scale-105 '>  Fitness Center </p></Link>
              <Link to='/services/facilities/partyhall'><p className='transition-transform duration-100 hover:scale-105 '>  Party Hall </p></Link>
            </div>
        </div>
    </div>
  )
}

export default NavbarDropDown;