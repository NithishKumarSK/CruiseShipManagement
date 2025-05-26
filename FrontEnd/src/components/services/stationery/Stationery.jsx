import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { getDocs, collection } from 'firebase/firestore';
import ItemCard from './../stationery/ItemCard';

function Stationery() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const colRef = collection(db, 'Stationery');
            try {
                const querySnap = await getDocs(colRef);
                const itemDocs = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(itemDocs);
                setLoading(false);
            } catch (err) {
                console.log('Database error: ', err);
            }
        };
        fetchItems();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg shadow-lg space-y-8">
            <h1 className="text-4xl font-bold text-center poppins text-gray-800">
                Welcome to <span className="text-purple-500">Celestia</span> Stationery Services
            </h1>

            {/* Search Bar */}
            <div className="flex flex-col items-center space-y-4">
                <p className="text-lg text-gray-600">
                    Find all the essential stationery items for your voyage with us.
                </p>
                
            </div>

            {/* Stationery Items Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        itemId={item.id}
                        name={item.name}
                        desc={item.description}
                        price={item.price}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default Stationery;
