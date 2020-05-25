import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { book as ilmihal } from "../source";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "../styles";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Random" })],
});

const RandomScreen = (props) => {
  let totalChapters = () => ilmihal.length - 1;
  let totalSections = (id) => ilmihal[id].chapterContent.length - 1;

  let randomChapter = Math.round(Math.random() * totalChapters());
  let randomSection = Math.round(Math.random() * totalSections(randomChapter));

  let { sectionTitle, sectionContent } = ilmihal[randomChapter].chapterContent[
    randomSection
  ];

  pageTitle = ilmihal[randomChapter].chapterTitle;

  return (
    <SafeAreaView style={styles.appWrapper}>
      <ScrollView>
        <Text style={styles.inlineSectionTitleText}>{sectionTitle}</Text>
        {sectionContent.map((p, index) => (
          <Text key={index} style={styles.sectionText}>
            {p}
          </Text>
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

RandomScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <Text style={styles.sectionsHeaderTitle}>{pageTitle}</Text>
    ),
  };
};

export default RandomScreen;
