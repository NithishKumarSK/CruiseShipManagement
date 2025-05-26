import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className=" bg-gradient-to-b from-blue-900 to-gray-900 text-gray-300 py-5  w-full mt-auto ">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Left Section - Branding */}
            <div className="flex flex-col items-center md:items-start ">
                <h2 className="text-3xl text-white playfair-display italic">Celestia</h2>
                <p className="text-sm text-gray-400 mt-2">
                    Experience the ultimate in luxury and relaxation at sea.
                </p>
            </div>

            {/* Center Section - Navigation Links */}
            <div className="flex flex-col items-center sm:mr-5">
                <ul className="flex flex-wrap justify-center gap-6">
                    <li>
                        <Link to="/about" className="hover:text-white transition duration-300">About</Link>
                    </li>
                    <li>
                        <Link to="/services" className="hover:text-white transition duration-300">Services</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-white transition duration-300">Contact</Link>
                    </li>
                </ul>
            </div>

            {/* Right Section - Social Media */}
            <div className="flex flex-col items-center md:items-end space-y-2">
                <p className="text-sm">Follow Us:</p>
                <div className="flex gap-4">
                    <Link to="#" aria-label="Facebook" className="hover:text-white transition duration-300">
                        <i className="fab fa-facebook-f text-lg"></i>
                    </Link>
                    <Link to="#" aria-label="Instagram" className="hover:text-white transition duration-300">
                        <i className="fab fa-instagram text-lg"></i>
                    </Link>
                    <Link to="#" aria-label="Twitter" className="hover:text-white transition duration-300">
                        <i className="fab fa-twitter text-lg"></i>
                    </Link>
                </div>
            </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-8 text-center text-sm py-4">
            <p>&copy; {new Date().getFullYear()} Celestia. All Rights Reserved.</p>
        </div>
    </footer>

  

  )
}

export default Footer