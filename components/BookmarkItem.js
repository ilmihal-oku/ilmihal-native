import React, { Component } from "react";
import { Text, View, Pressable, TouchableOpacity, Animated } from "react-native";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";

class BookmarkItem extends Component {
  state = {
    opacity: new Animated.Value(0),
    copied: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.modalVisible !== this.props.modalVisible) {
      if (this.props.modalVisible) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  fadeIn = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  onItemPress = () => {
    const { navigate } = this.props.navigation;
    const { item } = this.props;

    this.props.toggleModal(null);
    if (!this.props.modalVisible) {
      navigate("BookmarkSection", { item });
    }
  };

  onItemLongPress = () => {
    this.props.toggleModal(this.props.p);
  };

  onCopied = () => {
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1200);
    setTimeout(() => this.props.toggleModal(null), 1000);
  };

  onCopy = () => {
    Clipboard.setString(this.props.p);
    this.onCopied();
  };

  onClose = () => {
    this.props.toggleModal(null);
  };

  iconProps = (name, color) => {
    return { name, size: 35, color, style: styles.bookmarkItemOverlayIcon };
  };

  render() {
    return (
      <View style={styles.bookmarkItemContainer}>
        <Pressable onPress={this.onItemPress} onLongPress={this.onItemLongPress} delayLongPress={250}>
          <Animated.View style={[styles.bookmarkItemOverlay, { opacity: this.state.opacity }]}>
            {this.state.copied ? (
              <Text style={{ color: "white", fontSize: 20 }}>Kopyalandı!</Text>
            ) : (
              <>
                <TouchableOpacity style={styles.bookmarkItemOverlayItem} onPress={this.onCopy}>
                  <Icon {...this.iconProps("copy", "white")} />
                  <Text style={styles.bookmarkItemOverlayText}>Kopyala</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmarkItemOverlayItem}>
                  <Icon {...this.iconProps("trash", "coral")} />
                  <Text style={styles.bookmarkItemOverlayText}>Sil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmarkItemOverlayItem} onPress={this.onClose}>
                  <Icon {...this.iconProps("close", "#eee")} />
                  <Text style={styles.bookmarkItemOverlayText}>Kapat</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
          <View style={styles.bookmarkItem}>
            <Text numberOfLines={2} style={styles.sectionText}>
              {this.props.p}
            </Text>
            <Text style={styles.bookmarkItemTitle}>{this.props.title}</Text>
          </View>
        </Pressable>
      </View>
    );
  }
}

export default BookmarkItem;
