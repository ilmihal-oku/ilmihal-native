import React from "react";
import { TouchableOpacity, FlatList, View, Text } from "react-native";
import styles from "../styles";

const SectionResults = ({
  sectionResults,
  query,
  navigation,
  highlightSearchTerm,
}) => {
  function Item({ item, navigate }) {
    return (
      <TouchableOpacity
        style={styles.sectionTitle}
        onPress={() => navigate("Section", { item })}
      >
        <Text>{highlightSearchTerm(item.sectionTitle, query)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {sectionResults.length > 0 ? (
        <View style={styles.separator}>
          <Text style={{ color: "white" }}>
            {sectionResults.length > 0
              ? `${sectionResults.length} bölümde bulundu`
              : `hiçbir bölümde bulunamadı`}
          </Text>
        </View>
      ) : null}
      {sectionResults && (
        <FlatList
          data={sectionResults}
          renderItem={({ item }) => (
            <Item item={item} navigate={navigation.navigate} />
          )}
          keyExtractor={(item) => item.sectionTitle}
        />
      )}
    </>
  );
};

export default SectionResults;
