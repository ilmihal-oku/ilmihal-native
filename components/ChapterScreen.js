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
  const { id } = props.navigation.state.params.item;
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

ChapterScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <Text style={styles.sectionsHeaderTitle}>
        {navigation.state.params.item.title}
      </Text>
    ),
    //     ,
    //     headerRight: () => (
    //       <Icon
    //         name="ios-information-circle-outline"
    //         style={{ paddingRight: 15, fontSize: 26 }}
    //       />
    //     )
  };
};

export default ChapterScreen;
