import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "../styles";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.appWrapper}>
      <Text style={styles.sectionText}>
        Uygulamamız hala geliştirme aşamasındadır.
      </Text>
      <Text style={styles.sectionText}>
        İstek ve önerilerinizi bize e-posta ile bildirebilirsiniz.
      </Text>
      <Text style={styles.sectionText}>mutevellisamet@gmail.com</Text>
    </SafeAreaView>
  );
};

SettingsScreen.navigationOptions = () => {
  return {
    headerTitle: () => <Text style={styles.headerTitle}>Ayarlar</Text>,
  };
};

export default SettingsScreen;
