import React from "react";
import { Text } from "react-native";
import { Form, Button, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const SearchForm = ({ search, setSearch, term, onSearchButtonPress }) => {
  return (
    <Form>
      <Item>
        <Icon
          name="ios-search"
          style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10 }}
        />
        <Input
          onChangeText={term => setSearch({ ...search, term: term })}
          value={term}
          placeholder="Aranacak ifade"
        />
        {term.length > 0 ? (
          <Icon
            name="ios-close-circle-outline"
            color="grey"
            onPress={() => setSearch({ ...search, term: "" })}
            style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10 }}
          />
        ) : null}
      </Item>
      <Button
        onPress={() => onSearchButtonPress()}
        dark
        large
        style={{ borderRadius: 0 }}
      >
        <Text
          style={{
            color: "white",
            width: "100%",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          Ara
        </Text>
      </Button>
    </Form>
  );
};

export default SearchForm;
