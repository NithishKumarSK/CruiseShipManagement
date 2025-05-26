import React, { useState } from "react";
import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ItemCard({ name, itemId, desc, price, imageUrl }) {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const nav = useNavigate()

  const handleAddCart = (e) => {
    const cartOrOrder = e.target.getAttribute("id");

    if (!currentUser) {
      setMessage("You are not logged in. Redirecting...");
      setTimeout(() => nav("/users/signin"), 2000);
    }
    else if(currentUser.role === 'Guest'){
      setMessage("You must be voyager to use services. Redirecting...");
      setTimeout(() => nav("/users/dashboard"), 2000);
    }
    else{
      let colRef = collection(db, "Users");
      const docRef = doc(colRef, currentUser.uid);
      let newItem;
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const existingStationeryCart = userData.stationeryCart
            console.log('existing cart : ',existingStationeryCart);
            // const cartOrOrderArray = "cateringCart"
            // const currentArray = userData[cartOrOrderArray] || [];

            let itemExistAlready = false
            let itemIndex;

            existingStationeryCart.forEach( (item,index) => {
              if(item.itemId === itemId){
                itemExistAlready = true
                itemIndex = index
                console.log("item :", item);
              }
            })

            if(itemExistAlready){
              existingStationeryCart[itemIndex].quantity +=1
            }
            else{
              newItem = { itemId, name, imageUrl, price, quantity:1 };
              existingStationeryCart.push(newItem)
            }
            console.log('existing cart : ',existingStationeryCart);

            updateDoc(docRef,{
              stationeryCart : existingStationeryCart
            })
            .then(()=>{
              
              const successMessage = "Successfully added to cart."
              setMessage(successMessage);

              if(cartOrOrder === 'order'){
                nav('/users/checkout')
              }
            })
            .catch((err) => {console.error(err);})

            // Prepare the new item data
            
            // // Add the new item to the array
            // currentArray.push(newItem);

            // // Update the user's cart or orders in Firestore
            // updateDoc(docRef, {
            //   [cartOrOrderArray]: currentArray,
            // })
            //   .then(() => {
            //     const successMessage =
            //       cartOrOrder === "cart"
            //         ? "Successfully added to cart."
            //         : "Successfully added to orders.";
            //     setMessage(successMessage);
            //     if(cartOrOrder !== 'cart'){
            //         colRef = collection(db, "CateringOrders")
            //         addDoc(colRef, { 
            //             itemId, name, imageUrl, price, uid : currentUser.uid
            //         }
                        
            //         )
            //         .then( () => {
            //             const successMessage =
            //                 cartOrOrder === "cart"
            //                     ? "Successfully added to cart."
            //                     : "Successfully added to orders.";
            //                 setMessage(successMessage);
            //         })
            //         .catch( (err) => {
            //             console.error("Error while updating Firestore:", err);
            //                 setMessage("Failed to add item. Please try again.");
            //         })

              //  }
              // })
              // .catch((err) => {
              //   console.error("Error while updating Firestore:", err);
              //   setMessage("Failed to add item. Please try again.");
              // });
          } else {
            setMessage("User document not found.");
          }
        })
        .catch((err) => {
          console.error("Error while fetching user document:", err);
          setMessage("Failed to add item. Please try again.");
        });

        
    }
  };


  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-3 space-y-4 transform transition hover:scale-105 hover:shadow-lg">
      {/* Item Name */}
      <p className="text-blue-500 text-sm">{message}</p>
      <h1 className="text-lg font-semibold roboto text-gray-800 text-center">{name}</h1>

      {/* Item Image */}
      <img
        className="w-40 h-40 object-cover rounded-lg"
        src={imageUrl}
        alt="Item image"
      />

      {/* Item Description */}
      <p className="text-sm text-gray-600 text-center">{desc}</p>

      {/* Price */}
      <p className="text-lg font-medium text-green-500">₹{price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddCart}
        id="cart"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
      >
        Add to Cart
      </button>

      {/* Add to Orders Button */}
      <button
        onClick={handleAddCart}
        id="order"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm"
      >
        Place Order
      </button>
    </div>
  );
}

export default ItemCard;
