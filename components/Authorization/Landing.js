import React from "react";
import { Text, View, Button } from "react-native";
import styles from "./style";

function Landing({ navigation }) {
  const handlerRegister = () => {
    navigation.navigate("Register");
  };
  const handlerLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.content}>
      <Button title="Register" onPress={handlerRegister} />
      <Button title="Login" onPress={handlerLogin} />
    </View>
  );
}

export default Landing;
