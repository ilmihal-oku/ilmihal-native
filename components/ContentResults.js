import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const ContentResults = ({ contentResults, query, navigation, highlightSearchTerm }) => {
  return (
    <>
      {contentResults.length > 0 ? (
        <View style={styles.separator}>
          <Text style={{ color: "white" }}>
            {contentResults.length > 0
              ? `${contentResults.length} yazıda bulundu`
              : `hiçbir yazıda bulunamadı`}
          </Text>
        </View>
      ) : null}
      {contentResults &&
        contentResults.map((item, index) => {
          const totalParagraph = item.sectionContent
            .reduce((total, p) => (total += p), "")
            .toLowerCase();

          const extraChar = 60;

          const firstInstance = totalParagraph.indexOf(query.toLowerCase());

          const startExcerpt = firstInstance > extraChar ? firstInstance - extraChar : 0;

          const excerpt = totalParagraph.substr(startExcerpt, extraChar * 2);
          return (
            <TouchableOpacity
              style={styles.searchResultContent}
              key={index}
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
