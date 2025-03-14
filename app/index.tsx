import { Text, View } from "react-native";
import Login from "./../components/Login";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        //flex: 1,
      }}
    >
      <Login />
    </View>
  );
}
