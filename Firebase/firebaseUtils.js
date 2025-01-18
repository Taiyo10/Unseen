import {database} from './firebaseConfig';
import { ref, set, get, child } from "firebase/database";

//Writes facts to database
export const writeFact = async (factId, text, source, seenCount = 0, unseenCount = 0, isUnknown = false) => {
    const factRef = ref(database, 'facts/' + factId);
    await set(factRef, {
        text,
        source,
        seenCount,
        unseenCount,
        isUnknown
    });
    console.log("Fact written")
}

// Get all facts
export const getAllFacts = async () => {
    const factsRef = ref(database, 'facts'); // Reference to the facts node
    try {
      const snapshot = await get(factsRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching facts:", error);
    }
  };
 
  // Updates isUnknown based on percentage of seen/unseen
  async function updateUnknown(factId) {
    const factRef = ref(database, 'facts/' + factId);

    try {
        const snapshot = await get(factRef);
        if (snapshot.exists) {
            const factData = snapshot.val;
            const { seenCount, unseenCount } = factData;
            const totalCount = seenCount + unseenCount;

            // If more than 70% of count is unseen
            if (unseenCount / totalCount >= 0.7) {
                if (factData.isUnknown == false) {
                    await set(factRef, {
                        ...factData,
                        isUnknown: true
                    });
                    console.log(`Fact: ${factData.text} isUnknown Flag updated to True`);
                }
            }
        } else {
            console.log("Fact not found");
        }
    }
    catch {
        console.error("Error updating flag", Error);
    }
  } 

  export const updateFactCount = async(factId, type) => {
    const factRef = ref(database, 'facts/' + factId); //gets reference to fact
    try {
        const snapshot = await get(factRef) //gets data at factRef location
        if (snapshot.exists) {
            const factData = snapshot.val //Gets data from snapshot
            const updatedData = {} //Holds new updated object
            if (type == 'seen') {
                updatedData.seenCount = factData.seenCount + 1; //gets new value
            } 
            else if (type == 'unseen') {
                updatedData.unseenCount = factData.unseenCount + 1; //gets new value
            }
            await set(factRef, {
                ...factData,
                ...updatedData
            });

            //updates isUnknown flag 
            await updateUnknown(factId);

            console.log("Fact updated successfully ");
        }
    }
    catch {
        console.error("Error updating fact count", Error);
    }
  }