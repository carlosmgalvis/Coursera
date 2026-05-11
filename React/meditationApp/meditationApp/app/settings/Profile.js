import React, { useState, useEffect } from "react";
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
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS, AppStyles, SIZES } from "../../constants";
import { delay } from "../../utils/delay";
import { emailRegex, passwordRegex } from "../../constants/stringVal";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import BackButton from "../../components/BackButton";


const Profile = () => {
    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");

    const modifyUserDetails = async(fieldName, fieldVal) => {
        var allUsersDetails = await AsyncStorage.getItem("allUsersDetails");
        if (allUsersDetails) {
            allUsersDetails = JSON.parse(allUsersDetails);
            if(fieldName && fieldVal && fieldName !== '' && fieldVal !== ''){
                allUsersDetails = allUsersDetails.map(item => (
                    item.email === currentUserDetails.email && item.password === currentUserDetails.password)
                    ? { ...item, [fieldName]: fieldVal }
                    : item);
                setCurrentUserDetails(prev => ({ ...prev, [fieldName]: fieldVal }));
            }
            await AsyncStorage.setItem("allUsersDetails", JSON.stringify(allUsersDetails));
        }
    }

    const handleToggle = (field) => {
        if (isEditing) {
        // 👉 You can also trigger an API call here to save the updated username
            if(field === 'userName'){
                modifyUserDetails('userName', userName);
                console.log("Saved username : ", userName);
            } else if (field === 'password'){
                modifyUserDetails('password', password);
                console.log("Saved password : ******");
            } else if (field === 'age'){
                modifyUserDetails('age', age);
                console.log("Saved age : ", age);
            } else if (field === 'name'){
                modifyUserDetails('name', name);
                console.log("Saved Name : ", name);
            } else if (field === 'country'){
                modifyUserDetails('country', country);
                console.log("Saved Country : ", country);
            }
        }
        setIsEditing(!isEditing);
    };

    useEffect(() => {
      const checkLoginState = async () => {
        try {
          const data = await AsyncStorage.getItem("currentUserDetails");
          if(data){
            var dataObj = JSON.parse(data);
            setCurrentUserDetails(dataObj);
            setUserName(dataObj.userName);
            setName(dataObj.name);
            setAge(dataObj.age);
            setCountry(dataObj.country);
            console.log("current Username after useEffect in Profile.js : ", userName);
          }
        } catch (error) {
          console.error("Error checking login state:", error);
        //   await AsyncStorage.clear();
          router.push("/login");
          return;
        }
      };
      checkLoginState();
    }, []);

    return (
        <>
                <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightWhite, }}>
                    <ScreenHeaderBtn currentUserDetails={JSON.stringify(currentUserDetails)} />
                    <View
                        style={{
                            flex: 1,
                            padding: 10,
                        }}
                        testID="screensDisplay"
                    >
                        <BackButton/>
                        <Text style={AppStyles.userName}>{userName}'s Profile</Text>
                        <View style={{ marginTop: 30 }} testID="formData">
                            <View style={AppStyles.profileMenuView} testID="userName"
                            >
                                {isEditing 
                                    ? 
                                    (
                                        <TextInput style={AppStyles.textInput} value={userName}
                                            onChangeText={setUserName} placeholder={userName}
                                        />
                                    ) : (
                                        <View style={AppStyles.profileMenuItemName}>
                                            <Text style={{fontWeight : 'bold', fontSize : 16}}>Username : </Text>
                                            <Text>{userName}</Text>
                                        </View>
                                    )
                                }
                                <TouchableOpacity onPress={() => handleToggle('userName')}
                                    style={AppStyles.profileModificationButton} >
                                    <Text style={AppStyles.profileModificationButtonText}>{isEditing ? "Save" : "Modify"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={AppStyles.profileMenuView} testID="password"
                            >
                                {isEditing 
                                    ? 
                                    (
                                        <TextInput style={AppStyles.textInput} value={password}
                                            onChangeText={setPassword} placeholder={'*****'} secureTextEntry={true}
                                        />
                                    ) : (
                                        <View style={AppStyles.profileMenuItemName}>
                                            <Text style={{fontWeight : 'bold', fontSize : 16}}>Password : </Text>
                                            <Text>*********</Text>
                                        </View>
                                    )
                                }
                                <TouchableOpacity style={AppStyles.profileModificationButton} 
                                    onPress={() => handleToggle('password')} >
                                    <Text style={AppStyles.profileModificationButtonText}>{isEditing ? "Save" : "Modify"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={AppStyles.profileMenuView} testID="name"
                            >
                                {isEditing 
                                    ? 
                                    (
                                        <TextInput style={AppStyles.textInput} value={name}
                                            onChangeText={setName} placeholder={name}
                                        />
                                    ) : (
                                        <View style={AppStyles.profileMenuItemName}>
                                            <Text style={{fontWeight : 'bold', fontSize : 16}}>Name : </Text>
                                            <Text>{name}</Text>
                                        </View>
                                    )
                                }
                                <TouchableOpacity style={AppStyles.profileModificationButton} 
                                    onPress={() => handleToggle('name')} >
                                    <Text style={AppStyles.profileModificationButtonText}>{isEditing ? "Save" : "Modify"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={AppStyles.profileMenuView} testID="age"
                            >
                                {isEditing 
                                    ? 
                                    (
                                        <TextInput style={AppStyles.textInput} value={age}
                                            onChangeText={setAge} placeholder={age}
                                        />
                                    ) : (
                                        <View style={AppStyles.profileMenuItemName}>
                                            <Text style={{fontWeight : 'bold', fontSize : 16}}>Age : </Text>
                                            <Text>{age}</Text>
                                        </View>
                                    )
                                }
                                <TouchableOpacity style={AppStyles.profileModificationButton} 
                                    onPress={() => handleToggle('age')} >
                                    <Text style={AppStyles.profileModificationButtonText}>{isEditing ? "Save" : "Modify"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={AppStyles.profileMenuView} testID="country"
                            >
                                {isEditing 
                                    ? 
                                    (
                                        <TextInput style={AppStyles.textInput} value={country}
                                            onChangeText={setCountry} placeholder={country}
                                        />
                                    ) : (
                                        <View style={AppStyles.profileMenuItemName}>
                                            <Text style={{fontWeight : 'bold', fontSize : 16}}>Country : </Text>
                                            <Text>{country}</Text>
                                        </View>
                                    )
                                }
                                <TouchableOpacity style={AppStyles.profileModificationButton} 
                                    onPress={() => handleToggle('country')} >
                                    <Text style={AppStyles.profileModificationButtonText}>{isEditing ? "Save" : "Modify"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </>
    );
}

export default Profile;

