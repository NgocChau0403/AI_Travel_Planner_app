import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "./../../constants/Colors";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./../../configs/FirebaseConfig";
import { ActivityIndicator, ScrollView } from "react-native";
import UserTripList from "../../components/MyTrips/UserTripList";

export default function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          My Trips
        </Text>
        <Ionicons
          name="add-circle"
          size={50}
          color="black"
          onPress={() => router.push("/create-trip/search-place")}
        />
      </View>
      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}

      {userTrips?.length == 0 && !loading ? (
        <StartNewTripCard />
      ) : (
        <View>
          <UserTripList userTrips={userTrips} />
        </View>
      )}
    </ScrollView>
  );
}
