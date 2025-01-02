import React, { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import BookmarkScreen from "./components/BookmarkScreen";
import ChapterScreen from "./components/ChapterScreen";
import HomeScreen from "./components/HomeScreen";
import RandomScreen from "./components/RandomScreen";
import SearchScreen from "./components/SearchScreen";
import SectionScreen from "./components/SectionScreen";

import { Text, View } from "react-native";
import { BookmarkContext } from "./bookmarkContext";

const homeTitle = (
  <View>
    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>BÜYÜK İSLAM İLMİHALİ</Text>
    <Text
      style={{
        fontSize: 16,
        color: "white",
        paddingTop: 1,
        fontWeight: "normal",
        textAlign: Platform.OS === "ios" ? "center" : "left",
      }}
    >
      ÖMER NASUHİ BİLMEN
    </Text>
  </View>
);

const buildTitle = (route) => {
  switch (route.name) {
    case "Book":
      return homeTitle;
    case "Chapter":
      return route.params.item.title;
    case "Section":
    case "BookmarkSection":
    case "SearchSection":
      return route?.params?.item?.sectionTitle;
    case "SearchChapter":
      return route?.params.item.title;
    case "Random":
      return "Rastgele";
    case "Search":
      return "Arama";
    case "Bookmark":
      return "Favoriler";
  }
};

const header = ({ route }) => {
  return {
    headerBackTitle: null,
    headerBackTitleStyle: {
      color: "white",
    },
    headerStyle: {
      backgroundColor: "#256FA2",
    },
    headerTintColor: "#FFF",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white",
      fontSize: 18,
    },
    cardStyle: {
      backgroundColor: "#bbe1fa",
    },
    title: buildTitle(route),
  };
};

const Tab = createBottomTabNavigator();

const BookStack = createStackNavigator();
const SearchStack = createStackNavigator();
const RandomStack = createStackNavigator();
const BookmarkStack = createStackNavigator();

const navigatorProps = {
  screenOptions: { gestureEnabled: true },
};

const BookStackScreen = () => {
  return (
    <BookStack.Navigator {...navigatorProps} initialRouteName="Book">
      <BookStack.Screen name="Book" component={HomeScreen} options={header} />
      <BookStack.Screen name="Chapter" component={ChapterScreen} options={header} />
      <BookStack.Screen name="Section" component={SectionScreen} options={header} />
    </BookStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator initialRouteName="Search" {...navigatorProps}>
      <SearchStack.Screen name="Search" component={SearchScreen} options={header} />
      <SearchStack.Screen name="SearchChapter" component={ChapterScreen} options={header} />
      <SearchStack.Screen name="SearchSection" component={SectionScreen} options={header} />
    </SearchStack.Navigator>
  );
};

const RandomStackScreen = () => {
  return (
    <RandomStack.Navigator initialRouteName="Random" {...navigatorProps}>
      <RandomStack.Screen name="Random" component={RandomScreen} options={header} />
    </RandomStack.Navigator>
  );
};

const BookmarkStackScreen = () => {
  return (
    <BookmarkStack.Navigator initialRouteName="Bookmark" {...navigatorProps}>
      <BookmarkStack.Screen name="Bookmark" component={BookmarkScreen} options={header} />
      <BookmarkStack.Screen name="BookmarkSection" component={SectionScreen} options={header} />
    </BookmarkStack.Navigator>
  );
};

const AppWithContext = () => {
  const bookmarkContext = React.useContext(BookmarkContext);
  const [store, setStore] = React.useState(bookmarkContext.store);
  const [initialRender, setInitialRender] = React.useState(true);

  const linking = {
    prefixes: ["ilmihaloku://", "https://ilmihaloku.com"],
    config: {
      screens: {
        ChapterScreen: ":chapter",
        SectionScreen: ":chapter/:section",
      },
    },
  };

  useEffect(() => {
    if (!initialRender) {
      AsyncStorage.setItem("@Favoriler", JSON.stringify(store));
    }
  }, [store]);

  useEffect(() => {
    setInitialRender(false);
    AsyncStorage.getItem("@Favoriler").then((data) => {
      if (data) {
        setStore(JSON.parse(data));
      }
    });
  }, []);

  const updateStore = (newStore) => {
    setStore(newStore);
  };

  const options = {
    screenOptions: ({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        const { name } = route;
        let IconComponent = Ionicons;
        let iconName;
        if (name === "İlmihal") {
          iconName = focused ? "book" : "book-outline";
        } else if (name === "Arama") {
          iconName = focused ? "search" : "search-outline";
        } else if (name === "Rastgele") {
          iconName = focused ? "shuffle" : "shuffle-outline";
        } else if (name === "Favoriler") {
          iconName = focused ? "heart" : "heart-outline";
        }

        return <IconComponent name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#FFF",
      tabBarInactiveTintColor: "#bbe1fa",
      tabBarActiveBackgroundColor: "#24333b",
      tabBarStyle: {
        backgroundColor: "#1b262c",
      },
      tabBarItemStyle: {
        paddingVertical: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
      keyboardHidesTabBar: true,
    }),
  };

  const tabOptions = { headerShown: false };

  return (
    <BookmarkContext.Provider value={{ store, updateStore }}>
      <NavigationContainer linking={linking}>
        <Tab.Navigator {...options}>
          <Tab.Screen name="İlmihal" component={BookStackScreen} options={tabOptions} />
          <Tab.Screen name="Arama" component={SearchStackScreen} options={tabOptions} />
          <Tab.Screen name="Rastgele" component={RandomStackScreen} options={tabOptions} />
          <Tab.Screen name="Favoriler" component={BookmarkStackScreen} options={tabOptions} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookmarkContext.Provider>
  );
};

export default AppWithContext;
