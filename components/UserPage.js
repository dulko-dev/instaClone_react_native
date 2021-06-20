import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../context";
import firebase from "firebase";

const UserPage = () => {
  const { userName } = useContext(AppContext);
  const [name, setName] = userName;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
      }
    });
  }, [name]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome {name} !!!</Text>
    </View>
  );
};

export default UserPage;
