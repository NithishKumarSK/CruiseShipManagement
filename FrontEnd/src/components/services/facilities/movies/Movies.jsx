import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { db } from "../../../../firebase";
import { getDocs, collection, setDoc, doc, deleteDoc } from "firebase/firestore";

const DAYS_AHEAD = 7; 
const DAYS_BEHIND = 4; 
const TIME_SLOTS = ["12:00PM", "3:00PM", "6:00PM", "9:00PM"]; 
const SCREEN_COUNT = 4; 
const SEATS_PER_SCREEN = [40, 40, 40, 40]; 

// Helper function to generate an empty seating array
function generateEmptySeatingArray(seatCount) {
  return Array(seatCount).fill(""); 
}

// Function to generate movie seatings
async function manageMovieSeatings() {
  try {
    const colRef = collection(db, "movieSeatings");
    const querySnap = await getDocs(colRef);

    const existingDocs = {};
    querySnap.forEach((doc) => {
      existingDocs[doc.id] = true;
    });

    const today = new Date();

    // Generate seatings for the next 7 days if missing
    for (let i = 0; i < DAYS_AHEAD; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];

      for (const slot of TIME_SLOTS) {
        const docId = `${formattedDate}_${slot}`;

        if (!existingDocs[docId]) {
          const screensData = {};

          for (let screenIndex = 0; screenIndex < SCREEN_COUNT; screenIndex++) {
            const screenName = `screen${screenIndex + 1}`;
            screensData[screenName] = generateEmptySeatingArray(SEATS_PER_SCREEN[screenIndex]);
          }

          await setDoc(doc(collection(db, "movieSeatings"), docId), screensData);
          console.log(`Generated seating: ${docId}`);
        }
      }
    }

    // Delete seatings older than 4 days
    for (const docId in existingDocs) {
      const [dateStr] = docId.split("_");
      const docDate = new Date(dateStr);
      const daysDiff = Math.floor((today - docDate) / (1000 * 60 * 60 * 24));

      if (daysDiff > DAYS_BEHIND) {
        await deleteDoc(doc(db, "movieSeatings", docId));
        console.log(`Deleted old seating: ${docId}`);
      }
    }

    console.log("Seating data managed successfully.");
  } catch (error) {
    console.error("Error managing movie seatings:", error);
  }
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        await manageMovieSeatings();

        const movieColRef = collection(db, "Movies");
        const movieQuerySnap = await getDocs(movieColRef);
        if (movieQuerySnap) {
          const fetchedMovies = movieQuerySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMovies(fetchedMovies);
        }
      } catch (err) {
        console.log("Error fetching the movies: ", err);
      }
      setLoading(false);
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return <p className="text-center text-indigo-600">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 min-h-screen space-y-8">
      <h1 className="text-5xl font-bold text-center text-indigo-700 poppins">
        Welcome to the <span className="text-indigo-500">Movie Theatre</span> of Celestia
      </h1>
      <h1 className="text-3xl text-gray-600 roboto font-medium">Show Times :</h1>
      <div className="flex flex-row gap-3 text-green-500 font-bold justify-center text-2xl roboto">
        <div>12:00 PM</div>
        <div>3:00 PM</div>
        <div>6:00 PM</div>
        <div>9:00 PM</div>
      </div>
      <h2 className="text-2xl font-semibold text-indigo-700 text-center">Currently Showing</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            screenNumber={movie.screenNumber}
            itemId={movie.id}
            name={movie.name}
            description={movie.description}
            imageUrl={movie.imageUrl}
            duration={movie.duration}
            price={movie.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Movies;
