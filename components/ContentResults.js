import React from "react";
import { Text } from "react-native";
import { ListItem, Separator, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const ContentResults = ({
  contentResults,
  query,
  navigation,
  highlightSearchTerm
}) => {
  return (
    <>
      {contentResults.length > 0 ? (
        <Separator style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <Text style={{ color: "white" }}>
            {contentResults.length > 0
              ? `${contentResults.length} yazıda bulundu`
              : `hiçbir yazıda bulunamadı`}
          </Text>
        </Separator>
      ) : null}
      {contentResults &&
        contentResults.map((item, index) => {
          const totalParagraph = item.sectionContent
            .reduce((total, p) => (total += p), "")
            .toLowerCase();

          const extraChar = 60;

          const firstInstance = totalParagraph.indexOf(query.toLowerCase());

          const startExcerpt =
            firstInstance > extraChar ? firstInstance - extraChar : 0;

          const excerpt = totalParagraph.substr(startExcerpt, extraChar * 2);

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
                <Text>{highlightSearchTerm(excerpt, query)}</Text>
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

export default ContentResults;
