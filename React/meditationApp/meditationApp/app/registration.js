import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { COLORS, icons, SHADOWS, AppStyles } from "../constants";

const SignUp = () => {
    const { userName, email, password } = useLocalSearchParams();
    const [name, setName] = useState("");
    let [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const router = useRouter();
    const [regError, setRegError] = useState("");

    const handleRegistration = async () => {
        if (!name || !sex || !age || !country) {
            setRegError("Please fill in all fields");
            return;
        }
        if(!/^[0-9]+$/.test(age)){
            setRegError("Invalid age. Please enter a valid number.");
            return;
        }

        if(sex.startsWith('M') || sex.startsWith('m')){
            sex = 'Male';
        } else if(sex.startsWith('F') || sex.startsWith('f')){
            sex = 'Female';
        } else if(sex.startsWith('T') || sex.startsWith('t')){
            sex = 'Transgender';
        } else if(sex.startsWith('S') || sex.startsWith('s')){
            sex = 'Shemale';
        } else {
            sex = 'Unknown';
        }

        try {
            const userData = {
                userName: userName,
                email: email,
                password: password,
                name: name,
                sex: sex,
                age: age,
                country: country
            };

            var allUsersDetails = await AsyncStorage.getItem("allUsersDetails");
            allUsersDetails = allUsersDetails ? JSON.parse(allUsersDetails) : [];
            allUsersDetails = [...allUsersDetails, userData];
            await AsyncStorage.setItem("allUsersDetails", JSON.stringify(allUsersDetails));
            Alert.alert("Registration successful");
            router.push("/login");
        } catch (error) {
            setRegError("Registration failed");
            console.error("Registration error:", error);
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
            <View style={{ padding: 20 }} testID="registrationContainer">
                <View
                    style={AppStyles.container}
                    testID="imageIcon"
                    >
                    <Image
                        source={icons.menu}
                        style={AppStyles.logo}
                    />
                </View>
                <View style={{ marginTop: 10 }} testID="formData">
                    <View style={{ marginBottom: 10 }} testID="name">
                        <TextInput
                            style={AppStyles.textInput}
                            value={name}
                            placeholder="Name"
                            onChangeText={setName}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }} testID="name">
                        <TextInput
                            style={AppStyles.textInput}
                            value={sex}
                            placeholder="Sex"
                            onChangeText={setSex}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }} testID="name">
                        <TextInput
                            style={AppStyles.textInput}
                            value={age}
                            placeholder="Age"
                            onChangeText={setAge}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }} testID="name">
                        <TextInput
                            style={AppStyles.textInput}
                            value={country}
                            placeholder="Country"
                            onChangeText={setCountry}
                        />
                    </View>
                    {regError ? <Text style={AppStyles.error}>{regError}</Text> : null}
                    <View style={AppStyles.rightAlignContainer}>
                        <TouchableOpacity
                            style={AppStyles.button}
                            onPress={handleRegistration}
                        >
                            <Text style={AppStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;