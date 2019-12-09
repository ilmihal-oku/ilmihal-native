import React, { useState } from "react";
import { View, Text } from "react-native";
import { Content, Button, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { book as ilmihal } from "../newSource";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ results: [], count: null });

  console.log({ results });

  console.log(ilmihal);
  const onSearchInputChange = value => {
    console.log(value);
    setSearchTerm(value);
  };

  const searchSectionTitles = term => {};

  const searchSectionContent = term => {};

  const onSearchButtonPress = () => {
    const searchresults = ilmihal
      .filter(chapter =>
        chapter.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(chapter => chapter.chapterTitle);

    setResults({ results: [...searchresults], count: searchresults.length });
  };
  return (
    <>
      <Item>
        <Icon
          name="ios-search"
          style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10 }}
        />
        <Input
          onChangeText={term => onSearchInputChange(term)}
          value={searchTerm}
          autoFocus
          placeholder="Aranacak ifade"
        />
      </Item>
      <Button onPress={onSearchButtonPress} dark style={{ borderRadius: 0 }}>
        <Text
          style={{
            color: "white",
            width: "100%",
            textAlign: "center",
            fontSize: 16
          }}
        >
          Ara
        </Text>
      </Button>
      <Content
        style={{
          backgroundColor: "antiquewhite",
          padding: 10
        }}
      >
        <Text>Arama Sonuclari</Text>
        <View>
          <Text>
            {results.count && results.count > 0
              ? `${results.count} sonuc bulundu`
              : results.count === 0
              ? "sonuc bulunamadi"
              : null}
          </Text>
          {results.results.map((item, index) => (
            <View key={index}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </Content>
    </>
  );
};

export default SearchScreen;
