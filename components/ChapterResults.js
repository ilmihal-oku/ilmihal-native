import React from "react";
import { TouchableOpacity, FlatList, View, Text } from "react-native";
import styles from "../styles";

const ChapterResults = ({ chapterResults, query, navigation, highlightSearchTerm }) => {
  function Item({ item, navigate }) {
    return (
      <TouchableOpacity style={styles.chapterTitle} onPress={() => navigate("Chapter", { item })}>
        <Text>{highlightSearchTerm(item.title, query)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {chapterResults.length > 0 ? (
        <View style={styles.separator}>
          <Text style={{ color: "white" }}>
            {chapterResults.length > 0
              ? `${chapterResults.length} ana başlıkta bulundu`
              : `hiçbir başlıkta bulunamadı`}
          </Text>
        </View>
      ) : null}
      {chapterResults && (
        <FlatList
          data={chapterResults}
          renderItem={({ item }) => <Item item={item} navigate={navigation.navigate} />}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </>
  );
};

export default ChapterResults;
