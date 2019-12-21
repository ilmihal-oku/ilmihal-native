import React from "react";
import { Text } from "react-native";
import { Separator } from "native-base";

const SubHeader = ({ message }) => {
  return (
    <Separator style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        {message}
      </Text>
    </Separator>
  );
};

export default SubHeader;
