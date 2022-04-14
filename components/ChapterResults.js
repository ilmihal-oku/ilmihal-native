import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ChapterResults = ({ chapterResults, query, navigation, highlightSearchTerm }) => {
  const [showResults, setShowResults] = useState(false);

  function Item({ item, navigate }) {
    return (
      <TouchableOpacity style={styles.chapterTitle} onPress={() => navigate("Chapter", { item })}>
        <Text>{highlightSearchTerm(item.title, query)}</Text>
      </TouchableOpacity>
    );
  }

  const iconName = showResults ? "md-chevron-down" : "md-chevron-forward";

  return (
    <>
      {chapterResults.length > 0 ? (
        <TouchableWithoutFeedback
          style={styles.separator}
          onPress={() => setShowResults(!showResults)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {chapterResults.length > 0
              ? `${chapterResults.length} ana başlıkta bulundu`
              : `hiçbir başlıkta bulunamadı`}
          </Text>
          <Ionicons name={iconName} size={20} style={{ color: "white", marginRight: 10 }} />
        </TouchableWithoutFeedback>
      ) : null}
      {chapterResults &&
        showResults &&
        chapterResults.map((item) => (
          <Item key={item.id} item={item} navigate={navigation.navigate} />
        ))}
    </>
  );
};

export default ChapterResults;
