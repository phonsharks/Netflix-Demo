import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "react-native-elements/dist/input/Input";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreens = () => {
  useEffect(() => {
    const unsubcribe=auth.onAuthStateChanged((user)=>{
      if(user){
        navigation.navigate("profil")
      }
    })
    return unsubcribe;
  }, [])
  
  const signIn = () => {
    {
      signInWithEmailAndPassword(auth,input, password).then(
        (userCredentials) => {
          console.log(userCredentials);
          const user = userCredentials.user;
          console.log(user.email);
        }
      );
    }
  };
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
          onPress={signIn}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Sign In
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            New to Netflix? Sign up now
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreens;

const styles = StyleSheet.create({});
