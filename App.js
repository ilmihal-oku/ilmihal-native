import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./components/HomeScreen";
import ChapterScreen from "./components/ChapterScreen";
import SectionScreen from "./components/SectionScreen";
import SearchScreen from "./components/SearchScreen";
import ResultsScreen from "./components/ResultsScreen";
import RandomScreen from "./components/RandomScreen";
import SettingsScreen from "./components/SettingsScreen";

const BookStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Chapter: { screen: ChapterScreen },
    Section: { screen: SectionScreen }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "burlywood"
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "antiquewhite"
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
    Results: { screen: ResultsScreen },
    Chapter: { screen: ChapterScreen },
    Section: { screen: SectionScreen }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "burlywood"
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "antiquewhite"
    }
  }
);

const RandomStack = createStackNavigator(
  {
    Random: { screen: RandomScreen }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "burlywood"
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "antiquewhite"
    }
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "burlywood"
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const App = createAppContainer(
  createBottomTabNavigator(
    {
      İlmihal: BookStack,
      Arama: SearchStack,
      Rastgele: RandomStack,
      Ayarlar: SettingsStack
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === "İlmihal") {
            iconName = `ios-book`;
          } else if (routeName === "Arama") {
            iconName = "ios-search";
          } else if (routeName === "Rastgele") {
            iconName = "ios-shuffle";
          } else if (routeName === "Ayarlar") {
            iconName = `ios-options`;
          }

          return <IconComponent name={iconName} size={25} color={tintColor} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: "white",
        inactiveTintColor: "#d1d1d2",
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: "saddlebrown"
        }
      },
      // resetOnBlur: true,
      lazy: false
    }
  )
);

export default App;
