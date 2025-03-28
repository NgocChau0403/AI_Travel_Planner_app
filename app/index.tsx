import { Text, View } from "react-native";
import Login from "./../components/Login";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "./../configs/FirebaseConfig";
import { Redirect } from "expo-router";

export default function Index() {
  // const insets = useSafeAreaInsets();
  const user = auth.currentUser;
  return (
    <View
      style={{
        // paddingTop: insets.top,
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/mytrip"} /> : <Login />}
    </View>
  );
}
