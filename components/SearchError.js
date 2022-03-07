import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(255,192,203,0.3)",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 30,
    color: "crimson",
  },
  text: {
    color: "crimson",
    fontSize: 16,
    paddingLeft: 20,
  },
});

const SearchError = ({ message }) => {
  return (
    <View style={styles.wrapper}>
      <Icon name="md-alert" style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
export default SearchError;
