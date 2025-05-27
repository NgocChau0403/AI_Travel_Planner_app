import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { Colors } from "./../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";
import { ScrollView } from "react-native";

export default function TripDetails() {
  const formatData = (data) => {
    return JSON.parse(data);
  };
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [parsedTripData, setParsedTripData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    if (trip) {
      try {
        const parsedTrip = JSON.parse(trip);
        setTripDetails(parsedTrip);

        if (parsedTrip.tripData) {
          const parsedData = JSON.parse(parsedTrip.tripData);
          setParsedTripData(parsedData);
          console.log("Trip Details:", parsedTrip);
          console.log("Parsed Trip Data:", parsedData);
        }
      } catch (e) {
        console.warn("Failed to parse trip or tripData:", e);
      }
    }
  }, [trip]);

  if (!tripDetails) {
    return (
      <View>
        <Text>Loading or invalid trip data</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        source={{
          uri: parsedTripData?.locationInfo?.photoRef ?? undefined,
        }}
        style={{
          width: "100%",
          height: 330,
        }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          height: "100%",
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>
          {tripDetails?.tripPlan?.travelPlan?.location ??
            parsedTripData?.locationInfo?.name ??
            "Unknown Location"}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.GRAY,
            }}
          >
            {moment(formatData(tripDetails.tripData).startDate).format(
              "DD MMM YYYY"
            )}
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.GRAY,
            }}
          >
            -{" "}
            {moment(formatData(tripDetails.tripData).endDate).format(
              "DD MMM YYYY"
            )}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            color: Colors.GRAY,
          }}
        >
          🚕{formatData(tripDetails.tripData)?.traveler?.title}
        </Text>

        {/* Flight Info */}
        <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight} />
        {/* Hotels List */}
        <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotels} />

        {/* Trip Day Planner Info*/}
        <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.itinerary} />
      </View>
    </ScrollView>
  );
}
