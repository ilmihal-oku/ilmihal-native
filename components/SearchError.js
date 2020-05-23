import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchError = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,192,203,0.3)",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Icon name="md-alert" style={{ fontSize: 30, color: "crimson" }} />
      <Text style={{ color: "crimson", fontSize: 16, paddingLeft: 20 }}>
        {message}
      </Text>
    </View>
  );
};
export default SearchError;
