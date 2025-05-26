import React from 'react'
import { Link } from 'react-router-dom'


function Carousel() {
  return (
    <div className=' p-4 mx-10 flex flex-col gap-4 '>
        
        <div className='space-y-5'> {/* Wrap all sections with spacing */}
            {/* Food Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-200 to-orange-300 p-8 gap-6 rounded-lg shadow-lg'>
                {/* Image */}
                <div className='flex justify-center'>
                    <Link to='/services/catering'>
                    <img 
                        className='w-3/4 md:w-2/3 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105' 
                        src="\images\home\food2.png" 
                        alt="Gourmet Meal"
                    />
                    </Link>
                </div>
                {/* Text */}
                <div className='flex justify-center items-center text-center'>
                    <h3 className='text-3xl italic playfair-display font-medium text-gray-800 leading-relaxed'>
                        Indulge in gourmet meals prepared by world class chefs, tailored to your tastes
                    </h3>
                </div>
            </div>

            {/* Theatre Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center bg-gradient-to-b from-red-200 via-rose-300 to-rose-400 p-8 gap-6 rounded-lg shadow-lg'>
                                                                    {/* from-rose-300 via-rose-500 to-gray-500 */}
                {/* Text */}                                                            
                <div className='flex justify-center items-center text-center'>
                    <h3 className='text-3xl italic playfair-display font-medium text-white leading-relaxed'>
                        Catch the best entertainment at our state of the art theaters.
                    </h3>
                </div>
                {/* Image */}
                <div className='flex justify-center'>
                    <Link to='/services/facilities/movies'>

                    <img 
                        className='w-3/4 md:w-2/3 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105' 
                        src="\images\home\theatre.png" 
                        alt="Theatre"
                    />
                    </Link>
                </div>
            </div>

            {/* Fitness Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center bg-gradient-to-b  from-green-200 via-green-300 to-green-400 p-8 gap-6 rounded-lg shadow-lg'>
                                    {/* from-green-300 via-green-400 to-gray-500 */}
                {/* Image */}
                <div className='flex justify-center'>
                    <Link to='/services/facilities/fitness'>
                    <img 
                        className='w-3/4 md:w-2/3 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105' 
                        src="\images\home\gym.png" 
                        alt="Fitness Equipment"
                    />
                    </Link>
                </div>

                {/* Text */}
                <div className='flex justify-center items-center text-center'>
                    <h3 className='text-3xl italic playfair-display font-medium  leading-relaxed'>
                        Stay active and energized with top-tier fitness equipment and sports centers
                    </h3>
                </div>
            </div>


            {/* Party and Banquet Halls Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400  p-8 gap-6 rounded-lg shadow-lg'>
                                        {/* from-pink-200  to-pink-400 */}
                {/* Text */}
                <div className='flex justify-center items-center text-center'>
                    <h3 className='text-3xl italic playfair-display font-medium  leading-relaxed'>
                        Celebrate life's special moments in our lavish party and banquet halls
                    </h3>
                </div>

                {/* Image */}
                <div className='flex justify-center'>
                    <Link to='/services/facilities/partyhall'>
                    <img 
                        className='w-3/4 md:w-2/3 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105' 
                        src="images\home\partyhall.png" 
                        alt="Banquet Hall"
                    />
                    </Link>
                </div>
            </div>
        </div>


        <div className='flex flex-col justify-center items-center text-center'>
                    <h3 className='text-3xl italic playfair-display font-medium text-gray-800 leading-relaxed'>
                        Beauty Salons, Ocean views, Luxury shopping, <br /> and much more!
                    </h3>
                    <Link to='/services' className=' text-lg font-semibold text-amber-400 bg-slate-700 px-6 py-3 poppins rounded-full 
                        transition delay-75  hover:bg-slate-950 hover:text-yellow-400 hover:scale-105 '>
                        Explore Now
                    </Link>
        </div>


    </div>
  )
}

export default Carousel