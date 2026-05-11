import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Install: npm install react-native-vector-icons
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import {useRouter } from "expo-router";
import Welcome from "../components/Welcome";
import BackButton from "../components/BackButton";

export default function Settings() {
    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const router = useRouter();

    const settingsMenu = [
        {
            id: 1,
            title: "Advanced Settings",
            icon: "https://cdn-icons-png.flaticon.com/512/126/126472.png",
            target: "Mental Health",
            route: "ThemeChange",
        },
        {
            id: 2,
            title: "My Favourites",
            icon: "https://cdn-icons-png.flaticon.com/512/2932/2932360.png",
            target: "Mental Health",
            route: "Favourites",
        },
        {
            id: 3,
            title: "Daily Reminders",
            icon: "https://cdn-icons-png.flaticon.com/512/109/109613.png",
            target: "Mental Health",
            route: "DailyReminders",
        },
        {
            id: 4,
            title: "My Profile",
            icon: "../assets/icons/profile.png",
            target: "Mental Health",
            route: "Profile",
        },
    ];

    const makeLogOut = async() => {
        await AsyncStorage.removeItem("currentUserDetails");
        router.push("/login");
    } 

    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Logout canceled"),
                    style: "cancel",
                },
                {
                    text: "Yes, Logout",
                    onPress: () => {
                        // 👉 Place your logout logic here
                        makeLogOut();
                        console.log("User logged out");
                    },
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
      const checkLoginState = async () => {
        try {
          const data = await AsyncStorage.getItem("currentUserDetails");
          if(data){
            setCurrentUserDetails(JSON.parse(data));
            console.log("current Username after useEffect : ", JSON.parse(data).userName);
          }
        } catch (error) {
          console.error("Error checking login state:", error);
          await AsyncStorage.clear();
          router.push("/login");
          return;
        }
      };
      checkLoginState();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScreenHeaderBtn />
            <View
                style={{
                flex: 1,
                padding: 10,
                }}
                testID="screensDisplay"
            >
                <BackButton />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, padding: SIZES.medium }}>
                        <View style={{ width: "100%" }} testID="userDetails">
                            <Welcome currUserDetails={currentUserDetails ? currentUserDetails : null} isDarkMode={false} useCaption={false} />
                            <Text
                                style={{
                                    fontSize: SIZES.medium + 3,
                                    color: "#398E7D",
                                    marginTop: 2,
                                }}
                            >
                                Would you like to change any settings?
                            </Text>
                        </View>
                        {settingsMenu.map((setting) => (
                            <TouchableOpacity
                                key={setting.id}
                                style={{
                                    flex: 1,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    padding: SIZES.medium,
                                    borderRadius: SIZES.small,
                                    backgroundColor: "#E0FDF9",
                                    ...SHADOWS.medium,
                                    shadowColor: COLORS.white,
                                    marginVertical: SIZES.small,
                                }}
                                onPress={() => router.push(`settings/${setting.route}`)}
                            >
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: COLORS.white,
                                        borderRadius: SIZES.medium,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        source={{ uri: setting.icon }}
                                        resizeMode="cover"
                                        style={{ width: "70%", height: "70%" }}
                                    />
                                </View>
                                <View style={{ flex: 1, marginHorizontal: SIZES.medium }}>
                                <Text
                                    style={{
                                        fontSize: SIZES.medium,
                                        fontFamily: "DMBold",
                                        color: COLORS.primary,
                                    }}
                                    numberOfLines={1}
                                >
                                    {setting?.title}
                                </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row",
                                padding: SIZES.medium,
                                borderRadius: SIZES.small,
                                backgroundColor: "#ECD4C1",
                                ...SHADOWS.medium,
                                shadowColor: COLORS.white,
                                marginVertical: SIZES.small,
                            }}
                            onPress={handleLogout}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: COLORS.white,
                                    borderRadius: SIZES.medium,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={icons.logout}
                                    resizeMode="cover"
                                    style={{
                                        width: "70%",
                                        height: "70%",
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    marginHorizontal: SIZES.medium,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: SIZES.medium,
                                        fontFamily: "DMBold",
                                        color: COLORS.primary,
                                    }}
                                    numberOfLines={1}
                                >
                                    Logout
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
