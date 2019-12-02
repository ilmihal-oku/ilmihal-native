import React from "react";
import { Text } from "react-native";
import { Content } from "native-base";
import { book as ilmihal } from "../newSource";

const RandomScreen = () => {
  let totalChapters = () => ilmihal.length - 1;
  let totalSections = id => ilmihal[id].chapterContent.length - 1;

  let randomChapter = Math.round(Math.random() * totalChapters());
  let randomSection = Math.round(Math.random() * totalSections(randomChapter));

  let { sectionTitle, sectionContent } = ilmihal[randomChapter].chapterContent[
    randomSection
  ];

  pageTitle = ilmihal[randomChapter].chapterTitle;

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

RandomScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{pageTitle}</Text>
    )
  };
};

export default RandomScreen;
