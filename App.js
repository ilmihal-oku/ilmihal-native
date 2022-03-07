import 'react-native-gesture-handler';
import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./components/HomeScreen";
import ChapterScreen from "./components/ChapterScreen";
import SectionScreen from "./components/SectionScreen";
import SearchScreen from "./components/SearchScreen";
import RandomScreen from "./components/RandomScreen";
import BookmarkScreen from "./components/BookmarkScreen";

import { BookmarkContext } from "./bookmarkContext";
import { View, Text } from 'react-native';

const homeTitle = (
  <View style={{ alignItems: "center" }}>
    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
      BÜYÜK İSLAM İLMİHALİ
    </Text>
    <Text style={{ fontSize: 16, color: "white", paddingTop: 3, fontWeight: 'normal' }}>
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
    case "Random":
      return "Rastgele";
    case "Search":
      return "Arama";
    case "Bookmark":
      return "Favoriler";
  }
}

const header = ({ route }) => {
  return {
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#3282b8",
      height: 90,
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold",
      color: 'white',
      fontSize: 22,
    },
    cardStyle: {
      backgroundColor: "#bbe1fa",
    },
    title: buildTitle(route),
  };};

const Tab = createBottomTabNavigator();
const BookStack = createStackNavigator();
const SearchStack = createStackNavigator();
const RandomStack = createStackNavigator();
const BookmarkStack = createStackNavigator();
// const SettingsStack = createStackNavigator();

const BookStackScreen = () => {
  const navigatorProps = {
    initialRouteName: "Book",
    screenOptions: { gestureEnabled: true },
  };
  return (
    <BookStack.Navigator {...navigatorProps}>
      <BookStack.Screen name="Book" component={HomeScreen} options={header} />
      <BookStack.Screen name="Chapter" component={ChapterScreen} options={header} />
      <BookStack.Screen name="Section" component={SectionScreen} options={header} />
    </BookStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{ gestureEnabled: true }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} options={header} />
      <SearchStack.Screen name="SearchChapter" component={ChapterScreen} options={header} />
      <SearchStack.Screen name="SearchSection" component={SectionScreen} options={header} />
    </SearchStack.Navigator>
  );
};

const RandomStackScreen = () => {
  return (
    <RandomStack.Navigator
      initialRouteName="Random"
      screenOptions={{ gestureEnabled: true }}
    >
      <RandomStack.Screen name="Random" component={RandomScreen} options={header} />
    </RandomStack.Navigator>
  );
};

const BookmarkStackScreen = () => {
  return (
    <BookmarkStack.Navigator
      initialRouteName="Bookmark"
      screenOptions={{ gestureEnabled: true }}
    >
      <BookmarkStack.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={header}
      />
      <BookmarkStack.Screen name="BookmarkSection" component={SectionScreen} options={header} />
    </BookmarkStack.Navigator>
  );
};

const AppWithContext = () => {
  const bookmarkContext = React.useContext(BookmarkContext);
  const [store, setStore] = React.useState(bookmarkContext.store);
  const [initialRender, setInitialRender] = React.useState(true);

  useEffect(() => {
    if (!initialRender) {
      AsyncStorage.setItem("@Ayraclar", JSON.stringify(store));
    }
  }, [store]);

  useEffect(() => {
    setInitialRender(false);
    AsyncStorage.getItem("@Ayraclar").then((data) => {
      if (data) {
        setStore(JSON.parse(data));
      }
    });
  }, []);

  const updateStore = (newStore) => {
    setStore(newStore);
  };

  const options = {
    screenOptions: ({ navigation, route }) => ({
      tabBarIcon: ({ color, size }) => {
        const { name } = route;
        let IconComponent = Ionicons;
        let iconName;
        if (name === "İlmihal") {
          iconName = `book`;
        } else if (name === "Arama") {
          iconName = "ios-search";
        } else if (name === "Rastgele") {
          iconName = "ios-shuffle";
        } else if (name === "Favoriler") {
          iconName = "md-heart";
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
      <NavigationContainer>
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
