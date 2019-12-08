import React from "react";
import { View, Text } from "react-native";
import { Content, Button } from "native-base";
import { book as ilmihal } from "../newSource";
import { StackActions, NavigationActions } from "react-navigation";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Random" })]
});

const RandomScreen = props => {
  console.log("RAndom Screen", props);
  let totalChapters = () => ilmihal.length - 1;
  let totalSections = id => ilmihal[id].chapterContent.length - 1;

  let randomChapter = Math.round(Math.random() * totalChapters());
  let randomSection = Math.round(Math.random() * totalSections(randomChapter));

  let { sectionTitle, sectionContent } = ilmihal[randomChapter].chapterContent[
    randomSection
  ];

  pageTitle = ilmihal[randomChapter].chapterTitle;

  return (
    <>
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
      <View>
        <Button
          dark
          style={{
            borderRadius: 0,
            justifyContent: "center",
            height: 50
          }}
          onPress={() => props.navigation.dispatch(resetAction)}
        >
          <Text style={{ color: "white" }}>
            Yeni Bir Konu Okumak İstiyorum &rarr;
          </Text>
        </Button>
      </View>
    </>
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
