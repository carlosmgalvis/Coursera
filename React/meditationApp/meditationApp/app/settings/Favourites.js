import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES } from "../../constants";
import DailyMeditation from "../../components/DailyMeditation";
import { useFocusEffect } from "expo-router";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn'
import BackButton from "../../components/BackButton";

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(favoritesArray);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setIsLoading(false);
        }
    };

     useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
            <ScreenHeaderBtn/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <BackButton/>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : favorites.length === 0 ? (
                        <Text style={styles.headerTitle}>No favorite items found.</Text>
                    ) : (
                        <>
                            <Text style={{ 
                                    textAlign: "center", 
                                    color: "#777770", 
                                    fontWeight: "bold", 
                                    opacity: 0.75, 
                                    fontSize: 20 
                                }}>
                                My Favourite Exercises
                            </Text>
                            <View style={{ marginBottom: 10 }}>
                                <DailyMeditation meditations={favorites} />
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Favourites;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    padding: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 20,
  },
});
