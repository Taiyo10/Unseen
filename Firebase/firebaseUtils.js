import {database} from './firebaseConfig';
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";

//Writes facts to database
export const writeFact = async (factId, text, source, sourceShort, seenCount = 0, unseenCount = 0, isUnknown = false, seenPercent = 100, unseenPercent = 100) => {
    const factRef = ref(database, 'facts/' + factId);
    await set(factRef, {
        text,
        source,
        sourceShort,
        seenCount,
        unseenCount,
        isUnknown,
        seenPercent,
        unseenPercent
    });
    console.log("Fact written")
}

// Get all facts
export const getAllFacts = async () => {
    const factsRef = ref(database, 'facts'); // Reference to the facts node
    try {
      const snapshot = await get(factsRef);
      const facts = []

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const factId = childSnapshot.key;
            const factData = childSnapshot.val();
            facts.push({factId, ...factData});
        })
        return facts;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching facts:", error);
    }
};
 
export const updateFactCount = async (factId, type) => {
    const factRef = ref(database, 'facts/' + factId); // Get reference to fact
    try {
      const snapshot = await get(factRef); // Get data at factRef location
      if (snapshot.exists()) { // Check if snapshot exists
        const factData = snapshot.val(); // Get data from snapshot
        const updatedData = {}; // Holds new updated object
        
        // Update the count based on type
        if (type === 'seen') {
          updatedData.seenCount = (factData.seenCount || 0) + 1; // Increment seenCount
        } 
        else if (type === 'unseen') {
          updatedData.unseenCount = (factData.unseenCount || 0) + 1; // Increment unseenCount
        }
        
        //Updates unknown if number work
        const totalCount = factData.seenCount + factData.unseenCount;
        if ((factData.unseenCount / totalCount >= 0.5) && (factData.isUnknown === false)) {
            factData.isUnknown = true;
            console.log("Updating Unknown");
        }

        if (totalCount > 0){
            factData.seenPercent = Math.round((factData.seenCount/totalCount) * 100);
            factData.unseenPercent = Math.round((factData.unseenCount/totalCount) * 100);
        } else {
            factData.seenPercent = 0;
            factData.unseenPercent = 0;
        }
        // Update the fact with the new counts
        await set(factRef, {
          ...factData,
          ...updatedData,
        });
        
        console.log("Fact updated successfully ");
      }
    } catch (error) {
      console.error("Error updating fact count", error);
    }
};

export const getRandUnknown = async (count) => {
    const factsRef = ref(database, 'facts');
    console.log("Querying Unknown")
    const factsQuery = query(factsRef, orderByChild('isUnknown'), equalTo(true));
    console.log(`Queried: ${factsQuery}`);
    try {
        const snapshot = await get(factsQuery);

        const facts = [];

        if (snapshot.exists()) {
            // Collect all the facts with flag = true
            snapshot.forEach((childSnapshot) => {
            const factId = childSnapshot.key;
            const factData = childSnapshot.val();
            facts.push({ factId, ...factData });
            });
        
            const randomUnknown = getRandomItems(facts, count);

            return randomUnknown;
        } else {
            console.log("No facts found with unknown flag");
            return [];
        }

    } catch (error){ 
        console.error('Error fetching Unknown Facts', error)
    }
}

function getRandomItems(arr, count) {
    const shuffled = [...arr]; // Copy the array to avoid mutating the original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Get random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled.slice(0, count); // Return the first 'count' items from the shuffled array
  }

export const getPercents = async(factId) => {
    const factRef = ref(database, 'facts/' + factId); //gets reference to fact
    try {
        const snapshot = await get(factRef) //gets data at factRef location
        if (snapshot.exists) {
            const factData = snapshot.val //Gets data from snapshot
            totalCount = factData.seenCount + factData.unseenCount;
            seenPercent = (factData.seenCount / totalCount) * 100;
            unseenPercent = (factData.unseenCount / totalCount) * 100;
        } else {
            console.log("Fact doest exist");
            seenPercent = 0;
            unseenPercent = 0;
        }
        return ({seenPercent, unseenPercent});
    } catch (error){
        console.error("Percent unable to be got", error)
    }
}