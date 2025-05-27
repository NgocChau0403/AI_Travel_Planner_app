import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "./../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { Image } from "expo-image";

export default function UserTripList({ userTrips }) {
  let LatestTrip;
  try {
    LatestTrip = JSON.parse(userTrips[0].tripData);
    return (
      <View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          {LatestTrip?.locationInfo?.photoRef ? (
            <Image
              source={{ uri: LatestTrip.locationInfo.photoRef }}
              style={{
                width: "100%",
                height: 240,
                resizeMode: "cover",
                borderRadius: 15,
              }}
            />
          ) : (
            <Image
              source={require("./../../assets/images/login.png")}
              style={{
                width: "100%",
                height: 240,
                resizeMode: "cover",
                borderRadius: 15,
              }}
            />
          )}

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {userTrips[0]?.tripPlan?.travelPlan?.location}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 17,
                  color: Colors.GRAY,
                }}
              >
                {moment(LatestTrip.startDate).format("DD MMM YYYY")}
              </Text>

              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 17,
                  color: Colors.GRAY,
                }}
              >
                🚕{LatestTrip.traveler.title}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 15,
                borderRadius: 15,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  fontSize: 15,
                }}
              >
                See your plan
              </Text>
            </TouchableOpacity>
          </View>

          {userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))}
        </View>
      </View>
    );
  } catch (e) {
    console.warn("Invalid tripData JSON:", e);
  }
}
