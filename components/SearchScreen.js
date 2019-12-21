import React, { useState } from "react";
import { Text, Keyboard } from "react-native";
import { Content, List } from "native-base";

import { book as ilmihal } from "../newSource";
import ChapterResults from "./ChapterResults";
import SectionResults from "./SectionResults";
import ContentResults from "./ContentResults";
import SearchForm from "./SearchForm";
import SubHeader from "./SubHeader";
import SearchError from "./SearchError";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState({
    term: "",
    query: "",
    results: {},
    hasEverSearched: false,
    minCharError: false
  });

  const { term, query, results, hasEverSearched, minCharError } = search;

  const onSearchButtonPress = () => {
    Keyboard.dismiss();
    if (term.length > 2) {
      navigation.setParams({ clearForm: () => clearForm() });

      const chapter_results = ilmihal.filter(chapter =>
        chapter.chapterTitle.toLowerCase().includes(term.toLowerCase())
      );

      const section_results = ilmihal
        .map(chapter =>
          chapter.chapterContent.filter(section =>
            section.sectionTitle.toLowerCase().includes(term.toLowerCase())
          )
        )
        .filter(section => section.length > 0)
        .reduce((total, section) => [...total, ...section], "");

      const content_results = ilmihal
        .map(chapter =>
          chapter.chapterContent.filter(section =>
            section.sectionContent
              .reduce((total, text) => (total += text))
              .toLowerCase()
              .includes(term.toLowerCase())
          )
        )
        .filter(chapter => chapter.length > 0)
        .reduce((total, section) => [...total, ...section], "");

      setSearch({
        ...search,
        query: term,
        results: {
          chapter: [...chapter_results],
          section: [...section_results],
          content: [...content_results]
        },
        hasEverSearched: true,
        minCharError: false
      });
    } else {
      setSearch({
        ...search,
        results: {},
        minCharError: true
      });
    }
  };

  const clearForm = () => {
    setSearch({
      term: "",
      query: "",
      results: {},
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

  return (
    <>
      <SearchForm
        search={search}
        setSearch={setSearch}
        term={term}
        onSearchButtonPress={onSearchButtonPress}
      />
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
              <SearchError message="Arama yapabilmek için en az üç karakter yazmalısınız!" />
            ) : (
              <>
                <SubHeader message="Arama Sonuçları" />
                <ChapterResults
                  query={query}
                  navigation={navigation}
                  highlightSearchTerm={highlightSearchTerm}
                  chapterResults={results.chapter}
                />
                <SectionResults
                  query={query}
                  navigation={navigation}
                  highlightSearchTerm={highlightSearchTerm}
                  sectionResults={results.section}
                />
                <ContentResults
                  query={query}
                  navigation={navigation}
                  highlightSearchTerm={highlightSearchTerm}
                  contentResults={results.content}
                />
              </>
            )
          ) : null}
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
