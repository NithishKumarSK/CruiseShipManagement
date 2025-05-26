import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";


function VoyagerDashboard() {
  const { currentUser, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUser();
  
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">You are not logged in.</p>
      </div>
    );
  }

  if (authLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }
  console.log(userData);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-indigo-200 to-blue-100 flex flex-col items-center py-10">
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

      {/* Role-Specific Content */}
      
        <div className="w-full max-w-4xl mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">


            {/* Cart Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              
              <div className="my-2 flex gap-3 justify-center">
              <h2 className="text-2xl font-semibold text-indigo-600 ">Your Cart</h2>
                <Link to='/users/checkout' className="bg-indigo-600  text-white rounded-lg px-4 py-2" >
                    Checkout
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {userData.cart && userData.cart.length > 0 ? (
                  userData.cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center border rounded p-3 gap-4"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col justify-center text-left">
                        <p className="font-semibold text-indigo-600">{item.name}</p>
                        <p className="text-xs roboto text-blue-600"> <span className="text-slate-500">category : </span> {item.category} </p>
                        <p className="text-blue-600 text-sm"> <span className="text-slate-500">Quant :</span>  {item.quantity}</p>
                        <p className="text-green-500 font-semibold">₹{item.price}</p>
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

export default VoyagerDashboard;
