import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Tạo dữ liệu mẫu
    const mockHotelList = [
      {
        hotelName: "Sunshine Resort",
        rating: 4.5,
        price: "$120/night",
        hotelImageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbJ721-ajcZCjVpfXvRzvb0L-IKLdgd9XNbg&s",
      },
      {
        hotelName: "Cozy Inn",
        rating: 4.2,
        price: "$95/night",
        hotelImageUrl:
          "https://content.r9cdn.net/himg/fc/ab/4a/expedia_group-399971-324e7d-323887.jpg",
      },
      {
        hotelName: "Luxury Stay",
        rating: 4.8,
        price: "$200/night",
        hotelImageUrl:
          "https://mia.vn/media/uploads/blog-du-lich/khach-san-soc-trang-net-viet-1711169539.jpg",
      },
    ];
    setHotels(mockHotelList);
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        data={hotels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 8 }}
        renderItem={({ item }) => (
          <View style={{ marginRight: 20, width: 180 }}>
            <Image
              source={{ uri: item.hotelImageUrl }}
              style={{ width: 180, height: 120, borderRadius: 15 }}
            />
            <View style={{ padding: 5 }}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 17,
                }}
              >
                {item.hotelName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "outfit" }}>⭐ {item.rating}</Text>
                <Text style={{ fontFamily: "outfit" }}>💵 {item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
