import React from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";

import { book as ilmihal } from "../source";
import styles from "../styles";

function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.chapterTitle} onPress={() => navigate("Chapter", { item })}>
      <Text style={styles.chapterTitleText}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const HomeScreen = ({ navigation }) => {
  const chapters = ilmihal.map(({ chapterTitle: title, id }) => {
    return { title, id };
  });
  const renderItem = ({ item }) => <Item item={item} navigate={navigation.navigate} />;
  const keyExtractor = (item) => String(item.id);
  return (
    <SafeAreaView style={styles.appWrapper}>
      <FlatList data={chapters} renderItem={renderItem} keyExtractor={keyExtractor} />
    </SafeAreaView>
  );
};

export default HomeScreen;
