import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import { collection, getDocs, doc, deleteDoc  } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import { useUser } from '../../../contexts/UserContext';
import { Link } from 'react-router-dom';

function HeadCookDashboard() {
  const { currentUser, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUser();
  const [ordersData, setOrdersData ] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(false)

  useEffect( () => {
    const fetchOrders = async () => {
      const colRef = collection(db, "CateringOrders")
      getDocs(colRef)
      .then( (querySnap) => {
          const data = querySnap.docs.map( (doc) => ({
              id : doc.id,
              ...doc.data()
          }))
          setOrdersData(data)
      })
      .catch((err) => console.error('failed to fetch order data : ',err))
      .finally( () =>
        setOrdersLoading(false)
      )
    }
    fetchOrders()

  },[refreshOrders, currentUser.uid])

  const fulFillOrder = async (e) => {

    const orderID = e.target.id

      const colRef = collection(db,"CateringOrders")
      const docRef = doc(colRef,orderID)
      deleteDoc(docRef)
      .then(() => {
        setSuccessMsg("Order Successfully fulfilled"); // Set success message
        setShowSuccess(true);   // Show notification
        setTimeout(() => setShowSuccess(false), 3000); // Auto-hide after 3 seconds
        setRefreshOrders((prev) => !prev); // Trigger a refetch of guests
      })
      .catch((err) => console.error(err));
  };


  const toggleListOrdersPopup = () => {
    const popup = document.querySelector(".orders-popup");
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

  if (authLoading || userLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }


  if( currentUser.role === "HeadCook"){
    
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-indigo-200 to-blue-100 flex flex-col items-center py-10">
      {/* User Info Section */}

      {/* Success Message Notification */}
      {showSuccess && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {successMsg}
          </div>
      )}

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

      {/* HeadCook's popup showing orders  */}
      <div className="relative">
          {/* Popup */}
          <div className="orders-popup hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-lg shadow-lg md:w-2/5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              Awaiting orders
            </h2>
            <div className="space-y-4">
              {/* Listing all the order requests */}
              {ordersData.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center p-3 rounded bg-gray-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Order ID : </span>  {order.id}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> User ID : </span>  {order.uid}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Item name : </span>  {order.name}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Item price : </span> {order.price}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    
                    <button
                      id={order.id}
                      onClick={fulFillOrder}
                      className="bg-rose-500 text-white px-4 py-1 rounded-md hover:bg-rose-600"
                    >
                      Fulfill Order
                    </button>
                    
                    
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={toggleListOrdersPopup}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>


      {/* HeadCook's duty related Buttons  */}
      <div className="flex flex-col md:flex-row my-5 gap-5 poppins">
          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500">Orders awaiting : {ordersData.length}</h1>
            <button
              type="button"
              onClick={toggleListOrdersPopup}
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              View Details 
            </button>
          </div>

        </div>

      {/* Heacooks own user Content */}
      
      <div className="w-full max-w-4xl mt-10">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center capitalize">
            Your user role content
          </h1>
          
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
}

export default HeadCookDashboard