import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

const SubHeader = ({ message }) => {
  return (
    <View style={{ height: 40, marginTop: 20 }}>
      <Text style={styles.resultsTitle}>{message}</Text>
    </View>
  );
};

export default SubHeader;
