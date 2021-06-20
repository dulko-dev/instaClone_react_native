import React from "react";
import { View, Text, Button, Alert } from "react-native";
import firebase from "firebase";

function LogOut() {
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        return Alert.alert("Success", "You are logOut from account", [
          { val: "ok" },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text>LogOut</Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
}

export default LogOut;
