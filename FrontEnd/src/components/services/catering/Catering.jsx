import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import {db} from '../../../firebase'
import { getDocs, collection } from 'firebase/firestore'

function Catering() {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState(null)

    useEffect( () => {
        const fetchItems = async () =>{
            const colRef = collection(db, 'Catering')
            try{
                const querySnap = await getDocs(colRef)
                
                const itemDocs = querySnap.docs.map((doc) =>
                        ({id:doc.id,...doc.data()})
                    )
                setLoading(false)
                    
                setItems(itemDocs)
                
            }
            catch(err){
                console.log('Database error. : ',err);
            }
        }
        fetchItems()
    },[]
    )
    if(loading){
        return <p> Loading.. </p>
    }
    

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-lg space-y-8">
        <h1 className="text-4xl font-bold text-center poppins text-gray-800">
            Welcome to <span className="text-blue-500">Celestia</span> Catering and Dining
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-gray-600">
                Explore a world of delicious offerings tailored for your voyage.
            </p>
            
        </div>

        {/* Food Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                    items.map( (item)=> 
                     <FoodCard key={item.id} itemId={item.id} name={item.name} desc={item.description} price={item.price} imageUrl={item.imageUrl} />

                )
            }
            
            
            {/* Add more FoodCard components as needed */}
        </div>
    </div>

  )
}

export default Catering