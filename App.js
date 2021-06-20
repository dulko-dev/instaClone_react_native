import React, { useState, useEffect } from "react";
import config from "./config";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMNT_ID,
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider } from "./context";
import Landing from "./components/Authorization/Landing";
import Register from "./components/Authorization/Register";
import Login from "./components/Authorization/Login";
import UserPage from "./components/UserPage";

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoaded(true);
      }
    });
  }, [loaded]);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          {loaded ? (
            <>
              <Stack.Screen name="userPage" component={UserPage} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Landing"
                component={Landing}
                options={{ headerShow: false }}
              />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
