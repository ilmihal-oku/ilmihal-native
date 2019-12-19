import React, { useState } from "react";
import { Text } from "react-native";
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
import { book as ilmihal } from "../newSource";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState({
    term: "",
    query: "",
    results: [],
    hasEverSearched: false,
    minCharError: false
  });

  const { term, query, results, hasEverSearched, minCharError } = search;

  const onSearchButtonPress = () => {
    if (term.length > 2) {
      navigation.setParams({ clearForm: () => clearForm() });

      const searchresults = ilmihal.filter(chapter =>
        chapter.chapterTitle.toLowerCase().includes(term.toLowerCase())
      );
      setSearch({
        ...search,
        query: term,
        results: [...searchresults],
        hasEverSearched: true,
        minCharError: false
      });
    } else {
      setSearch({ ...search, results: [], minCharError: true });
    }
  };

  const clearForm = () => {
    setSearch({
      term: "",
      query: "",
      results: [],
      hasEverSearched: false,
      minCharError: false
    });
  };

  const highlightSearchTerm = (title, term) => {
    const start = title.toLowerCase().indexOf(term.toLowerCase());
    const end = start + term.length;

    const splitAt = (start, end) => x => [
      x.slice(0, start),
      x.slice(start, end),
      x.slice(end, x.length)
    ];

    const titleArray = splitAt(start, end)(title);

    return (
      <Text>
        {titleArray[0]}
        <Text style={{ backgroundColor: "yellow" }}> {titleArray[1]} </Text>
        {titleArray[2]}
      </Text>
    );
  };

  console.log(search);
  return (
    <>
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
              onPress={() => setSearch({ ...search, term: "", query: "" })}
              style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10 }}
            />
          ) : null}
        </Item>
        <Button
          onPress={() => onSearchButtonPress()}
          dark
          style={{ borderRadius: 0 }}
        >
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
      </Form>
      <Content
        style={{
          backgroundColor: "antiquewhite"
        }}
      >
        <List
          style={{
            backgroundColor: hasEverSearched && minCharError ? "pink" : null
          }}
        >
          {hasEverSearched ? (
            minCharError ? (
              <ListItem>
                <Body>
                  <Text style={{ color: "crimson", fontSize: 16 }}>
                    Arama yapabilmek için en az üç karakter yazmalısınız!
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name="md-alert"
                    style={{ fontSize: 26, color: "crimson" }}
                  />
                </Right>
              </ListItem>
            ) : (
              <>
                <Separator style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                  <Text
                    style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                  >
                    Arama Sonuclari
                  </Text>
                </Separator>
                <Separator style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                  <Text style={{ color: "white" }}>
                    {results.length > 0
                      ? `${results.length} ana başlık bulundu`
                      : `hiçbir başlıkta bulunamadı`}
                  </Text>
                </Separator>
              </>
            )
          ) : null}

          {results.map((item, index) => {
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
        </List>
      </Content>
    </>
  );
};

SearchScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Arama</Text>
    ),
    headerRight: () => (
      <Text
        style={{ fontSize: 16, paddingRight: 15 }}
        onPress={navigation.getParam("clearForm")}
      >
        Yeni Arama
      </Text>
    )
  };
};

export default SearchScreen;
