import React, { useState, useEffect } from "react";
import { View, Button, Image, TextInput, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Add({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    firebase
      .storage()
      .ref()
      .child(`image/${firebase.auth().currentUser.uid}/${title}`)
      .put(blob);

    setDisplay(true);

    setTimeout(() => {
      setDisplay(false);
      navigation.navigate("Home");
    }, 3000);

  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {display && <Text>Your image has been save</Text>}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Text>Enter the name of image</Text>
      <TextInput onChangeText={(title) => setTitle(title)} />
      <Button title="Save" onPress={() => upload()} />
    </View>
  );
}
