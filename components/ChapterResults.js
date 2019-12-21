import React from "react";
import { Text } from "react-native";
import { ListItem, Separator, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const ChapterResults = ({
  chapterResults,
  query,
  navigation,
  highlightSearchTerm
}) => {
  return (
    <>
      {chapterResults.length > 0 ? (
        <Separator style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <Text style={{ color: "white" }}>
            {chapterResults.length > 0
              ? `${chapterResults.length} ana başlıkta bulundu`
              : `hiçbir başlıkta bulunamadı`}
          </Text>
        </Separator>
      ) : null}
      {chapterResults &&
        chapterResults.map((item, index) => {
          return (
            <ListItem
              key={index}
              onPress={() =>
                navigation.navigate("Chapter", {
                  chapterTitle: item.chapterTitle,
                  chapterContent: item.chapterContent
                })
              }
            >
              <Body>
                <Text>{highlightSearchTerm(item.chapterTitle, query)}</Text>
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

export default ChapterResults;
