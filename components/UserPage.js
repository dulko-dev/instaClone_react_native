import React, { useContext, useEffect } from "react";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppContext } from "../context";
import firebase from "firebase";
import Main from "./Main";
import LogOut from "./Authorization/LogOut";
import Profile from "./Profile";

const Tab = createMaterialBottomTabNavigator();

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

  const EmptyPage = () => {
    return null;
  };

  return (
    <Tab.Navigator initialRouteName="Home" labeled={false}>
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContent"
        component={EmptyPage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen name="LogOut" component={LogOut} />
    </Tab.Navigator>
  );
};

export default UserPage;
