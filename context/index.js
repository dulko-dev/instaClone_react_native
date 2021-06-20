import React, { createContext, useState } from "react";
import { View } from "react-native";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppContext.Provider
      value={{
        userEmail: [email, setEmail],
        userPass: [password, setPassword],
        userName: [name, setName],
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
