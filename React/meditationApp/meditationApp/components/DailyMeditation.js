import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, AppStyles } from "../constants/theme";
import useFetch from "../hook/useFetch";

const DailyMeditation = ({ meditations, isDarkMode }) => {
  const router = useRouter();

  const { isLoading, error, bestMeditations } = useFetch("search", {
    query: "",
    num_pages: "1",
  });

  const handleNavigate = (id) => {
    router.push(`/meditation-details/${id}`);
  };

  const data = meditations || bestMeditations;

  return (
    <View style={isDarkMode ? AppStyles.darkContainer : AppStyles.container}>
      <View style={AppStyles.header}>
        <Text style={AppStyles.headerTitle}>Daily Meditations</Text>
      </View>

      <View style={AppStyles.dailyMeditationCardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((meditation) => (
            <TouchableOpacity
              key={`meditation-${meditation.id}`}
              style={AppStyles.dailyMeditationCardContainer}
              onPress={() => handleNavigate(meditation.id)}
            >
              <View style={AppStyles.logoContainer}>
                <Image
                  source={{ uri: meditation.image }}
                  resizeMode="cover"
                  style={AppStyles.dailyMeditationLogoImage}
                  onPress={() => handleNavigate(meditation.id)}
                />
              </View>

                <View style={{ alignItems: "center", marginBottom: 10 }}>
                    <Text style={AppStyles.dailyMeditationName} numberOfLines={1}>
                        {meditation.title}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={AppStyles.meditationDetail}>
                        {meditation.target}
                    </Text>
                    <Text style={AppStyles.meditationDetail}>
                        {meditation.duration}
                    </Text>
                </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

export default DailyMeditation;
