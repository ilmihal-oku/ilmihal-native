import React, { useState, useEffect, useMemo } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";
import BookmarkItem from "./BookmarkItem";
import { book } from "../source";
import { BookmarkContext } from "../bookmarkContext";

const BookmarkScreen = (props) => {
  const { store, updateStore } = React.useContext(BookmarkContext);
  const [modalVisibleItem, setModalVisibleItem] = useState(null);

  const toggleModal = (item) => {
    if (item) {
      setModalVisibleItem(item);
    } else {
      setModalVisibleItem(null);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("@Favoriler").then((data) => updateStore(JSON.parse(data)));
  }, []);

  const removeFromBookmarks = (title, p) => {
    const newStore = { ...store };
    const section = newStore[title];
    const index = section.indexOf(p);
    section.splice(index, 1);
    if (section.length === 0) {
      delete newStore[title];
    } else {
      newStore[title] = section;
    }
    AsyncStorage.setItem("@Favoriler", JSON.stringify(newStore));
    updateStore(newStore);
  };

  const bookmarkedItems = useMemo(() => Object.entries(store ?? {}, [store]));

  return (
    <SafeAreaView style={styles.appWrapper}>
      <ScrollView>
        {bookmarkedItems.length ? (
          <>
            <Text style={styles.bookmarkNotification}>
              Favorilerden silmek istediğiniz parağraflara basılı tutun.
            </Text>
            {bookmarkedItems.map(([title, content]) => {
              const item = book
                .find((chapter) =>
                  chapter.chapterContent.find((section) => section.sectionTitle === title)
                )
                .chapterContent.find((section) => section.sectionTitle === title);

              return (
                <View key={title}>
                  {content.map((p, i) => {
                    return (
                      <View key={i}>
                        <BookmarkItem
                          p={p}
                          inStore
                          title={title}
                          item={item}
                          navigation={props.navigation}
                          removeFromBookmarks={removeFromBookmarks}
                          toggleModal={toggleModal}
                          modalVisible={modalVisibleItem === p}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.emptyBookmarksContainer}>
            <Text style={styles.emptyBookmarksTitle}>Favorilerinizde hiçbir şey yok.</Text>
            <Text style={styles.emptyBookmarksMessage}>
              Favorilere eklemek istediğiniz parağraflara hızlıca iki kere dokunun.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

BookmarkScreen.navigationOptions = () => {
  return {
    headerTitle: () => <Text style={styles.headerTitle}>Favoriler</Text>,
  };
};

export default BookmarkScreen;
