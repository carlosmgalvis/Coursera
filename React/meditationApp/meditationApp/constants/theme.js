import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const COLORS = {
    primary: "#312651",
    secondary: "#444262",
    tertiary: "#FF7754",
    gray: "#83829A",
    gray2: "#C1C0C8",
    white: "#F3F4F8",
    lightWhite: "#FAFAFC",
    darkBackground: "#000000",
  lightText: "#000000",
  darkText: "#FFFFFF",
  };
  const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
  };
  const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };
  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20, // space from top of screen
    backgroundColor: '#F9F9F9',
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20, // space from top of screen
    backgroundColor: '#000000ff',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 10,
  },
  textInput: {
    borderColor: 'transparent',
    backgroundColor: '#F3F9D0',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  button: {
    backgroundColor: '#7DECD6',
    padding: 4,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: '35%',
  },
  buttonText: { 
    color: "#2451E8",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 4,
  },
  logIn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  rightAlignContainer: {
    alignItems: 'flex-end', // Aligns children (button + link) to the right
  },
  forgotText: {
    color: '#3827EF',
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.6,
    paddingTop: 10,
  },
  linkWords: {
    color: '#2F5FFF',
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  textQuestions: {
    color: '#000000',
    fontSize: 18,
  },
  btn: (isDarkMode) => ({
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100vw', 
    backgroundColor: isDarkMode ? COLORS.darkBackground : "#F9F9F9",
  }),
  image: {
    width: 80, 
    height: 80,
    resizeMode: 'contain',
    backgroundColor: COLORS.lightWhite,
  },
  settingIconImage: {
    width: 55, 
    height: 55,
    resizeMode: 'contain',
    backgroundColor: COLORS.lightWhite,
  },
  shareIconImage: {
    width: 55, 
    height: 55,
    resizeMode: 'contain',
    opacity: 0.3,
  },
  btnContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 28,
    color: '#57BCA8',
  },
  welcomeMessage: {
    fontSize: 22,
    color: '#57BCA8',
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  welcomeMessageContainer: (isDarkMode) => ({
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 8, // space from top of screen
    backgroundColor: isDarkMode ? '#010000ff' : '#F9F9F9',
  }),
  popularContainer: (selectedMeditation, item) => ({
      width: 270,
      padding: 5,
      marginHorizontal: 5,
      marginTop: 2, 
      backgroundColor: selectedMeditation === item.id ? COLORS.primary : "#FFF",
      borderRadius: SIZES.medium,
      justifyContent: "space-between",
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
    }),
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontWeight: "bold",
      fontSize: 22,
      color: '#57BCA8',
    },
    headerBtn: {
      fontSize: SIZES.medium,
      fontFamily: FONT.medium,
      color: COLORS.gray,
    },
    cardsContainer: {
      marginTop: SIZES.medium,
    },
    logoContainer: (selectedMeditation, item) => ({
      width: "100%",
      height: 140,
      borderRadius: SIZES.medium,
      justifyContent: "center",
      alignItems: "center",
    }),
    logoImage: {
      width: 250,
      height: 140,
      borderRadius: SIZES.medium,
    },
    tabsContainer: {
      paddingVertical: SIZES.small / 2,
      paddingHorizontal: 2,
      marginTop: 3,
      width: '100%',
    },
    companyName: {
      fontSize: 16,
      fontFamily: FONT.regular,
      color: "#000706",
      marginTop: 7,
      paddingVertical: 2,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS.gray2,
      opacity: 0.5,
    },
    infoContainer: {
      marginTop: 3,
      alignItems: "center",
    },
    meditationName: (selectedMeditation, item) => ({
      fontSize: 20,
      fontWeight: "bold",
      color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
    }),
    infoWrapper: {
      flexDirection: "row",
      marginTop: 5,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    publisher: (selectedMeditation, item) => ({
      fontSize: 16,
      fontFamily: FONT.regular,
      color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
      textAlign: "center",
    }),
    location: {
      fontSize: SIZES.medium - 2,
      fontFamily: FONT.regular,
      color: "#000706",
      marginTop: SIZES.small,
      opacity: 0.5,
    },
    textContainer: {
      flex: 1,
      marginHorizontal: SIZES.medium,
      marginTop: SIZES.medium,
    },
    dailyMeditationName: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS.primary,
    },
    dailyMeditationCardsContainer: {
      marginTop: SIZES.medium,
      gap: SIZES.small, 
      paddingHorizontal: 16, 
      paddingVertical: 10
    },
    dailyMeditationCardContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: SIZES.small,
      backgroundColor: "#FFF",
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
      width: screenWidth * 0.9,
    },
    dailyMeditationLogoImage: {
      width: '100%',
      height: 180,
      borderRadius: SIZES.medium,
    },
    profileMenuView : { 
          flexDirection: "row", justifyContent: "space-between", 
          alignItems: "center", marginBottom: 10,
          padding: SIZES.medium,
          borderRadius: SIZES.small,
          backgroundColor: "#E0FDF9",
          ...SHADOWS.medium, 
    },
    profileMenuItemName : {
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    profileModificationButton: {
      backgroundColor: '#2e05a8ff',
      padding: 2,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      width: '18%',
    },
    profileModificationButtonText: { 
      color: "#f5f53cff",
      fontWeight: "bold",
      fontSize: 14,
      paddingBottom: 4,
    },
});
  
  export { COLORS, FONT, SIZES, SHADOWS, AppStyles };
  