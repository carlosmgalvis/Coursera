import { TouchableOpacity, Image } from 'react-native';
import { useRouter, useNavigation } from "expo-router";
import { icons } from "../constants";
import { StyleSheet } from "react-native";

const BackButton = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            router.back();
        } else {
            console.log("Can't go back. Redirecting to home.");
            router.replace("/home");  // fallback route
        }
    }

    return (
        <TouchableOpacity onPress={() => handleGoBack()}>
            <Image
                source={icons.left}
                resizeMode="cover"
                style={styles.backIcon}
            />
        </TouchableOpacity>
    );
}

export default BackButton;

const styles = StyleSheet.create({
  backIcon: {
    width: 25,
    height: 25,
  },
});