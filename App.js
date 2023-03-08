import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <>
      {/* Burada amacım stripe ödemes sistemi ile birlikte web üzerinden demo ödeme sistemini oluşturmak */}
      {/* I removed the key for security reasons */}
      <StripeProvider publishableKey="">
        <StackNavigator />
        <StatusBar style="light" />
      </StripeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
