import React, { useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore';
import  {db} from '../../../../firebase'
import SalonCard from './SalonCard';

function Salon() {
    const [salonItems, setSalonItems ] = useState([])
    const [itemsLoading, setItemsLoading] = useState(true)

    useEffect( ()=> {
        const fetchSalonItems = async () => {
            const colRef = collection(db,"Salon")
            getDocs(colRef)
            .then( (querySnap) => {
                const fetchedData = querySnap.docs.map( (doc) => ({
                   id : doc.id,
                   ...doc.data()
                }))
                console.log("fetched : ",fetchedData);
                setSalonItems(fetchedData)
                console.log("state : ",salonItems);
                salonItems.forEach( (item) => console.log(item))
            })
            .catch((err) => {
                console.log("database fetch err : ",err);
            })
            
        }
        fetchSalonItems()
        setItemsLoading(false)
    },[])

    if(itemsLoading){
        return <p className="text-center text-indigo-600">Loading...</p>
    }

  return (
    <div className='flex flex-col p-3 gap-5'>

        {/* Salon Header and Search bar  */}
        <h1 className="text-5xl font-bold text-center text-gray-400 poppins">
            Welcome to the <span className="text-slate-500">Beauty Salon</span> of Celestia
        </h1>
        <p className="text-center text-lg text-gray-600">
            Experience best salon experiance with our specially curated selection of beauty services.
        </p>

        
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {
                
                salonItems.map( (item) => 
                    <SalonCard key={item.id} itemId={item.id} price={item.price} duration={item.duration} name={item.name} imageUrl={item.imageUrl} desc={item.description}  />
                )
            }
        </div>
        
    </div> 
  )
}

export default Salon