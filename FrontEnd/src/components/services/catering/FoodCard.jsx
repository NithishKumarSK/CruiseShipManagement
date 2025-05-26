import React, { useState } from "react";
import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function FoodCard({ name, itemId, desc, price, imageUrl }) {
  console.log(name,itemId,price,desc,imageUrl);
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
            const existingCateringCart = userData.cateringCart
            console.log('existing cart : ',existingCateringCart);
            // const cartOrOrderArray = "cateringCart"
            // const currentArray = userData[cartOrOrderArray] || [];
            let itemExistAlready = false
            let itemIndex;

            existingCateringCart.forEach( (item,index) => {
              if(item.itemId === itemId){
                itemExistAlready = true
                itemIndex = index
                console.log("item :", item);
              }
            })

            if(itemExistAlready){
              existingCateringCart[itemIndex].quantity +=1
            }
            else{
              newItem = { itemId, name, imageUrl, price, quantity:1 };
              existingCateringCart.push(newItem)
            }
            console.log('existing cart : ',existingCateringCart);

            updateDoc(docRef,{
              cateringCart : existingCateringCart
            })
            .then(()=>{
              
              const successMessage = "Successfully added to cart."
              setMessage(successMessage);

              if(cartOrOrder === 'order'){
                nav('/users/checkout')
              }
            })
            .catch((err) => {console.error(err);})
            
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
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 space-y-4 transform transition hover:scale-105 hover:shadow-lg">
      {/* Item Name */}
      <p className="text-blue-500 text-sm my-1">{message}</p>
      <h1 className="text-lg font-semibold roboto text-gray-800 text-center">{name}</h1>

      {/* Item Image */}
      <img
        className="w-36 h-36 object-cover rounded-lg"
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
        Buy Now
      </button>
    </div>
  );
}

export default FoodCard;
