import React, { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/UserContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { addDoc, collection, doc, getDoc , setDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";

function MovieCheckout() {
  const { userData, loading: userLoading } = useUser();
  const { currentUser, loading: authLoading } = useAuth();
  const nav = useNavigate()

  const location = useLocation();

  // Query parameters
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("movieId");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const imageUrl = searchParams.get("imageUrl");
  const screenNumber = searchParams.get("screenNumber");
  const selectedSeats = searchParams.get("selectedSeats")?.split(","); 
  const selectedDate = searchParams.get("selectedDate");
  const selectedSlot = searchParams.get("selectedSlot");

  const [successMsg, setSuccessMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  const confirmBooking = async () => {
    try {

      // I am confirming the movie Seatings here.

      let colRef = collection(db, "movieSeatings")
      const docName = selectedDate.concat("_",selectedSlot)
      console.log("Doc name : ",docName);
      
      const seatingsDoc = await getDoc(doc(colRef,docName));
      const seatingsData = seatingsDoc.data() // Gives entire movie seatings Data

      const fieldName = "screen".concat(screenNumber)
      const screenSeatingsData = seatingsData[fieldName]; // Gives data of specific screen

      if (!seatingsData) {
        console.log("Movie seating data not found");
        return;
      }
      // console.log(screenSeatingsData);

      // let occupiedAlready = false;

      selectedSeats.forEach((seatNum) => {
          if(screenSeatingsData[seatNum] !== ""){
            // occupiedAlready = true

            setBookingStatus("One or more seats are already booked. Please select different seats.");
            return;
          }else{
            screenSeatingsData[seatNum] = currentUser.uid
            console.log(screenSeatingsData);

            // Update the particular screen seating with our users data.
            updateDoc(doc(colRef,docName),{
              [fieldName]:screenSeatingsData
            }) 
            .then(() => {

              // Now update the user Data with booking
              colRef = collection(db,"Users")
              const docRef = doc(colRef,currentUser.uid)

              // First get the existing booking Data in Users collection
              getDoc(docRef)
              .then( (userDoc) => {
                const movieBookings =  userDoc.data().movieBookings || []

                // Add the current Booking to existing Array
                movieBookings.push({
                  itemId : movieId,
                  name,
                  price,
                  imageUrl,
                  selectedDate,
                  selectedSlot,
                  screenNumber,
                  selectedSeats
                })

                // Update that user's Bookings Accordingly
                updateDoc(docRef,{
                  movieBookings
                })
                .then( () =>{

                    // Now lets add the booking to global movieBookings data.
                    colRef = collection(db,"MovieOrders")

                    addDoc(colRef, {
                        uid : currentUser.uid,
                        itemId : movieId,
                        name,
                        price,
                        imageUrl,
                        selectedDate,
                        selectedSlot,
                        screenNumber,
                        selectedSeats
                    })
                    .then( () =>{
                      setSuccessMsg("Success")
                      setShowMsg(true)
                      setTimeout( () => {
                        nav("/users/dashboard")
                      },2000)
                      })
                    .catch( (err) => 
                      console.log(err)
                    )

                })
                .catch( (err) => 
                  console.log(err)
                  )
          })
          .catch( (err) => 
            console.log(err)
          )

          })
          .catch ((error) => {
            console.error("Error confirming booking:", error);
            setBookingStatus("Failed to confirm booking. Please try again.")
          })
          
        }
      }) // This is where ForEach Loop ends

    } catch (error) {
      console.error("Error confirming booking:", error);
      setBookingStatus("Failed to confirm booking. Please try again.");
    }
  };

  const handleCancel = () => {
    nav("/services/facilities/movies")
  }

  useEffect(() => {
    console.log("Booking Data:", {
      movieId,
      name,
      price,
      imageUrl,
      screenNumber,
      selectedSeats,
      selectedDate,
      selectedSlot,
    });
  }, [movieId, name,price,imageUrl, screenNumber, selectedSeats, selectedDate, selectedSlot]);

  if (authLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (currentUser && currentUser.role !== "Guest" ) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-200 via-orange-200 to-orange-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center capitalize">
          Facility Checkout
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-3 w-11/12 max-w-4xl">
          
          <img src={imageUrl} alt={name} className="w-32 mx-auto rounded mb-4" />
          <p className="text-lg font-medium text-gray-700">
            <strong>Movie Name:</strong> {name}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Movie ID:</strong> {movieId}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Price:</strong> {price}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Screen Number:</strong> {screenNumber}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Seats:</strong> {selectedSeats?.join(", ")}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Date:</strong> {selectedDate}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Showtime:</strong> {selectedSlot}
          </p>
        </div>

        <p className={`${showMsg ? "block" : "hidden"} mb-3 text-lg p-2 bg-green-600 text-white rounded-lg`}>
          {successMsg}
        </p>

        {bookingStatus && (
          <p className="text-lg text-red-500 mb-3">{bookingStatus}</p>
        )}

        <div className='flex gap-3'> 
          <button
            onClick={handleCancel}
            className="mt-6 px-6 py-2 bg-gray-100 shadow-md text-slate-800 rounded-lg hover:opacity-90 "
          >
            Cancel
          </button>


          <button
            onClick={confirmBooking}
            className="mt-6 px-6 py-2 bg-green-500 shadow-md text-white rounded-lg hover:opacity-90 transition"
          >
            Confirm Booking
          </button>
        </div>
    </div>
      
    );
  }

  return null;
}

export default MovieCheckout;
