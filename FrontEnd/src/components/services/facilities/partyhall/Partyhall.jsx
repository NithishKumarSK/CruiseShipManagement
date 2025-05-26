import React, { useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore';
import  {db} from '../../../../firebase'
import PartyhallCard from './PartyhallCard';

function Partyhall() {
    const [PartyhallItems, setPartyhallItems ] = useState([])
    const [itemsLoading, setItemsLoading] = useState(true)

    useEffect( ()=> {
        const fetchPartyhallItems = async () => {
            const colRef = collection(db,"Partyhall")
            getDocs(colRef)
            .then( (querySnap) => {
                const fetchedData = querySnap.docs.map( (doc) => ({
                   id : doc.id,
                   ...doc.data()
                }))
                console.log("fetched : ",fetchedData);
                setPartyhallItems(fetchedData)
                console.log("state : ",PartyhallItems);
                PartyhallItems.forEach( (item) => console.log(item))
            })
            .catch((err) => {
                console.log("database fetch err : ",err);
            })
            
        }
        fetchPartyhallItems()
        setItemsLoading(false)
    },[])

    if(itemsLoading){
        return <p className="text-center text-indigo-600">Loading...</p>
    }

  return (
    <div className='flex flex-col p-3 gap-5'>

        {/* Partyhall Header and Search bar  */}
        <h1 className="text-5xl font-bold text-center text-amber-400 poppins">
            Welcome to the <span className="text-slate-500"> Partyhall Center</span> of Celestia
        </h1>
        <p className="text-center text-lg text-slate-600">
            Experience best Partyhall experiance with our specially curated selection of beauty services.
        </p>

        
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {
                
                PartyhallItems.map( (item) => 
                    <PartyhallCard key={item.id} itemId={item.id} price={item.price} duration={item.duration} name={item.name} imageUrl={item.imageUrl} desc={item.description} category={item.category}  />
                )
            }
        </div>
        
    </div> 
  )
}

export default Partyhall