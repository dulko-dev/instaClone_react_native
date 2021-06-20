import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    const { email, password } = this.state;
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
