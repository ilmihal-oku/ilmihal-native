import React, { useEffect } from "react";
import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// New screens
import BooksScreen from "./components/BooksScreen";
import HadithReaderScreen from "./components/HadithReaderScreen";
import HadithScreen from "./components/HadithScreen";
import IlmihalReaderScreen from "./components/IlmihalReaderScreen";
import NewFavoritesScreen from "./components/NewFavoritesScreen";
import NewHomeScreen from "./components/NewHomeScreen";
import QuranReaderScreen from "./components/QuranReaderScreen";
import QuranScreen from "./components/QuranScreen";
import SettingsScreen from "./components/SettingsScreen";
import UnifiedSearchScreen from "./components/UnifiedSearchScreen";

import { BookmarkContext } from "./bookmarkContext";
import { SettingsProvider } from "./settingsContext";

const buildTitle = (route) => {
  switch (route.name) {
    case "Home":
      return "Ana Sayfa";
    case "Books":
      return "Kitaplar";
    case "Search":
      return "Arama";
    case "Favorites":
      return "Favoriler";
    case "QuranReader":
      return "Kur'an";
    case "HadithReader":
      return "Hadis";
    case "QuranView":
      return route?.params?.surahName || "Kur'an";
    case "HadithView":
      return route?.params?.collection || "Hadis";
    case "IlmihalReader":
      return "İlmihal";
    case "Settings":
      return "Ayarlar";
    default:
      return "";
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

const HomeStack = createStackNavigator();
const BooksStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

const navigatorProps = {
  screenOptions: { gestureEnabled: true },
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator {...navigatorProps} initialRouteName="Home">
      <HomeStack.Screen name="Home" component={NewHomeScreen} options={header} />
      <HomeStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <HomeStack.Screen name="HadithReader" component={HadithReaderScreen} options={header} />
      <HomeStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <HomeStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <HomeStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
};

const BooksStackScreen = () => {
  return (
    <BooksStack.Navigator {...navigatorProps} initialRouteName="Books">
      <BooksStack.Screen name="Books" component={BooksScreen} options={header} />
      <BooksStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <BooksStack.Screen name="HadithReader" component={HadithReaderScreen} options={header} />
      <BooksStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <BooksStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <BooksStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <BooksStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </BooksStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator initialRouteName="Search" {...navigatorProps}>
      <SearchStack.Screen name="Search" component={UnifiedSearchScreen} options={header} />
      <SearchStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <SearchStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <SearchStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <SearchStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <SearchStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </SearchStack.Navigator>
  );
};

const FavoritesStackScreen = () => {
  return (
    <FavoritesStack.Navigator initialRouteName="Favorites" {...navigatorProps}>
      <FavoritesStack.Screen name="Favorites" component={NewFavoritesScreen} options={header} />
      <FavoritesStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <FavoritesStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <FavoritesStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <FavoritesStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <FavoritesStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </FavoritesStack.Navigator>
  );
};

const AppWithContext = () => {
  const bookmarkContext = React.useContext(BookmarkContext);
  const [store, setStore] = React.useState(bookmarkContext.store);
  const [initialRender, setInitialRender] = React.useState(true);

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
      tabBarIcon: ({ color, size }) => {
        const { name } = route;
        let iconName;
        if (name === "Home") {
          iconName = "home";
        } else if (name === "Books") {
          iconName = "library";
        } else if (name === "Search") {
          iconName = "search";
        } else if (name === "Favorites") {
          iconName = "heart";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
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
    <SettingsProvider>
      <BookmarkContext.Provider value={{ store, updateStore }}>
        <NavigationContainer>
          <Tab.Navigator {...options}>
            <Tab.Screen name="Home" component={HomeStackScreen} options={{...tabOptions, tabBarLabel: 'Ana Sayfa'}} />
            <Tab.Screen name="Books" component={BooksStackScreen} options={{...tabOptions, tabBarLabel: 'Kitaplar'}} />
            <Tab.Screen name="Search" component={SearchStackScreen} options={{...tabOptions, tabBarLabel: 'Arama'}} />
            <Tab.Screen name="Favorites" component={FavoritesStackScreen} options={{...tabOptions, tabBarLabel: 'Favoriler'}} />
          </Tab.Navigator>
        </NavigationContainer>
      </BookmarkContext.Provider>
    </SettingsProvider>
  );
};

export default AppWithContext;
