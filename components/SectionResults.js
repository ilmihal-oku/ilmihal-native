import React from "react";
import { Text } from "react-native";
import { ListItem, Separator, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const SectionResults = ({
  sectionResults,
  query,
  navigation,
  highlightSearchTerm
}) => {
  return (
    <>
      {sectionResults.length > 0 ? (
        <Separator style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <Text style={{ color: "white" }}>
            {sectionResults.length > 0
              ? `${sectionResults.length} bölümde bulundu`
              : `hiçbir bölümde bulunamadı`}
          </Text>
        </Separator>
      ) : null}
      {sectionResults &&
        sectionResults.map((item, index) => {
          return (
            <ListItem
              key={index}
              onPress={() =>
                navigation.navigate("Section", {
                  sectionTitle: item.sectionTitle,
                  sectionContent: item.sectionContent
                })
              }
            >
              <Body>
                <Text>{highlightSearchTerm(item.sectionTitle, query)}</Text>
              </Body>
              <Right>
                <Icon name="ios-arrow-dropright" style={{ fontSize: 20 }} />
              </Right>
            </ListItem>
          );
        })}
    </>
  );
};

export default SectionResults;
