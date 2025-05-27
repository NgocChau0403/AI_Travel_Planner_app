import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { Image } from "expo-image";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  const formatData = (data) => {
    console.log(JSON.parse(data));
    return JSON.parse(data);
  };
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      {/*<Image
        source={{ uri: formatData(trip.tripData).locationInfo.photoRef }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />*/}
      <Image
        source={{ uri: formatData(trip.tripData).locationInfo.photoRef }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />

      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {formatData(trip.tripData).locationInfo.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(formatData(trip.tripData).startDate).format("DD MMM YYYY")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Traveling: {formatData(trip.tripData).traveler.title}
        </Text>
      </View>
    </View>
  );
}
