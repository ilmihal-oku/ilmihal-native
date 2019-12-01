import React from "react";
import { Text } from "react-native";
import { Content } from "native-base";

const SettingsScreen = () => {
  return (
    <Content
      style={{
        backgroundColor: "antiquewhite",
        padding: 20
      }}
    >
      <Text
        style={{
          fontSize: 32,
          paddingTop: 20,
          paddingBottom: 40,
          fontWeight: "bold"
        }}
      >
        Ayarlar
      </Text>
      <Text style={{ fontSize: 20, lineHeight: 26, paddingBottom: 20 }}>
        Uygulamamız geliştirme aşamasında olduğundan henüz bu kısmı doldurmadık.
      </Text>
      <Text style={{ fontSize: 20, lineHeight: 26, paddingBottom: 20 }}>
        İstek ve önerilerinizi bize e-posta ile bildirebilirsiniz.
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          lineHeight: 26,
          paddingBottom: 20
        }}
      >
        mutevellisamet@gmail.com
      </Text>
    </Content>
  );
};

export default SettingsScreen;
