import React from "react";
import { Text } from "react-native";
import { Content, List, ListItem, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const ChapterScreen = props => {
  const { chapterTitle, chapterContent } = props.navigation.state.params;

  return (
    <Content style={{ backgroundColor: "antiquewhite" }}>
      <List>
        {chapterContent.map((item, index) => (
          <ListItem
            key={index}
            onPress={() =>
              props.navigation.navigate("Section", {
                chapterTitle: chapterTitle,
                sectionTitle: item.sectionTitle,
                sectionContent: item.sectionContent
              })
            }
          >
            <Body>
              <Text style={{ fontSize: 18 }}>{item.sectionTitle}</Text>
            </Body>
            <Right>
              <Icon name="ios-arrow-dropright" style={{ fontSize: 20 }} />
            </Right>
          </ListItem>
        ))}
      </List>
    </Content>
  );
};

ChapterScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {navigation.getParam("chapterTitle")}
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

export default ChapterScreen;
