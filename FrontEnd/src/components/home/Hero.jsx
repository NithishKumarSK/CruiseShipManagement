import React from 'react'

function Hero() {
  return (
    <div className=' px-10 py  '>
        {/* <h1 className='text-5xl playfair-display my-3' >
            Celestia
        </h1> */}
        
        <h2 className=' text-4xl playfair-display font-medium  italic pb-3'>
         Sail into Serenity with <span className='text-7xl text font-semibold text-blue-800'>Celestia </span>...
        </h2>

        <img className=' w-10/12 mx-auto rounded-md ' src="\images\home\cruise6.png" alt="" />
        

        <h3 className='ml-10 text-3xl fira-mono  my-3  p-10 rounded-md'>
          <q> <span className='text-4xl text font-medium '> Celestia </span> is more than just a cruise. <br /> it’s an unforgettable voyage to soothe your <span className='text-4xl text font-medium'>Soul. </span> </q>
        </h3>
  </div>
  )
}

export default Hero