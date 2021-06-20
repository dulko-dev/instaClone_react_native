import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppContext } from "../context";
import firebase from "firebase";
import Main from "./Main";
import LogOut from './Authorization/LogOut'

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name='LogOut' component={LogOut} />
    </Tab.Navigator>
  );
};

export default UserPage;
