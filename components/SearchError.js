import React, { useState } from "react";
import { Text, Keyboard } from "react-native";
import {
  Content,
  Form,
  Button,
  Item,
  Input,
  List,
  ListItem,
  Separator,
  Body,
  Right
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import SearchForm from "./SearchForm";

const SearchError = ({ message }) => {
  return (
    <ListItem>
      <Body>
        <Text style={{ color: "crimson", fontSize: 16 }}>{message}</Text>
      </Body>
      <Right>
        <Icon name="md-alert" style={{ fontSize: 26, color: "crimson" }} />
      </Right>
    </ListItem>
  );
};
export default SearchError;
