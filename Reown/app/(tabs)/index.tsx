import { View, Text } from "react-native";
import { AppKitButton } from "@reown/appkit-wagmi-react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Connect your wallet</Text>
      <AppKitButton />
    </View>
  );
}
