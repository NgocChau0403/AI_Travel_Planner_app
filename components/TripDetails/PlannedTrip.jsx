import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function PlannedTrip() {
  const [mockDetails, setMockDetails] = useState({});

  useEffect(() => {
    // Dữ liệu mẫu
    const sampleData = {
      day1: {
        plan: [
          {
            placeName: "Tokyo Tower",
            placeDetails: "Famous icon with panoramic view of the city.",
            ticketPricing: "¥1200",
            timeToTravel: "2 hours",
            imageUrl:
              "https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2016/06/Tokyo-Tower-.jpg",
          },
          {
            placeName: "Meiji Shrine",
            placeDetails: "Shinto shrine in the middle of a peaceful forest.",
            ticketPricing: "Free",
            timeToTravel: "1.5 hours",
            imageUrl:
              "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/05/meiji-jingu-iStock-499807771-1024x600.jpg",
          },
        ],
      },
      day2: {
        plan: [
          {
            placeName: "Asakusa & Sensoji Temple",
            placeDetails: "Ancient Buddhist temple and bustling old town.",
            ticketPricing: "Free",
            timeToTravel: "2 hours",
            imageUrl:
              "https://www.alexisjetsets.com/wp-content/uploads/2019/01/tokyo-sensoji-temple-alexisjetsets-e1547465076859.jpg",
          },
          {
            placeName: "Shibuya Crossing",
            placeDetails:
              "The world's busiest intersection and symbol of modern Tokyo.",
            ticketPricing: "Free",
            timeToTravel: "30 minutes",
            imageUrl:
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/7c/eb/cb/photo0jpg.jpg?w=800&h=500&s=1",
          },
        ],
      },
      day3: {
        plan: [
          {
            placeName: "TeamLab Planets",
            placeDetails: "Unique interactive digital art exhibition.",
            ticketPricing: "¥3200",
            timeToTravel: "1.5 hours",
            imageUrl: "https://japantravelsights.com/archives/253/image-68",
          },
          {
            placeName: "Ueno Park & Zoo",
            placeDetails: "Large park with zoo, museum and cherry blossoms.",
            ticketPricing: "¥600",
            timeToTravel: "3 hours",
            imageUrl:
              "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/06/29/08fbd7f3ba9191f48672fe4ae99055c0_1000x1000.jpg",
          },
        ],
      },
    };

    setMockDetails(sampleData);
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: "outfit-medium" }}>
        🌌 PlannedTrip
      </Text>

      {Object.entries(mockDetails)
        .reverse()
        .map(([day, details]) => (
          <View key={day}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                marginTop: 20,
              }}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Text>
            {details.plan.map((place, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: Colors.LIGHT_BLUE,
                  padding: 10,
                  borderRadius: 15,
                  borderColor: Colors.GRAY,
                  marginTop: 20,
                }}
              >
                <Image
                  source={{ uri: place.imageUrl }}
                  style={{ width: "100%", height: 120, borderRadius: 15 }}
                />
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                    {place?.placeName}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 17,
                      color: Colors.GRAY,
                    }}
                  >
                    {place.placeDetails}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontFamily: "outfit",
                          fontSize: 17,
                          marginTop: 5,
                        }}
                      >
                        🎟 Ticket Price:{" "}
                        <Text style={{ fontFamily: "outfit-bold" }}>
                          {place.ticketPricing}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: "outfit",
                          fontSize: 17,
                          marginTop: 5,
                        }}
                      >
                        ⏰ Time to Travel:{" "}
                        <Text style={{ fontFamily: "outfit-bold" }}>
                          {place.timeToTravel}
                        </Text>
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 8,
                        borderRadius: 7,
                      }}
                    >
                      <Ionicons name="navigate" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
    </View>
  );
}
