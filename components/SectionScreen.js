import React from "react";
import { SafeAreaView, Text } from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";

const SectionScreen = (props) => {
  const { sectionTitle, sectionContent } = props.navigation.state.params.item;

  return (
    <SafeAreaView style={styles.appWrapper}>
      <ScrollView>
        <Text style={styles.inlineSectionTitleText}>{sectionTitle}</Text>
        {sectionContent.map((p, i) => (
          <Text key={i} style={styles.sectionText}>
            {p}
          </Text>
        ))}
        <Text>{` `}</Text>
        <Text>{` `}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

SectionScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <Text style={styles.sectionsHeaderTitle}>
        {navigation.state.params.item.chapterTitle || "Arama Sonuçları"}
      </Text>
    ),
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
