import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import plans from "../Data/plans";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";


const PlansScreens = () => {
  const data = plans;
  /* includes kullanabilmem için boş dizi belirtmem gerekmekte */
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState();
  const stripe=useStripe()
  const route=useRoute()
  const navigation=useNavigation()
  const email=route.params.email
  const password=route.params.password
  
  const subscribe=async()=>{
    /* localhost kapsamında veri iletiminde sorun bulunuyor */
    const response = await fetch("http://localhost:8080/payment", {
      method: "POST",
      body: JSON.stringify({
        amount:Math.floor(price * 100),

      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) return Alert.alert(data.message);
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error.message);

    else{
      createUserWithEmailAndPassword(auth,email,password).then((userCredentials) => {
        console.log(userCredentials);
        const user = userCredentials.user;
      })
    }
  }
  return (
    <>
      <ScrollView style={{ paddingTop: 35, paddingHorizontal: 10 }}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <Pressable onPress={()=>navigation.goBack()}>  
            <AntDesign name="leftcircleo" size={26} color="red" style={{marginBottom:11,marginLeft:5}} />
          </Pressable>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Choose the plan right that's rigth for you
          </Text>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="check" size={30} color="red" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>
              Watch all you want Add-free
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="check" size={30} color="red" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>
              Recommendations just for you
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="check" size={30} color="red" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10 }}>
              Cancel your plan anytime
            </Text>
          </View>
        </View>
        {data.map((item, index) => (
          <Pressable
            style={
              //Dizi döndürürken boolean türünden döndürme yapmaktayım.
              //Üzerine tıklanıldığının belli olması için bu şekilde ayarlamalarım.
              //usaState yapısında boş dizi tanımlaması yapmadan includes ayarlamasını yapamam
              selected.includes(item.name)
                ? {
                    height: 150,
                    borderRadius: 10,
                    padding: 10,
                    borderWidth: 4,
                    borderColor: "red",
                    marginVertical: 10,
                  }
                : {
                    height: 150,
                    borderRadius: 10,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "white",
                    marginVertical: 10,
                  }
            }
            onPress={() => {
              /* Üzerine tıklandığında alanda gösterilmesini istediğim veriler */
              setSelected(item.name);
              setPrice(item.price);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable style={{ padding: 10, backgroundColor: "red" }}>
                <Text style={{ color: "white" }}>{item.name}</Text>
              </Pressable>
              <Text>price:{item.price}$</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ color: "gray", fontWeight: "bold" }}>
                  Video Quality:{item.videoQuality}
                </Text>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Resolution:{item.resolution}
                </Text>
              </View>
              <MaterialCommunityIcons name="netflix" size={24} color="black" />
            </View>

            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Text style={{ fontSize: 15 }}>Devices you can watch on </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.devices.map((x) => (
                  <Entypo name={x.name} size={24} color="red" />
                ))}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {selected.length > 0 ? (
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "red",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              selected Plan {selected}
            </Text>
          </View>
          <Pressable onPress={subscribe}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              PAY:{price}$
            </Text>
          </Pressable>
        </Pressable>
      ) : null}
    </>
  );
};

export default PlansScreens;

const styles = StyleSheet.create({});
