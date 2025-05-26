import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";


function AdminManageItems() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  const categories = ["Salon", "Fitness", "Partyhall", "Catering", "Stationery", "Movies"];

  // Fetch items of the selected category
  const fetchItems = async (category) => {
    setLoading(true);
    try {
      const colRef = collection(db, category);
      const snapshot = await getDocs(query(colRef));
      const itemsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setItems([]);
    if (category) fetchItems(category);
  };

  // Handle delete
  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const itemDoc = doc(db, selectedCategory, itemId);
        await deleteDoc(itemDoc);
        setItems(items.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  // Handle update popup
  const handleUpdatePopup = (item) => {
    setCurrentItem(item);
    setUpdatedFields(item);
    setShowUpdatePopup(true);
  };

  // Handle field update in the popup
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({ ...updatedFields, [name]: value });
  };

  // Handle update submission
  const handleUpdateSubmit = async () => {
    try {
      const itemDoc = doc(db, selectedCategory, currentItem.id);
      await updateDoc(itemDoc, updatedFields);
      setItems(items.map((item) => (item.id === currentItem.id ? updatedFields : item)));
      setShowUpdatePopup(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 text-slate-100 flex justify-center">
      <div className="w-4/5  p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-300">Manage Category Items</h1>

        <div className="mb-6 md:w-1/3 self-center mx-auto">
          <label htmlFor="category" className="block text-lg my-1 font-medium text-gray-300 mb-1">
            Select Category
          </label>
          <select
            id="category"
            className="w-full rounded-md text-black poppins border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-200">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-md text-gray-900">
                <h3 className="text-lg font-bold mb-2 text-blue-600">{item.name}</h3>
                <p className="text-sm text-gray-700 mb-2">Price: ${item.price}</p>
                <p className="text-sm text-gray-700 mb-2">Description: {item.description}</p>
                {item.duration && <p className="text-sm text-gray-700 mb-2">Duration: {item.duration} hrs</p>}
                {item.category && <p className="text-sm text-gray-700 mb-2">Category: {item.category}</p>}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdatePopup(item)}
                    className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Popup */}
        {showUpdatePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-slate-700 rounded-lg p-6 shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Update Item</h3>
              {Object.keys(updatedFields).map((key) => (
                <div key={key} className="mb-4">
                  <label htmlFor={key} className="block text-left font-medium text-blue-400 mb-1">
                    {key}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type="text"
                    value={updatedFields[key] || ""}
                    onChange={handleFieldChange}
                    className="w-full rounded-md border-gray-300 text-base shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  onClick={() => setShowUpdatePopup(false)}
                  className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubmit}
                  className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminManageItems;
