import React, { Component } from "react";
import { Text, View, Pressable, TouchableOpacity, Animated } from "react-native";
import styles from "../styles";
import Icon from "react-native-vector-icons/Ionicons";

class BookmarkItem extends Component {
  state = {
    opacity: new Animated.Value(0),
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
    if (!this.props.modalVisible) {
      this.props.navigation.navigate("BookmarkSection", {
        item: this.props.item,
      });
    }
    this.props.toggleModal(null);
  };

  onItemLongPress = () => {
    this.props.toggleModal(this.props.p);
  };

  render() {
    const iconProps = (name, color) => {
      return { name, size: 35, color, style: styles.bookmarkItemOverlayIcon };
    };

    return (
      <View style={styles.bookmarkItemContainer}>
        <Pressable onPress={this.onItemPress} onLongPress={this.onItemLongPress} delayLongPress={250}>
          <Animated.View style={[styles.bookmarkItemOverlay, { opacity: this.state.opacity }]}>
            <TouchableOpacity style={styles.bookmarkItemOverlayItem}>
              <Icon {...iconProps("copy", "white")} />
              <Text style={styles.bookmarkItemOverlayText}>Kopyala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookmarkItemOverlayItem}>
              <Icon {...iconProps("trash", "coral")} />
              <Text style={styles.bookmarkItemOverlayText}>Sil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookmarkItemOverlayItem}>
              <Icon {...iconProps("close", "#eee")} />
              <Text style={styles.bookmarkItemOverlayText}>Kapat</Text>
            </TouchableOpacity>
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
