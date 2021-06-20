import React, { useContext } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";
import { AppContext } from "../../context";

export const Register = ({navigation}) => {
  const { userName, userEmail, userPass } = useContext(AppContext);
  const [name, setName] = userName;
  const [email, setEmail] = userEmail;
  const [password, setPassword] = userPass;

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        result.user.updateProfile({
          displayName: name,
        });
      });
  };

  return (
    <View>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={() => onSignUp()} />
    </View>
  );
};

export default Register;
