import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ContentResults = ({ contentResults, query, navigation, highlightSearchTerm }) => {
  const [showResults, setShowResults] = useState(false);

  const toggleShowResults = () => {
    setShowResults(!showResults);
  };

  const iconName = showResults ? "md-chevron-down" : "md-chevron-forward";

  return (
    <>
      {contentResults.length > 0 ? (
        <TouchableWithoutFeedback style={styles.separator} onPress={toggleShowResults}>
          <Text style={{ color: "white", fontSize: 16 }}>
            {contentResults.length > 0
              ? `${contentResults.length} yazıda bulundu`
              : `hiçbir yazıda bulunamadı`}
          </Text>
          <Ionicons name={iconName} size={20} style={{ color: "white", marginRight: 10 }} />
        </TouchableWithoutFeedback>
      ) : null}
      {contentResults &&
        showResults &&
        contentResults.map((item, index) => {
          const totalParagraph = item.sectionContent
            .reduce((total, p) => (total += p), "")
            .toLowerCase();

          const extraChar = 60;

          const firstInstance = totalParagraph.indexOf(query.toLowerCase());

          const startExcerpt = firstInstance > extraChar ? firstInstance - extraChar : 0;

          const excerpt = totalParagraph.substr(startExcerpt, extraChar * 2) + "...";
          return (
            <TouchableOpacity
              style={styles.searchResultContent}
              key={"content" + index}
              onPress={() => navigation.navigate("SearchSection", { item })}
            >
              <Text>{highlightSearchTerm(excerpt, query)}</Text>
            </TouchableOpacity>
          );
        })}
    </>
  );
};

export default ContentResults;
