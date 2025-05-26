import React, { useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore';
import  {db} from '../../../../firebase'
import FitnessCard from './FitnessCard';

function Fitness() {
    const [FitnessItems, setFitnessItems ] = useState([])
    const [itemsLoading, setItemsLoading] = useState(true)

    useEffect( ()=> {
        const fetchFitnessItems = async () => {
            const colRef = collection(db,"Fitness")
            getDocs(colRef)
            .then( (querySnap) => {
                const fetchedData = querySnap.docs.map( (doc) => ({
                   id : doc.id,
                   ...doc.data()
                }))
                console.log("fetched : ",fetchedData);
                setFitnessItems(fetchedData)
                console.log("state : ",FitnessItems);
                FitnessItems.forEach( (item) => console.log(item))
            })
            .catch((err) => {
                console.log("database fetch err : ",err);
            })
            
        }
        fetchFitnessItems()
        setItemsLoading(false)
    },[])

    if(itemsLoading){
        return <p className="text-center text-indigo-600">Loading...</p>
    }

  return (
    <div className='flex flex-col p-3 gap-5'>

        {/* Fitness Header and Search bar  */}
        <h1 className="text-5xl font-bold text-center text-rose-400 poppins">
            Welcome to the <span className="text-slate-500"> Fitness Center</span> of Celestia
        </h1>
        <p className="text-center text-lg text-rose-600">
            Experience best Fitness experiance with our specially curated selection of beauty services.
        </p>

        
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {
                
                FitnessItems.map( (item) => 
                    <FitnessCard key={item.id} itemId={item.id} price={item.price} duration={item.duration} name={item.name} imageUrl={item.imageUrl} desc={item.description} equipments={item.equipments}  />
                )
            }
        </div>
        
    </div> 
  )
}

export default Fitness