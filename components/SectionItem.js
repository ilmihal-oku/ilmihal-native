import React, { Component } from "react";
import { Animated, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";
import withStore from "../utils/withStore";

class SectionItem extends Component {
  constructor(props) {
    super(props);
    this.startEndingAnimate = undefined;
  }

  opacity = new Animated.Value(0);
  scale = new Animated.Value(1);

  startAnimate = () => {
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.scale, {
      toValue: 1.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  endAnimate = () => {
    Animated.timing(this.opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.scale, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  onAddToBookmarks = () => {
    const { p, sectionTitle } = this.props;
    this.props.addToBookmarks(p, sectionTitle);
    if (this.props.inStore(sectionTitle, p)) {
      this.startAnimate();
      this.startEndingAnimate = setTimeout(() => this.endAnimate(), 500);
    }
  };

  onLongPress = () => {
    alert("Long press");
  };

  render() {
    const { opacity, scale } = this;
    const { p, sectionTitle } = this.props;
    const backgroundColor = this.props.inStore(sectionTitle, p) ? "lightyellow" : undefined;
    const iconStyle = [styles.sectionLikedIcon, { opacity, transform: [{ scale }] }];
    const doubleTap = Gesture.Tap().maxDuration(500).numberOfTaps(2).onStart(this.onAddToBookmarks);
    const longPress = Gesture.LongPress().minDuration(200).onStart(this.onLongPress);

    return (
      <GestureDetector gesture={Gesture.Simultaneous(doubleTap, longPress)}>
        <View>
          <Animated.Text style={[styles.sectionText, { backgroundColor }]}>
            {this.props.p}
          </Animated.Text>
          <Animated.View style={iconStyle}>
            <Icon name="heart" size={50} color="rgb(245, 66, 66)" />
          </Animated.View>
        </View>
      </GestureDetector>
    );
  }
}

export default withStore(SectionItem);
