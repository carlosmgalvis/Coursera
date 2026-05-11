import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  let currentUserDetails = "";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
        const checkLoginState = async () => {
          try {
            currentUserDetails = await AsyncStorage.getItem("currentUserDetails");
            if (currentUserDetails) {
                console.log("User : "+JSON.parse(currentUserDetails).userName+" is already logged in");
                setIsLoggedIn(true);
            }
          } catch (error) {
            console.error("Error checking login state:", error);
          }
          setIsLoading(false);
        };    
        checkLoginState();
      }, []);
      if (isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
              </View>
            );
          }
    
  return <Redirect href={isLoggedIn ? "/home" : "/login"} />;
}
