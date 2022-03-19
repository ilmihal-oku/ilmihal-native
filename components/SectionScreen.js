import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import SectionItem from "./SectionItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookmarkContext } from "../bookmarkContext";

const SectionScreen = (props) => {
  const { store, updateStore } = React.useContext(BookmarkContext);
  useEffect(() => {
    AsyncStorage.getItem("@Favoriler").then((data) =>
      updateStore(JSON.parse(data))
    );
  }, []);

  const { sectionTitle, sectionContent } = props.route.params.item;

  const getData = (key) => {
    return store?.[key];
  };
  // chapterId, sectionId
  const storeData = async (key, value) => {
    const data = getData(key);
    let newStore;
    if (data) {
      newStore = {
        ...store,
        [key]: data.includes(value) ? data : [...data, value],
      };
      updateStore(newStore);
    } else {
      newStore = { ...store, [key]: [value] };
      updateStore(newStore);
    }
    await AsyncStorage.setItem("@Favoriler", JSON.stringify(newStore));
  };

  const removeData = async (key, value) => {
    const data = getData(key);
    let newKeyValue = data.filter((item) => item !== value);
    if (data) {
      let newStore = { ...store };
      if (!newKeyValue.length) {
        delete newStore[key];
      } else {
        newStore = {
          ...store,
          [key]: newKeyValue,
        };
      }
      updateStore(newStore);
      await AsyncStorage.setItem("@Favoriler", JSON.stringify(newStore));
    }
  };

  const inStore = (key, value) => {
    const data = getData(key);
    if (data) {
      return data.includes(value);
    } 
    return false;
  };

  const addToBookmarks = (p) => {
    const { item } = props.route.params;
    const { sectionTitle } = item;
    const isInStore = inStore(sectionTitle, p);
    if (!isInStore) {
      storeData(sectionTitle, p);
    } else {
      removeData(sectionTitle, p);
    }
  };

  return (
    <SafeAreaView style={styles.appWrapper}>
      <ScrollView>
        <Text style={styles.inlineSectionTitleText}>{sectionTitle}</Text>
        {sectionContent.map((p, i) => (
          <View key={i}>
            <SectionItem
              p={p}
              addToBookmarks={addToBookmarks}
              inStore={inStore(sectionTitle, p)}
            />
          </View>
        ))}
        <Text>{` `}</Text>
        <Text>{` `}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SectionScreen;
