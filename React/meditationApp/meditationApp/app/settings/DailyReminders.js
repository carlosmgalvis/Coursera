import React, { useState, useEffect } from "react";
import {
  View, Text, SafeAreaView, ScrollView, TouchableOpacity,
  Platform, Alert, TextInput, StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, SIZES } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";
import BackButton from "../../components/BackButton";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn'
import { Stack } from "expo-router";

// Configure notifications behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const DailyReminders = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [manualTime, setManualTime] = useState("");

  // Request permissions and setup Android channel
  useEffect(() => {
    requestPermissions();
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    loadReminders();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission not granted", "Please allow notifications to receive reminders.");
    }
  };

  // Load reminders from AsyncStorage
  const loadReminders = async () => {
    const stored = await AsyncStorage.getItem("reminders");
    const parsed = stored ? JSON.parse(stored) : [];
    const futureReminders = parsed.filter(r => new Date(r.triggerDate) > new Date());
    setReminders(futureReminders);
  };

  const handleAddReminder = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const [inputHours, inputMinutes] = manualTime.split(":").map(Number);
    const triggerDate = new Date(selectedDate);

    if (!isNaN(inputHours) && !isNaN(inputMinutes)) {
      triggerDate.setHours(inputHours, inputMinutes, 0, 0);
    } else {
      triggerDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
    }

    if (triggerDate <= new Date()) {
      alert("Please select a future time.");
      return;
    }

    const newReminder = {
      id: Date.now(),
      date: selectedDate,
      time: manualTime || triggerDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      description: `Reminder: Time for your daily task!`,
      triggerDate: triggerDate.toISOString(),
    };

    const updatedReminders = [...reminders, newReminder];
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
    await scheduleNotification(newReminder);
    alert("Reminder added successfully!");
  };

  const scheduleNotification = async (reminder) => {
    const triggerDate = new Date(reminder.triggerDate);

    if (Platform.OS === "web") {
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
      setTimeout(() => {
        new Notification("Reminder", { body: reminder.description });
      }, triggerDate - new Date());
    } else {
      await Notifications.scheduleNotificationAsync({
        content: { title: "Reminder", body: reminder.description },
        trigger: {
          seconds: Math.max((triggerDate.getTime() - Date.now()) / 1000, 1),
          repeats: false,
        },
      });
    }
  };

  const deleteReminder = async (id) => {
    const updatedReminders = reminders.filter(r => r.id !== id);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
  };

  const ReminderItem = ({ item }) => (
    <View style={styles.reminderContainer}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{item.date} - {item.time}</Text>
      <TouchableOpacity onPress={() => deleteReminder(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite }}>
      <Stack.Screen options={{ headerTitle: "Daily Reminders" }} />
      <ScreenHeaderBtn />
      <View style={styles.container}>
        <BackButton />
        <Text style={{
          textAlign: "center",
          color: "#57BCA8",
          fontWeight: "bold",
          fontSize: 22
        }}>Reminders</Text>

        <ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: "#57BCA8" } }}
          />

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              onChange={(event, selected) => {
                setSelectedTime(selected || selectedTime);
                setShowTimePicker(false);
              }}
            />
          )}

          <TextInput
            placeholder="Enter Time (HH:mm)"
            value={manualTime}
            onChangeText={setManualTime}
            keyboardType="numeric"
            maxLength={5}
            style={styles.input}
          />

          <Text style={styles.selected}>Date: {selectedDate || "None"}</Text>
          <Text style={styles.selected}>Time: {manualTime || selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>

          <TouchableOpacity onPress={handleAddReminder} style={styles.button}>
            <Text style={styles.buttonText}>Add Reminder</Text>
          </TouchableOpacity>

          <Text style={styles.reminderHeader}>All Reminders:</Text>
          {reminders.length > 0
            ? reminders.map((rem) => <ReminderItem key={rem.id} item={rem} />)
            : <Text>No reminders yet.</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DailyReminders;

const styles = StyleSheet.create({
  reminderContainer: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.small, padding: SIZES.small, marginVertical: SIZES.small
  },
  description: { color: COLORS.lightWhite, fontWeight: "bold" },
  date: { color: COLORS.darkText, fontSize: SIZES.small },
  input: { borderColor: "#57BCA8", borderWidth: 2, padding: SIZES.small, marginVertical: SIZES.small, borderRadius: 8 },
  selected: { fontSize: SIZES.medium, marginVertical: SIZES.small, color: COLORS.primary },
  button: { backgroundColor: "#57BCA8", padding: SIZES.small - 5, borderRadius: SIZES.small, alignItems: "center" },
  buttonText: { color: "#000000ff", fontSize: 22 },
  deleteButton: { marginTop: SIZES.small, alignSelf: "flex-end" },
  deleteText: { color: "#FE7654", fontWeight: "bold" },
  reminderHeader: { fontSize: SIZES.large, fontWeight: "bold", color: COLORS.primary, marginVertical: SIZES.medium },
  container: {
    marginTop: SIZES.small - 15,
    padding: SIZES.small - 5,
  },
});
