import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";

const SearchForm = ({ search, setSearch, onSearchButtonPress }) => {
  return (
    <View style={styles.searchFormWrapper}>
      <View style={styles.searchInputContainer}>
        <Icon name="ios-search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInputStyle}
          onChangeText={(term) => setSearch({ ...search, term })}
          value={search.term}
          placeholder="Aranacak ifade"
          onSubmitEditing={onSearchButtonPress}
          returnKeyType="search"
          autoFocus
        />
        {search.term.length > 0 ? (
          <Icon
            name="ios-close-circle-outline"
            color="grey"
            onPress={() => setSearch({ ...search, term: "" })}
            style={styles.clearIcon}
          />
        ) : null}
      </View>
      <TouchableOpacity onPress={onSearchButtonPress} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Arama Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchForm;
