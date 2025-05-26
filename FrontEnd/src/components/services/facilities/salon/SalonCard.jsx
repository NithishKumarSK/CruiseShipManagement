import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SalonCard({ itemId, name, desc, price, duration, imageUrl }) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const navigate = useNavigate();

  // We need today's date and the maximum date (7 days from today)
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  // We can write a seperate function to format the dates 
  // to YYYY-MM-DD for the date input

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBookNow = () => {
    if (!currentUser || currentUser.role === 'Guest') {
      setMessage('You must be a voyager to use services. Redirecting...');
      setTimeout(() => navigate('/users/dashboard'), 2000);
    } else {
      setShowPopup(true); // Show the booking popup
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      setMessage('Please fill in all the details.');
      return;
    }

    setMessage('Booking Selected. Redirecting to checkout...');

    // Pass the booking details to the checkout page
    navigate('/services/facilities/salon/salonCheckout', {
      state: {
        itemId,
        name,
        price,
        duration,
        imageUrl,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      },
    });
  };

  return (
    <div className="flex flex-col p-5 bg-gray-200 rounded-md">
      {/* Message */}
      <p className="text-blue-500 text-sm my-1">{message}</p>

      {/* Image */}
      <img src={imageUrl} className="w-32 rounded self-center" alt={name} />

      {/* Salon service name */}
      <h1 className="p-1 text-xl text-indigo-600">{name}</h1>

      {/* Salon service description */}
      <p className="text-sm self-center text-gray-600 text-center mb-2 text-wrap w-3/4">
        {desc.length > 100 ? `${desc.substring(0, 100)}...` : desc}
      </p>

      {/* Salon service duration */}
      <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration} mins</p>

      {/* Price */}
      <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm"
      >
        Book Now
      </button>

      {/* Popup for Date and Time Slot Selection */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Booking Details</h2>

            {/* Date Selection */}
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={formatDate(today)} // Restrict the minimum date to today
              max={formatDate(maxDate)} // Restrict the maximum date to 7 days from today
            />

            {/* Time Slot Selection */}
            <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-600">
              Select Time Slot
            </label>
            <select
              id="timeSlot"
              className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
            >
              <option value="">--Select Time Slot--</option>
              <option value="Morning (9-11 AM)">Morning (9-11 AM)</option>
              <option value="Afternoon (12-2 PM)">Afternoon (12-2 PM)</option>
              <option value="Evening (3-5 PM)">Evening (3-5 PM)</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalonCard;
