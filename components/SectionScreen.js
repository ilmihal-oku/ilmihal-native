import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import SectionItem from "./SectionItem";

const SectionScreen = (props) => {
  const { sectionTitle, sectionContent } = props.route.params.item;

  return (
    <SafeAreaView style={styles.appWrapper}>
      <ScrollView>
        <Text style={styles.inlineSectionTitleText}>{sectionTitle}</Text>
        {sectionContent.map((p, i) => (
          <View key={i}>
            <SectionItem p={p} sectionTitle={sectionTitle} />
          </View>
        ))}
        <Text>{` `}</Text>
        <Text>{` `}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SectionScreen;
