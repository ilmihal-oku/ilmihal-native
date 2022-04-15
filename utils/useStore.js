import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookmarkContext } from "../bookmarkContext";

const useStore = () => {
  const { store, updateStore } = React.useContext(BookmarkContext);

  React.useEffect(() => {
    AsyncStorage.getItem("@Favoriler").then((data) => updateStore(JSON.parse(data)));
  }, []);

  const getData = (key) => {
    return store?.[key];
  };

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

  const addToBookmarks = (p, sectionTitle) => {
    const isInStore = inStore(sectionTitle, p);
    if (!isInStore) {
      storeData(sectionTitle, p);
    } else {
      removeData(sectionTitle, p);
    }
  };

  return { getData, storeData, removeData, inStore, addToBookmarks };
};

export default useStore;
