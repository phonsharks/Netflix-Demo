import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreens from "./Screens/LoginScreens";
import RegisterScreens from "./Screens/RegisterScreens";
import PlansScreens from "./Screens/PlansScreens";
import ProfilScreen from "./Screens/ProfilScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreens} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreens} options={{headerShown:false}}/>
        <Stack.Screen name="Plan" component={PlansScreens} options={{headerShown:false}}/>
        <Stack.Screen name="Profil" component={ProfilScreen} options={{headerShown:false}}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
