import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles";

const ChapterResults = ({ chapterResults, query, navigation, highlightSearchTerm }) => {
  const [showResults, setShowResults] = useState(false);

  const toggleShowResults = () => setShowResults(!showResults);

  function Item({ item, navigate }) {
    return (
      <TouchableOpacity
        style={styles.chapterTitle}
        onPress={() => navigate("SearchChapter", { item })}
      >
        <Text>{highlightSearchTerm(item.title, query)}</Text>
      </TouchableOpacity>
    );
  }

  const iconName = showResults ? "chevron-down" : "chevron-forward";

  return (
    <>
      {chapterResults.length > 0 ? (
        <TouchableWithoutFeedback style={styles.separator} onPress={toggleShowResults}>
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
