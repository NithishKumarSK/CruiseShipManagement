import React, { createContext, useContext, useEffect, useState } from "react";
import { getDoc, doc, collection } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Assuming AuthContext exists
import { db } from "../firebase"; // Ensure you import your Firebase config

const UserContext = createContext();

// Custom hook to access UserContext
export function useUser() {
  return useContext(UserContext);
}

// UserContextProvider Component
export function UserContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    cart: null,
    orders: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const colRef = collection(db, "Users");
          const docRef = doc(colRef, currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            // Combine all cart items into a single array
            const totalCart =[ 
                ...(data.cateringCart.map((item) => {
                  return {...item,category : "Catering"}
                })),
                ...(data.stationeryCart.map((item) => {
                  return {...item,category : "Stationery"}
                }))
              ]
        

            // Combine all orders/bookings into a single array
            const totalOrders = [
              ...(data.cateringOrders.map((item) => {
                return {...item,category : "Catering"}
              })),
              ...(data.stationeryOrders.map((item) => {
                return {...item,category : "Stationery"}
              })),
              ...(data.movieBookings.map((item) => {
                return {...item,category : "Movies"}
              })),
              ...(data.salonBookings.map((item) => {
                return {...item,category : "Salon"}
              })),
              ...(data.partyhallBookings.map((item) => {
                return {...item,category : "Partyhall"}
              })),
              ...(data.fitnessBookings.map((item) => {
                return {...item,category : "Fitness"}
              }))
            ];

            setUserData({
              cart: totalCart,
              orders: totalOrders,
            });
          } else {
            console.log("No cart and orders data exists for the user");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}
