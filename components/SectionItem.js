import React, { Component } from "react";
import { Animated, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";

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
    this.props.addToBookmarks(this.props.p);
    if (this.props.inStore) {
      this.startAnimate();
      this.startEndingAnimate = setTimeout(() => this.endAnimate(), 500);
    }
  };

  render() {
    const { opacity, scale } = this;
    const backgroundColor = this.props.inStore ? "lightyellow" : undefined;
    const iconStyle = [
      styles.sectionLikedIcon,
      { opacity, transform: [{ scale }] },
    ];
    const doubleTap = Gesture.Tap()
      .maxDuration(500)
      .numberOfTaps(2)
      .onStart(this.onAddToBookmarks);

    return (
      <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
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

export default SectionItem;
