import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SectionResults = ({ sectionResults, query, navigation, highlightSearchTerm }) => {
  const [showResults, setShowResults] = useState(false);

  const toggleShowResults = () => setShowResults(!showResults);

  const iconName = showResults ? "md-chevron-down" : "md-chevron-forward";

  function Item({ item, navigate }) {
    return (
      <TouchableOpacity
        style={styles.sectionTitle}
        onPress={() => navigate("SearchSection", { item })}
      >
        <Text>{highlightSearchTerm(item.sectionTitle, query)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {sectionResults.length > 0 ? (
        <TouchableWithoutFeedback style={styles.separator} onPress={toggleShowResults}>
          <Text style={{ color: "white", fontSize: 16 }}>
            {sectionResults.length > 0
              ? `${sectionResults.length} bölümde bulundu`
              : `hiçbir bölümde bulunamadı`}
          </Text>
          <Ionicons name={iconName} size={20} style={{ color: "white", marginRight: 10 }} />
        </TouchableWithoutFeedback>
      ) : null}
      {sectionResults &&
        showResults &&
        sectionResults.map((item) => (
          <Item key={item.sectionTitle} item={item} navigate={navigation.navigate} />
        ))}
    </>
  );
};

export default SectionResults;
