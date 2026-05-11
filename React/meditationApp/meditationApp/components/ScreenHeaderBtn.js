import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native"; // You might want to use "react-native" instead if this is not web-based.
import { COLORS, SIZES, AppStyles } from "../constants/theme";
import icons from "../constants/icons";
import {  useRouter } from "expo-router";

const ScreenHeaderBtn = ({detailPage, handleShare, isDarkMode}) => {
    console.log(detailPage);
    const router=useRouter();
    return (
        <>
            <View style={AppStyles.btn(isDarkMode)}>
                <TouchableOpacity style={AppStyles.btnContainer} onPress={()=>router.push('/home')}>
                    <Image source={icons.menu} style={AppStyles.image} />
                </TouchableOpacity>

                {detailPage?
                <>
                    <TouchableOpacity style={AppStyles.btnContainer} onPress={handleShare}>
                        <Image source={icons.share} style={AppStyles.shareIconImage} />
                    </TouchableOpacity>
                </>  
                :
                <>
                    <TouchableOpacity style={AppStyles.btnContainer} onPress={()=>router.push("/settings")}>
                        <Image source={icons.settings} style={AppStyles.settingIconImage} />
                    </TouchableOpacity>
                </>
                }
            </View>
        </>
    );
};

export default ScreenHeaderBtn;