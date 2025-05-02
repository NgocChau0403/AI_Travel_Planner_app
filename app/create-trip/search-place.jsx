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
import { useNavigation } from "expo-router";
import { Colors } from "./../../constants/Colors";
import { CreateTripContext } from "./../../context/CreateTripContext";

export default function SearchPlace() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  // Auto search on query change (debounce-like effect)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (text) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          text
        )}&format=json&addressdetails=1&limit=5`,
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

  const handleSelect = (location) => {
    setQuery(location.display_name);
    setSuggestions([]);
    setTripData({
      ...tripData,
      locationInfo: {
        name: location.display_name,
        coordinates: {
          lat: location.lat,
          lon: location.lon,
        },
        photoRef: null,
        url: `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}`,
      },
    });
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
