import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../../firebase";


function AdminAddItems() {
  const { currentUser, loading: authLoading } = useAuth();

  const [formFields, setFormFields] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [successMsg, setSuccessmsg] = useState("")
  const [showMsg, setShowmsg] = useState(false)

  const addItemToService = async( col, data) =>{
      const colRef = collection(db, col)
      addDoc(colRef, data)
      .then( ()=> {
          setSuccessmsg("Success")
          setShowmsg(true)
          setTimeout( () => setShowmsg(false), 3000)
      })
      .catch((err) => {
        console.error(err)
        setSuccessmsg("Error")
        setShowmsg(true)
        setTimeout( () => setShowmsg(false), 3000)
      })
  }

  const handleAddItem = async (e) => {
      e.preventDefault()
      const servicetype = document.getElementById('servicetype').value
      console.log(servicetype);

      let name, price, description, imageUrl, duration,equipments, category, data;
      
      const formData = new FormData(e.target)

      switch (servicetype) {
        case "Catering":
         name = formData.get('serviceName')
         price = formData.get('price')
         description = formData.get('description')
         imageUrl = formData.get('imageUrl')
         console.log(name, price, description, imageUrl);
         data={
            name, price, description, imageUrl
         }
         addItemToService("Catering", data)
         e.target.reset()
          break;
  
        case "Stationery":
         name = formData.get('serviceName')
         price = formData.get('price')
         description = formData.get('description')
         imageUrl = formData.get('imageUrl')
         console.log(name, price, description, imageUrl);
         data={
            name, price, description, imageUrl
         }
         addItemToService("Stationery", data)
         e.target.reset()
         break;
  
        case "Movies":
          name = formData.get('serviceName')
          price = formData.get('price')
          description = formData.get('description')
          duration = formData.get('duration')
          imageUrl = formData.get('imageUrl')
          getDocs(collection(db,"Movies"))
          .then((querySnap)=>{

            let maxScreenNumber =0;
            querySnap.forEach((item) => {
              const currentScreenNumber = item.data().screenNumber
              if( currentScreenNumber > maxScreenNumber){
                maxScreenNumber = currentScreenNumber;
              }
            })
            console.log("new maxScreenNumber : ", maxScreenNumber);
            console.log(name, price, description, duration, imageUrl);
            data={
              name, price, description, duration, imageUrl, "screenNumber":maxScreenNumber
            }
            addItemToService("Movies", data)
            e.target.reset()
          })
          .catch((err)=>{console.error("couldnt fetch Screen Number : ",err);})
          
          break;
  
        case "Salon":
          name = formData.get('serviceName')
          price = formData.get('price')
          description = formData.get('description')
          duration = formData.get('duration')
          imageUrl = formData.get('imageUrl')
          console.log(name, price, description, duration, imageUrl);
          data={
            name, price, description, duration, imageUrl
          }
          addItemToService("Salon", data)
          e.target.reset()
          break;
  
        case "Fitness":
          name = formData.get('serviceName')
          price = formData.get('price')
          description = formData.get('description')
          duration = formData.get('duration')
          imageUrl = formData.get('imageUrl')
          equipments = formData.get('equipments')
          console.log(name, price, description, duration, equipments, imageUrl);
          data={
            name, price, description, duration,equipments, imageUrl
          }
          addItemToService("Fitness", data)
          e.target.reset()
          break;
  
        case "Partyhall":
          name = formData.get('serviceName')
          price = formData.get('price')
          description = formData.get('description')
          duration = formData.get('duration')
          imageUrl = formData.get('imageUrl')
          category = formData.get('category')
          console.log(name, price, description, duration,category, imageUrl);
          data={
            name, price, description, duration, category, imageUrl
          }
          addItemToService("Partyhall", data)
          e.target.reset()

          break;
        default:
          console.log("FormError");

      }

  }

  const handleServiceChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedService(selectedValue);

    switch (selectedValue) {
      case "Catering":
        setFormFields([
          { name: "serviceName", label: "Item Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
        ]);
        break;

      case "Stationery":
        setFormFields([
          { name: "serviceName", label: "Item Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
        ]);
        break;

      case "Movies":
        setFormFields([
          { name: "serviceName", label: "Title", type: "text" },
          { name: "duration", label: "Duration", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "price", label : "Price", type: "number"},
          { name: "imageUrl", label: "Poster URL", type: "text" },
        ]);
        break;

      case "Salon":
        setFormFields([
          { name: "serviceName", label: "Service Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "duration", label: "Duration", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
        ]);
        break;

      case "Fitness":
        setFormFields([
          { name: "serviceName", label: "Service Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "duration", label: "Duration", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
          { name: "equipments", label: "Equipments", type: "text" },
        ]);
        break;

      case "Partyhall":
        setFormFields([
          { name: "serviceName", label: "Package Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "duration", label: "Duration", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
          {
            name: "category",
            label: "Package Category",
            type: "select",
            options: [
              "Birthday",
              "Wedding",
              "Corporate Event",
            ],
          },
        ]);
        break;

      default:
        setFormFields([]);
    }
  };

  const renderFormFields = () => {
    return formFields.map((field,index) => {
      if (field.type === "textarea") {
        return (
          <div key={index} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Enter ${field.label}`}
            ></textarea>
          </div>
        );
      } else if (field.type === "select") {
        return (
          <div key={index} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              id={field.name}
              name={field.name}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      } else {
        return (
          <div key={index} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required
              placeholder={`Enter ${field.label}`}
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        );
      }
    });
  };
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">You are not logged in.</p>
      </div>
    );
  }

  if (authLoading ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (currentUser.role === "Admin") {
  
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-900 text-white">
      <div className="p-3 w-full md:w-3/4">
      
        <h1 className="text-3xl font-bold mb-6 poppins text-indigo-300">Manage Items/Services </h1>

        
          
        <div className="flex flex-col space-y-4 w-full  md:w-3/4 justify-center mx-auto items-center">
          
            <div className="flex flex-col space-y-4 w-1/2 md:w-1/3">
                <Link to="/users/adminManageItems"
                  className="w-full py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Existing Items
                </Link>
                <Link to="/users/adminManageItems"
                  className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Update Existing Items
                </Link>
            </div>

          <div className="p-3 bg-white rounded-lg shadow-lg text-gray-900 w-4/5">
            <h2 className="text-lg font-semibold mb-4 text-sky-600">Add New Item</h2>
            
            <div className={`w-20 text-center mx-auto ${showMsg===true?"block":"hidden"}  bg-green-500 text-lg p-1 rounded-md text-slate-100`}>
                  {successMsg} 
            </div>
            

            <form onSubmit={handleAddItem} id="submitform">
              <div className="mb-6">
                <label htmlFor="servicetype" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Service
                </label>
                <select
                  name="servicetype"
                  id="servicetype"
                  onChange={handleServiceChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a service</option>
                  <option value="Salon">Beauty Salon</option>
                  <option value="Fitness">Fitness Center</option>
                  <option value="Partyhall">Partyhall</option>
                  <option value="Catering">Catering</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Movies">Movies</option>
                </select>
              </div>

              <div>{renderFormFields()}</div>

              <button
                type="submit" 
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>

          
        </div>
      </div>
    </div>
    )
  }
}

export default AdminAddItems;
