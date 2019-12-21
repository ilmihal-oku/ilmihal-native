import React from "react";
import { Text } from "react-native";
import { Content } from "native-base";
// import Icon from "react-native-vector-icons/Ionicons";

const SectionScreen = props => {
  const { sectionTitle, sectionContent } = props.navigation.state.params;
  console.log("Section content", props);

  return (
    <Content
      style={{
        backgroundColor: "antiquewhite",
        padding: 10
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        {sectionTitle}
      </Text>
      {sectionContent.map((p, index) => (
        <Text
          key={index}
          style={{
            fontSize: 18,
            lineHeight: 27,
            paddingTop: 7,
            paddingBottom: 7
          }}
        >
          {p}
        </Text>
      ))}
      <Text>{` `}</Text>
      <Text>{` `}</Text>
    </Content>
  );
};

SectionScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {navigation.getParam("chapterTitle") || "Arama Sonuçları"}
      </Text>
    )
    //     ,
    //     headerRight: () => (
    //       <Icon
    //         name="ios-information-circle-outline"
    //         style={{ paddingRight: 15, fontSize: 26 }}
    //       />
    //     )
  };
};

export default SectionScreen;
