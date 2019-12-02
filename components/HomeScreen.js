import React from "react";
import { Text } from "react-native";
import { Content, List, ListItem, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import { book as ilmihal } from "../newSource";

const HomeScreen = props => {
  return (
    <Content style={{ backgroundColor: "antiquewhite" }}>
      <List>
        {ilmihal.map((item, index) => (
          <ListItem
            key={index}
            onPress={() =>
              props.navigation.navigate("Chapter", {
                chapterTitle: item.chapterTitle,
                chapterContent: item.chapterContent
              })
            }
          >
            <Body>
              <Text style={{ fontSize: 18 }}>{item.chapterTitle}</Text>
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

HomeScreen.navigationOptions = {
  headerTitle: () => (
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>İçindekiler</Text>
  )
  // ,
  // headerRight: () => (
  //   <Icon
  //     name="ios-information-circle-outline"
  //     style={{ paddingRight: 15, fontSize: 26 }}
  //   />
  // )
};

export default HomeScreen;
