import React, { useState } from "react";
import { Platform, View, Image } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./NewSocialScreen.styles";

import { getApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { SocialModel } from "../../../models/social";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFileObjectAsync, uuid } from "../../../Utils";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewSocialScreen">;
}

export default function NewSocialScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDismissSnackbar = () => setSnackbarVisible(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveEvent = async () => {
    if (!name || !description || !date || !image) {
      setSnackbarVisible(true);
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const db = getFirestore();
      const storage = getStorage(getApp());
      const storageRef = ref(storage, uuid() + ".jpg");
      const result = await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(result.ref);

      const socialDoc: SocialModel = {
        eventName: name,
        eventDate: date.getTime(),
        eventLocation: location,
        eventDescription: description,
        eventImage: downloadURL,
      };

      await addDoc(collection(db, "socials"), socialDoc);
      navigation.navigate("ConfirmationScreen");
    } catch (e) {
      console.log("Error while writing social:", e);
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="Socials" />
      </Appbar.Header>
    );    
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        <TextInput
          label="Event Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={{ backgroundColor: '#f0f0f0', color: 'blue' }}  
          theme={{ colors: { text: '#B6BBC4', primary: 'blue' } }}   
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          mode="outlined"
          style={{ backgroundColor: '#f0f0f0', color: 'blue' }} 
          theme={{ colors: { text: '#B6BBC4', primary: 'blue' } }}  
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          mode="outlined"
          style={{ backgroundColor: '#f0f0f0', color: 'blue' }}  
          theme={{ colors: { text: '#B6BBC4', primary: 'blue' } }}   
        />
        <Button onPress={showDatePicker}>
          {date ? date.toDateString() : "Pick a date"}
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Button onPress={pickImage}>
          {image ? "Change Image" : "Pick an Image"}
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button onPress={saveEvent} loading={loading}>
          Create Event
        </Button>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleDismissSnackbar}
          duration={3000}
        >
          Please fill out all the fields
        </Snackbar>
      </View>
    </>
  );
}