import React, { useState } from "react";
import { View, ScrollView, Image, Alert, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS, AppStyles } from "../constants";

const Login = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [logInError, setLogInError] = useState("");

    const handleLogin = async () => {
        if (!userInput || !password) {
            setLogInError("Please fill in all fields.");
            return;
        }

        const userDetails = { userInput, password, token: "sample-token" };

        try {
            var allUsersDetails = await AsyncStorage.getItem("allUsersDetails");
            if (allUsersDetails) {
                allUsersDetails = JSON.parse(allUsersDetails);
                var currentUserDetails = allUsersDetails.find(item => (
                  item.email === userDetails.userInput || item.userName === userDetails.userInput));
                if(currentUserDetails){
                  if (userDetails.password === currentUserDetails.password) {
                      console.log('User Logged in : ', userDetails.userInput);
                      currentUserDetails = JSON.stringify(currentUserDetails);
                      await AsyncStorage.setItem("currentUserDetails", currentUserDetails);
                      router.push('/home');
                      return;
                  } else {
                      setLogInError("Incorrect user or password.");
                  }
                } else {
                  setLogInError("Incorrect user or password.");
                }
            } else {
                setLogInError("Incorrect user or password.");
            }
        } catch (error) {
        console.error("Error accessing AsyncStorage", error);
        }
    };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
     <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
                <></>
          ),
          headerTitle: "",
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            ...SHADOWS.medium,
            shadowColor: COLORS.white,
          }}
        >
          <Image
            source={icons.menu}
            style={{
              width: 50,
              height: 50,
              marginBottom: 20,
            }}
          />
        </View>

        {/* Form Component */}
        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Username / Email"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
          {logInError ? <Text style={AppStyles.error}>{logInError}</Text> : null}
          <View style={AppStyles.rightAlignContainer}>
            <TouchableOpacity
                style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
                onPress={handleLogin}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            <Pressable>
                <Text style={AppStyles.forgotText}>Forgot Password ?</Text>
            </Pressable>
          </View>
        </View>

        {/* Additional Options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
            <Text style={AppStyles.linkWords}>Clear Async Storage</Text>
        </TouchableOpacity> */}
    </ScrollView>
  );
};

export default Login;