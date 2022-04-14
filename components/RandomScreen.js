import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { book, book as ilmihal } from "../source";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "../styles";
import { CommonActions } from "@react-navigation/native";
import SectionItem from "./SectionItem";
import useStore from "../utils/useStore";

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "Random" })],
// });

const findRandomSection = () => {
  const randomChapterId = Math.floor(Math.random() * book.length);
  const randomChapter = book[randomChapterId];
  const randomSectionId = Math.floor(Math.random() * randomChapter.chapterContent.length);
  const randomSection = randomChapter.chapterContent[randomSectionId];
  return randomSection;
};

const resetAction = () => {
  const randomSection = findRandomSection();
  return CommonActions.reset({
    index: 1,
    routes: [{ name: "Random", params: { item: randomSection } }],
  });
};

const RandomScreen = (props) => {
  const randomSection = props.route?.params?.item ?? findRandomSection();
  const sectionTitle = randomSection.sectionTitle;

  return (
    <SafeAreaView style={styles.appWrapper}>
      <ScrollView>
        <Text style={styles.inlineSectionTitleText}>{randomSection.sectionTitle}</Text>
        {randomSection.sectionContent.map((p, index) => (
          <SectionItem key={index} p={p} sectionTitle={sectionTitle} />
        ))}
        <Text>{` `}</Text>
        <Text>{` `}</Text>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.randomButton}
          onPress={() => props.navigation.dispatch(resetAction)}
        >
          <Text style={{ ...styles.sectionText, color: "white" }}>
            Yeni Bir Konu Okumak İstiyorum &rarr;
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// RandomScreen.navigationOptions = () => {
//   return {
//     headerTitle: () => (
//       <Text style={styles.sectionsHeaderTitle}>{pageTitle}</Text>
//     ),
//   };
// };

export default RandomScreen;
