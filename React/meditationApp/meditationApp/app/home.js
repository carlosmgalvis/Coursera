import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native";
import { COLORS, SIZES, AppStyles } from "../constants/theme";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DailyQuote from "../components/DailyQuote";
import { useTheme } from "../context/ThemeProvider";

const Home = () => {
    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    console.log('theme', theme);

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
      setIsDarkMode(theme === "dark");
    }, [theme]);

    console.log("current Username in home : ", currentUserDetails?.userName);

  if(currentUserDetails) {
    return (
     <>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? COLORS.darkBackground : '#F9F9F9' }}>
        <ScreenHeaderBtn isDarkMode={isDarkMode} currentUserDetails={JSON.stringify(currentUserDetails)} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: 10,
            }}
            testID="screensDisplay"
          >
            <Welcome currUserDetails={currentUserDetails ? currentUserDetails : null} isDarkMode={isDarkMode} useCaption={true} />
            <DailyQuote isDarkMode={isDarkMode}/>
            <View style={{ marginBottom: 10 }}>
              <PopularMeditation isDarkMode={isDarkMode}/>
            </View>
            <View style={{ marginBottom: 10 }}>
              <DailyMeditation isDarkMode={isDarkMode}/>
            </View>
          </View>
          {/* <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
              <Text style={AppStyles.linkWords}>Clear Async Storage</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
     </>
    );
  } else {
    return <></>;
  }
};

  export default Home;