import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../constants/Colors";
import { CreateTripContext } from "./../../context/CreateTripContext";

export default function SearchPlace() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  // Hàm trích xuất tên thành phố từ display_name
  const extractCityName = (displayName) => {
    return displayName.split(",")[0].trim();
  };

  // Hàm gọi ảnh từ Wikipedia
  const fetchPlaceImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=${encodeURIComponent(
          placeName
        )}&pithumbsize=500`
      );

      if (!response.ok) {
        console.warn("Wikipedia API fetch failed:", response.status);
        return null;
      }

      const data = await response.json();
      const pages = data?.query?.pages;

      const firstPageKey = Object.keys(pages)[0];
      const firstPage = pages[firstPageKey];

      console.log(firstPage?.thumbnail?.source);
      return firstPage?.thumbnail?.source || "";
    } catch (error) {
      console.error("fetchWikipediaImage error:", error);
      return "";
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  // Tự động gọi gợi ý khi query thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (text) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          text
        )}&format=json&addressdetails=1&limit=5&accept-language=en`,
        {
          headers: {
            "User-Agent": "AI_TravelPlanner/1.0 (ngocchaule0403@gmail.com)",
          },
        }
      );

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Suggestion error:", error);
      Alert.alert("Error", "Unable to fetch suggestions.");
    }
    setLoading(false);
  };

  const handleSelect = async (location) => {
    setQuery(location.display_name);
    setSuggestions([]);

    const cityNameOnly = extractCityName(location.display_name);
    const photoUrl = await fetchPlaceImage(cityNameOnly);

    setTripData({
      ...tripData,
      locationInfo: {
        name: location.display_name,
        coordinates: {
          lat: location.lat,
          lon: location.lon,
        },
        photoRef: photoUrl,
        url: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}`,
      },
    });

    router.push("/create-trip/select-traveler");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a location"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSelect(item)}
          >
            <Text>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
