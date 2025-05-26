import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const { currentUser, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUser();
  const [guestData, setGuestData] = useState([]);
  const [guestLoading, setGuestLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // State to control notification visibility
  const [refreshGuests, setRefreshGuests] = useState(false); // State to trigger refetching of guests

  // const backEndUrl = "http://localhost:5000";
  const backEndUrl = "https://celestia-cruise-ship-management-service.onrender.com";

  // Fetch guest data whenever refreshGuests changes
  useEffect(() => {
    const fetchGuests = async () => {
      setGuestLoading(true); // Show loading indicator while fetching
      try {
        const res = await fetch(`${backEndUrl}/getAllGuests`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: currentUser.uid }),
        });
        const data = await res.json();
        if (data) {
          setGuestData(data.guestDetails);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setGuestLoading(false); // Hide loading indicator after fetching
      }
    };
    fetchGuests();
  }, [refreshGuests, currentUser.uid]); // Refetch when refreshGuests changes or user ID changes

  const approveUser = async (e) => {
    const adminapprovedrole = e.target.getAttribute("adminapprovedrole");
    const adminapprovedguestid = e.target.getAttribute("adminapprovedguestid");

    fetch(`${backEndUrl}/approveUser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: adminapprovedrole, uid: adminapprovedguestid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccessMsg(data.msg); // Set success message
        setShowSuccess(true);   // Show notification
        setTimeout(() => setShowSuccess(false), 3000); // Auto-hide after 3 seconds
        setRefreshGuests((prev) => !prev); // Trigger a refetch of guests
      })
      .catch((err) => console.error(err));
  };

  const toggleVoyagerPopup = () => {
    const popup = document.querySelector(".voyager-popup");
    popup.classList.toggle("hidden");
    popup.classList.toggle("block");
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">You are not logged in.</p>
      </div>
    );
  }

  if (authLoading || userLoading || guestLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (currentUser.role === "Admin") {
    console.log("userData",userData);
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-300 via-indigo-200 to-blue-100 flex flex-col items-center py-10">
        {/* Success Message Notification */}
        {showSuccess && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {successMsg}
          </div>
        )}

        {/* User Info Section */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center capitalize">
            {currentUser.role} Dashboard
          </h1>
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-2">
              Welcome, <span className="font-semibold text-indigo-600">{currentUser.email}</span>!
            </p>
            <p className="text-lg text-gray-700">
              Your role is <span className="font-semibold text-indigo-600">{currentUser.role}</span>.
            </p>
          </div>
        </div>

        {/* Main Admin UI Content */}
        <div className="relative">
          {/* Popup */}
          <div className="voyager-popup hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-lg shadow-lg md:w-2/5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              Approve Guests
            </h2>
            <div className="space-y-4">
              {/* Listing all the guest requests */}
              {guestData.map((guest) => (
                <div
                  key={guest.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center p-3 rounded bg-gray-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Guest uid: <br /> {guest.id}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      Guest email: <br /> {guest.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      adminapprovedrole="Voyager"
                      adminapprovedguestid={guest.id}
                      onClick={approveUser}
                      className="bg-rose-500 text-white px-5 py-1 rounded-md hover:bg-rose-600"
                    >
                      Add As Voyager
                    </button>
                    <button
                      adminapprovedrole="Manager"
                      adminapprovedguestid={guest.id}
                      onClick={approveUser}
                      className="bg-rose-500 text-white px-4 py-1 rounded-md hover:bg-rose-600"
                    >
                      Add As Manager
                    </button>
                    <button
                      adminapprovedrole="HeadCook"
                      adminapprovedguestid={guest.id}
                      onClick={approveUser}
                      className="bg-rose-500 text-white px-4 py-1 rounded-md hover:bg-rose-600"
                    >
                      Add As HeadCook
                    </button>
                    <button
                      adminapprovedrole="Supervisor"
                      adminapprovedguestid={guest.id}
                      onClick={approveUser}
                      className="bg-rose-500 text-white px-4 py-1 rounded-md hover:bg-rose-600"
                    >
                      Add As Supervisor
                    </button>
                    <button
                      adminapprovedrole="Admin"
                      adminapprovedguestid={guest.id}
                      onClick={approveUser}
                      className="bg-rose-500 text-white px-4 py-1 rounded-md hover:bg-rose-600"
                    >
                      Add As Admin
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={toggleVoyagerPopup}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
  
  


        {/* Dashboard Actions */}
        <div className="flex flex-col md:flex-row my-5 gap-5 poppins">
          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500">Guests awaiting approval: {guestData.length}</h1>
            <button
              type="button"
              onClick={toggleVoyagerPopup}
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              View Details 
            </button>
          </div>
          {/* <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500">Manage people on Celestia</h1>
            <button
              type="button"
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              Manage People
            </button>
          </div> */}

          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500">Manage items and services</h1>
            <Link
              to="/users/adminAddItems"
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              Manage Items & Services
            </Link>
          </div>
        </div>


    {/* Here Shows the Admin's own userData.
      This is usefull if he wants to checkout his own orders for himself. */}
        
      
        <div className="w-full max-w-4xl mt-10">

          <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center capitalize">
            Your user role content
          </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Cart Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Cart</h2>
                <div className="flex flex-col gap-4">
                  {userData.cart && userData.cart.length > 0 ? (
                    userData.cart.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center border rounded p-3 gap-4"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-gray-600">₹{item.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                  )}
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Orders</h2>
                <div className="flex flex-col gap-4">
                  {userData.orders && userData.orders.length > 0 ? (
                    userData.orders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center border rounded p-3 gap-4"
                      >
                        <img
                          src={order.imageUrl}
                          alt={order.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col justify-center text-left">
                          <p className="font-semibold text-indigo-600">{order.name}</p>
                          {
                            (order.category === "Catering" || order.category === "Stationery") 
                            && <p className="text-xs roboto text-slate-600">
                                Quant : {order.quantity}
                            </p>
                          }
                          {
                            (order.category === "Movies") 
                            && <div> 
                              <p className="text-xs roboto text-slate-600">
                                Seats : {order.selectedSeats.length}
                              </p>
                              <p className="text-xs roboto text-slate-600">
                                Screen : {order.screenNumber}
                              </p>
                            </div>
                          }
                          <p className="text-xs roboto font-thin text-blue-600"> <span className="text-slate-500">category : </span> {order.category} </p>
                          <p className="text-green-500 font-semibold">₹{order.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">You have no orders yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

      </div>
    );
  }

  return null;
}

export default AdminDashboard;
