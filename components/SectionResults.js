import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles";

const SectionResults = ({ sectionResults, query, navigation, highlightSearchTerm }) => {
  const [showResults, setShowResults] = useState(false);

  const toggleShowResults = () => setShowResults(!showResults);

  const iconName = showResults ? "chevron-down" : "chevron-forward";

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
