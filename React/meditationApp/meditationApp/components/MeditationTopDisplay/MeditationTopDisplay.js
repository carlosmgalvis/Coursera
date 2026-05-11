import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./MeditationTopDisplay.style";
import { icons } from "../../constants";
import BackButton from "../BackButton";

const MeditationTopDisplay = ({ meditationImage, meditationTitle, duration, target }) => {

    return (
        <View>
            <BackButton/>
            <View style={styles.container}>
                <View style={styles.logoBox}>
                <Image
                    source={{
                        uri: meditationImage,
                    }}
                    resizeMode="cover"
                    style={styles.logoImage}
                />
                </View>

                <View style={styles.meditationTitleBox}>
                <Text style={styles.meditationTitle}>{meditationTitle}</Text>
                </View>

                <View style={styles.meditationInfoBox}>
                <Text style={styles.meditationName}>{target} / </Text>
                <View style={styles.durationBox}>
                    <Image
                        source={icons.clock}
                        resizeMode="cover"
                        style={styles.durationImage}
                    />

                    <Text style={styles.durationName}>{duration}</Text>
                </View>
                </View>
            </View>
        </View>
    );
}

export default MeditationTopDisplay;
