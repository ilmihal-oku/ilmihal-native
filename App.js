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
import { useTranslation } from "./i18n";
import { SettingsProvider } from "./settingsContext";

const buildTitle = (route, t) => {
  switch (route.name) {
    case "Home":
      return t("home");
    case "Books":
      return t("books");
    case "Search":
      return t("search");
    case "Favorites":
      return t("favorites");
    case "QuranReader":
      return t("quran");
    case "HadithReader":
      return t("hadith");
    case "QuranView":
      return route?.params?.surahName || t("quran");
    case "HadithView":
      return route?.params?.collection || t("hadith");
    case "IlmihalReader":
      return t("ilmihal");
    case "Settings": {
      const type = route?.params?.type;
      if (type === 'quran') return t('quranTranslation');
      if (type === 'hadith') return t('hadithLanguage');
      if (type === 'app') return t('appLanguage');
      return t('languageSettings');
    }
    default:
      return "";
  }
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
  const { t } = useTranslation();
  const header = ({ route }) => ({
    headerBackTitle: ' ',
    headerBackTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#256FA2" },
    headerTintColor: "#FFF",
    headerTitleStyle: { fontWeight: "bold", color: "white", fontSize: 18 },
    cardStyle: { backgroundColor: "#bbe1fa" },
    title: buildTitle(route, t),
  });

  return (
    <HomeStack.Navigator {...navigatorProps} initialRouteName="Home">
      <HomeStack.Screen name="Home" component={NewHomeScreen} options={header} />
      <HomeStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <HomeStack.Screen name="HadithReader" component={HadithReaderScreen} options={header} />
      <HomeStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <HomeStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <HomeStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} options={header} />
    </HomeStack.Navigator>
  );
};

const BooksStackScreen = () => {
  const { t } = useTranslation();
  const header = ({ route }) => ({
    headerBackTitle: ' ',
    headerBackTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#256FA2" },
    headerTintColor: "#FFF",
    headerTitleStyle: { fontWeight: "bold", color: "white", fontSize: 18 },
    cardStyle: { backgroundColor: "#bbe1fa" },
    title: buildTitle(route, t),
  });

  return (
    <BooksStack.Navigator {...navigatorProps} initialRouteName="Books">
      <BooksStack.Screen name="Books" component={BooksScreen} options={header} />
      <BooksStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <BooksStack.Screen name="HadithReader" component={HadithReaderScreen} options={header} />
      <BooksStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <BooksStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <BooksStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <BooksStack.Screen name="Settings" component={SettingsScreen} options={header} />
    </BooksStack.Navigator>
  );
};

const SearchStackScreen = () => {
  const { t } = useTranslation();
  const header = ({ route }) => ({
    headerBackTitle: ' ',
    headerBackTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#256FA2" },
    headerTintColor: "#FFF",
    headerTitleStyle: { fontWeight: "bold", color: "white", fontSize: 18 },
    cardStyle: { backgroundColor: "#bbe1fa" },
    title: buildTitle(route, t),
  });

  return (
    <SearchStack.Navigator initialRouteName="Search" {...navigatorProps}>
      <SearchStack.Screen name="Search" component={UnifiedSearchScreen} options={header} />
      <SearchStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <SearchStack.Screen name="HadithReader" component={HadithReaderScreen} options={header} />
      <SearchStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <SearchStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <SearchStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <SearchStack.Screen name="Settings" component={SettingsScreen} options={header} />
    </SearchStack.Navigator>
  );
};

const FavoritesStackScreen = () => {
  const { t } = useTranslation();
  const header = ({ route }) => ({
    headerBackTitle: ' ',
    headerBackTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#256FA2" },
    headerTintColor: "#FFF",
    headerTitleStyle: { fontWeight: "bold", color: "white", fontSize: 18 },
    cardStyle: { backgroundColor: "#bbe1fa" },
    title: buildTitle(route, t),
  });

  return (
    <FavoritesStack.Navigator initialRouteName="Favorites" {...navigatorProps}>
      <FavoritesStack.Screen name="Favorites" component={NewFavoritesScreen} options={header} />
      <FavoritesStack.Screen name="QuranReader" component={QuranReaderScreen} options={header} />
      <FavoritesStack.Screen name="HadithReader" component={HadithReaderScreen} options={header} />
      <FavoritesStack.Screen name="IlmihalReader" component={IlmihalReaderScreen} options={header} />
      <FavoritesStack.Screen name="QuranView" component={QuranScreen} options={header} />
      <FavoritesStack.Screen name="HadithView" component={HadithScreen} options={header} />
      <FavoritesStack.Screen name="Settings" component={SettingsScreen} options={header} />
    </FavoritesStack.Navigator>
  );
};

/**
 * Inner component that uses useTranslation for tab labels.
 * Must be rendered inside SettingsProvider.
 */
const AppTabs = ({ store, updateStore }) => {
  const { t } = useTranslation();

  const options = {
    screenOptions: ({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const { name } = route;
        let iconName;
        if (name === "HomeTab") {
          iconName = "home";
        } else if (name === "BooksTab") {
          iconName = "library";
        } else if (name === "SearchTab") {
          iconName = "search";
        } else if (name === "FavoritesTab") {
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
    <BookmarkContext.Provider value={{ store, updateStore }}>
      <NavigationContainer>
        <Tab.Navigator {...options}>
          <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{...tabOptions, tabBarLabel: t('home')}} />
          <Tab.Screen name="BooksTab" component={BooksStackScreen} options={{...tabOptions, tabBarLabel: t('books')}} />
          <Tab.Screen name="SearchTab" component={SearchStackScreen} options={{...tabOptions, tabBarLabel: t('search')}} />
          <Tab.Screen name="FavoritesTab" component={FavoritesStackScreen} options={{...tabOptions, tabBarLabel: t('favorites')}} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookmarkContext.Provider>
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

  return (
    <SettingsProvider>
      <AppTabs store={store} updateStore={updateStore} />
    </SettingsProvider>
  );
};

export default AppWithContext;
