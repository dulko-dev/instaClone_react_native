import React, { useEffect, useState } from "react";
import { View, RefreshControl, Image, FlatList } from "react-native";
import firebase from "firebase";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Main() {
  const [image, setImage] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getSampleImage = async () => {
    const imageRef = await firebase
      .storage()
      .ref()
      .child(`image/${firebase.auth().currentUser.uid}`)
      .listAll();
    const urls = await Promise.all(
      imageRef.items.map((pic) =>
        pic.getDownloadURL().then((el) => {
          return el;
        })
      )
    );
    setImage(urls);
  };

  useEffect(() => {
    getSampleImage();
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={image}
      keyExtractor={() => (Math.random() * 1000).toString()}
      renderItem={({ item }) => {
        return (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: item }} style={{ width: 300, height: 300 }} />
          </View>
        );
      }}
    />
  );
}

export default Main;
