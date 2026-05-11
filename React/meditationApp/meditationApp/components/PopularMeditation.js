import { useState } from "react";
import { useRouter } from "expo-router";
import {COLORS, FONT, SHADOWS, SIZES, AppStyles} from '../constants/theme'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import useFetch from "../hook/useFetch";

const PopularMeditation = ({isDarkMode}) => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch("search", {
      query: "React developer",
      num_pages: "1",
    });
  
    const [selectedMeditation, setselectedMeditation] = useState();

    const handleCardPress = (item) => {
        router.push(`/meditation-details/${item.id}`);
        setselectedMeditation(item.id);
    };

    const renderMeditationCard = ({ item }) => (
        <TouchableOpacity
            style={AppStyles.popularContainer(selectedMeditation, item)}
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={AppStyles.logoContainer(selectedMeditation, item)} 
                    onPress={() => handleCardPress(item)}>
                <Image
                    source={{ uri: item?.image }}
                    resizeMode="cover"
                    style={AppStyles.logoImage}
                />
            </TouchableOpacity>
            <View style={AppStyles.tabsContainer}>
                <Text style={AppStyles.companyName} numberOfLines={1}>
                    {item.target}
                </Text>
            </View>

            <View style={AppStyles.infoContainer}>
                <Text
                    style={AppStyles.meditationName(selectedMeditation, item)}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>
                <View style={AppStyles.infoWrapper}>
                    <Text style={AppStyles.publisher(selectedMeditation, item)}>
                        {item?.shortDescription}
                    </Text>
                </View>
            </View>
            <Text style={AppStyles.location}> {item.duration}</Text>
        </TouchableOpacity>
    );
  
    return(
    <View style={{backgroundColor: isDarkMode ? COLORS.darkBackground : '#F9F9F9'}}>
        <View style={isDarkMode ? AppStyles.darkContainer : AppStyles.container} testID="popularContainer">
            <View style={AppStyles.header} testID="popularHeader">
                <Text style={AppStyles.headerTitle}>Popular Meditations</Text>
                <TouchableOpacity></TouchableOpacity>
            </View>
        </View>

        <View style={AppStyles.cardsContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMeditationCard}
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                    horizontal
                />
            )}
        </View>
    </View>
   )
  };
  
  export default PopularMeditation;