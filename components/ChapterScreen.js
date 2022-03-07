import React from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";

import { book as ilmihal } from "../source";
import styles from "../styles";

function Item({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.sectionTitle}
      onPress={() => navigate("Section", { item })}
    >
      <Text style={styles.sectionTitleText}>{item.sectionTitle}</Text>
    </TouchableOpacity>
  );
}

const ChapterScreen = (props) => {
  const { id } = props.route.params.item;
  const { chapterTitle, chapterContent } = ilmihal.find(
    (chapter) => chapter.id === id
  );

  return (
    <SafeAreaView style={styles.appWrapper}>
      <FlatList
        data={chapterContent}
        renderItem={({ item }) => (
          <Item
            item={{ ...item, chapterTitle }}
            navigate={props.navigation.navigate}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default ChapterScreen;
