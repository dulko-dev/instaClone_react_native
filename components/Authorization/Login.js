import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <Button title="Login" onPress={() => onSignUp()} />
    </View>
  );
};

export default Login;
