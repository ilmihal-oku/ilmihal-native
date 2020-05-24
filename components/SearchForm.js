import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";

const SearchForm = ({ search, setSearch, term, onSearchButtonPress }) => {
  return (
    <View>
      <View style={styles.searchInputContainer}>
        <Icon name="ios-search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInputStyle}
          onChangeText={(term) => setSearch({ ...search, term: term })}
          value={term}
          placeholder="Aranacak ifade"
        />
        {term.length > 0 ? (
          <Icon
            name="ios-close-circle-outline"
            color="grey"
            onPress={() => setSearch({ ...search, term: "" })}
            style={styles.clearIconStyle}
          />
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => onSearchButtonPress()}
        style={styles.searchButton}
      >
        <Text style={styles.searchButtonText}>ilmihal'de Ara</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchForm;
