import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements/dist/input/Input";
import { useNavigation } from "@react-navigation/native";

const RegisterScreens = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    /* flex yapısını image etiletinin olduğu alanda deneyeceğim */
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      {/* automate setting */}
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 50, width: 120 }}
            source={require("../images/image1.png")}
          />
        </View>
        <View style={{ width: 330, paddingTop: 20 }}>
          <Input
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Email"
            placeholderTextColor={"white"}
            type="email"
            style={{
              color: "white",
              backgroundColor: "gray",
              borderRadius: 7,
              padding: 10,
            }}
          />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"white"}
            type="password"
            style={{
              color: "white",
              backgroundColor: "gray",
              borderRadius: 7,
              padding: 10,
            }}
          />
        </View>
        <Pressable
          style={
            password.length > 4
              ? {
                  backgroundColor: "red",
                  borderColor: "white",
                  width: 300,
                  marginRight: "auto",
                  marginLeft: "auto",
                  justifyContent: "center",
                  alignItems: "center",

                  padding: 10,
                }
              : {
                  backgroundColor: "black",
                  borderColor: "white",
                  width: 300,
                  marginRight: "auto",
                  marginLeft: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  padding: 10,
                }
          }
          //disabled={!input && !password}
          onPress={() => {
            navigation.navigate("Plan", {
                email:input,
                password:password,
            });
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreens;

const styles = StyleSheet.create({});
