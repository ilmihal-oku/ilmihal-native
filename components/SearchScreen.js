import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { book as ilmihal } from "../source";
import ChapterResults from "./ChapterResults";
import SectionResults from "./SectionResults";
import ContentResults from "./ContentResults";
import SearchForm from "./SearchForm";
import SubHeader from "./SubHeader";
import SearchError from "./SearchError";
import styles from "../styles";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState({
    term: "",
    query: "",
    results: {},
    hasEverSearched: false,
    minCharError: false,
  });

  const { term, query, results, hasEverSearched, minCharError } = search;

  const onSearchButtonPress = () => {
    Keyboard.dismiss();
    if (term.length > 2) {
      navigation.setParams({ clearForm });

      const chapter_results = ilmihal
        .filter((chapter) =>
          chapter.chapterTitle.toLowerCase().includes(term.toLowerCase())
        )
        .map(({ chapterTitle: title, id }) => ({ title, id }));

      const section_results = ilmihal
        .map((chapter) =>
          chapter.chapterContent.filter((section) =>
            section.sectionTitle.toLowerCase().includes(term.toLowerCase())
          )
        )
        .filter((section) => section.length > 0)
        .reduce((total, section) => [...total, ...section], "");

      const content_results = ilmihal
        .map((chapter) =>
          chapter.chapterContent.filter((section) =>
            section.sectionContent
              .reduce((total, text) => (total += text))
              .toLowerCase()
              .includes(term.toLowerCase())
          )
        )
        .filter((chapter) => chapter.length > 0)
        .reduce((total, section) => [...total, ...section], "");

      setSearch({
        ...search,
        query: term,
        results: {
          chapter: [...chapter_results],
          section: [...section_results],
          content: [...content_results],
        },
        hasEverSearched: true,
        minCharError: false,
      });
    } else {
      setSearch({
        ...search,
        results: {},
        minCharError: true,
        hasEverSearched: true,
      });
    }
  };

  const clearForm = () => {
    setSearch({
      term: "",
      query: "",
      results: {},
      hasEverSearched: false,
      minCharError: false,
    });
  };

  const highlightSearchTerm = (title, term) => {
    const start = title.toLowerCase().indexOf(term.toLowerCase());
    const end = start + term.length;

    const splitAt = (start, end) => (x) => [
      x.slice(0, start),
      x.slice(start, end),
      x.slice(end, x.length),
    ];

    const titleArray = splitAt(start, end)(title);

    return (
      <Text style={styles.searchResultTitle}>
        {titleArray[0]}
        <Text style={{ backgroundColor: "yellow" }}> {titleArray[1]} </Text>
        {titleArray[2]}
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.appWrapper}>
        <ScrollView>
          <SearchForm
            search={search}
            setSearch={setSearch}
            term={term}
            onSearchButtonPress={onSearchButtonPress}
          />
          <View>
            {hasEverSearched ? (
              minCharError ? (
                <SearchError message="Arama yapabilmek için en az üç karakter yazmalısınız!" />
              ) : (
                <>
                  <SubHeader message="Arama Sonuçları" />
                  {!results.chapter.length &&
                    !results.section.length &&
                    !results.content.length && (
                      <Text
                        style={{ fontFamily: "sans-serif-light", fontSize: 15 }}
                      >
                        Sonuç bulunamadı.
                      </Text>
                    )}
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

SearchScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => <Text style={styles.headerTitle}>Arama</Text>,
    headerRight: () => (
      <TouchableOpacity style={styles.newSearchButton}>
        <Text
          style={styles.newSearchText}
          onPress={navigation.getParam("clearForm")}
        >
          Yeni Arama
        </Text>
      </TouchableOpacity>
    ),
  };
};

export default SearchScreen;
