import { getDoc, setDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

  // This Script was integrated with Movies Comp. But as a backup, incase we 
  // want to generate the seatings independently 

  const DAYS_AHEAD = 7; // Generate data for the next 7 days
  const TIME_SLOTS = ["12:00PM", "3:00PM", "6:00PM", "9:00PM"]; // Time slots per day
  const SCREEN_COUNT = 4; // Number of screens (e.g., screen1, screen2, screen3, screen4)
  const SEATS_PER_SCREEN = [40, 40, 40, 40]; // Number of seats per screen
  
  // Helper function to generate an empty seating array
  function generateEmptySeatingArray(seatCount) {
    return Array(seatCount).fill(""); // Empty strings represent available seats
  }
  
  // Main function to generate `movieSeatings` data
  async function generateMovieSeatings() {
    try {
      for (let i = 0; i < DAYS_AHEAD; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  
        for (const slot of TIME_SLOTS) {
          const docId = `${formattedDate}_${slot}`; // Example: 2025-01-08_12:00PM
          const screensData = {};
  
          for (let screenIndex = 0; screenIndex < SCREEN_COUNT; screenIndex++) {
            const screenName = `screen${screenIndex + 1}`;
            screensData[screenName] = generateEmptySeatingArray(SEATS_PER_SCREEN[screenIndex]);
          }
  
          // Add document to Firestore
          await setDoc(doc(collection(db,"movieSeatings"),docId), screensData);
  
          console.log(`Document created: ${docId}`);
        }
      }
  
      console.log("Data generation completed successfully.");
    } catch (error) {
      console.error("Error generating data:", error);
    }
  }
  

generateMovieSeatings();