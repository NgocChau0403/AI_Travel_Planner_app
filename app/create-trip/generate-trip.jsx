import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth,db } from "./../../configs/FirebaseConfig";
import { Image } from "expo-image";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const user=auth.currentUser;

  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, []);

  const GenerateAiTrip = async () => {
    setLoading(true);
  
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", tripData?.locationInfo?.name)
      .replace("{totalDay}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1)
      .replace("{traveler}", tripData.traveler?.title)
      .replace("{budget}", tripData.budget)
      .replace("{totalDay}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1);
  
    console.log(FINAL_PROMPT);
  
    try {
      const response = await fetch(
        'https://us-central1-project-in-uit.cloudfunctions.net/api/generate',
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: FINAL_PROMPT }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log("Result from Firebase:", data);
  
        const tripResp = data.result;
        setTripData(tripResp);
  
        const docId = Date.now().toString();
        await setDoc(doc(db, "UserTrips", docId), {
          userEmail: user?.email,
          tripPlan: tripResp, //AI result 
          tripData:JSON.stringify(tripData), //User Selection Data
          docId:docId
        });
  
        router.push('(tabs)/mytrip');
      } else {
        const errorText = await response.text();
        console.error("Error fetching trip:", errorText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  
    setLoading(false);
  };
  
    
  
    

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.GAINSBORO,
        height: "100%",
      }}
    >
      {loading ? (
        <>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 35,
              textAlign: "center",
            }}
          >
            Please wait...
          </Text>

          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            We are working to generate your dream trip
          </Text>

          <Image
  source={require("./../../assets/images/plane.gif")}
  style={{ width: "100%", height: 200 }}
  contentFit="contain"
/>

          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Do not go back
          </Text>
        </>
      ) : (
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
            textAlign: "center",
          }}
        >
          Trip is ready!
        </Text>
      )}
    </View>
  );
}
