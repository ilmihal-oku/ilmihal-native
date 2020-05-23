import React from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";

import { book as ilmihal } from "../source";
import styles from "../styles";

function Item({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.chapterTitle}
      onPress={() => navigate("Chapter", { item })}
    >
      <Text style={styles.chapterTitleText}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const HomeScreen = (props) => {
  const chapters = ilmihal.map(({ chapterTitle: title, id }) => {
    return { title, id };
  });

  return (
    <SafeAreaView style={styles.appWrapper}>
      <FlatList
        data={chapters}
        renderItem={({ item }) => (
          <Item item={item} navigate={props.navigation.navigate} />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: () => <Text style={styles.headerTitle}>İçindekiler</Text>,
  // ,
  // headerRight: () => (
  //   <Icon
  //     name="ios-information-circle-outline"
  //     style={{ paddingRight: 15, fontSize: 26 }}
  //   />
  // )
};

export default HomeScreen;
