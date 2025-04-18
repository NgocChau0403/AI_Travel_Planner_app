import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    " outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    // <SafeAreaProvider>
    //   <StatusBar hidden />
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
    // </SafeAreaProvider>
  );
}
